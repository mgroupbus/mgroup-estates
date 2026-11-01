#!/usr/bin/env python3
"""
Generate one crawlable page per listing, plus the files search engines and
AI agents look for.

Why this exists: every listing lived at /property?id=N and its content —
name, price, bedrooms, description — arrived from Supabase by JavaScript
after load. Google renders JS slowly and inconsistently; GPTBot,
ClaudeBot and PerplexityBot do not render it at all. So to an AI agent
the site was seven empty pages with no inventory, and all seventeen
listings shared one <title>.

Each listing now gets /property/<slug>/ whose HTML already contains the
text, with JSON-LD for machines and Open Graph so a shared link shows the
villa. app.js still hydrates the page exactly as before — it reads the id
from MG_PROPERTY_ID instead of the query string.

Run it after changing listings in Supabase, then commit:

    python3 build-seo.py

It rewrites only property/, sitemap.xml, robots.txt and llms.txt.
"""

import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://mgroupestates.com"
SB   = "https://iwipvfkjfsveycppqhxc.supabase.co"
KEY  = ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aXB2"
        "ZmtqZnN2ZXljcHBxaHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NzI5NzYsImV4cCI6MjA5"
        "MDM0ODk3Nn0.T_XwpBpNdeqQLjXuulEPwlUvCN9uXHNTj3B7tMxbtFo")

PAGES = [  # path, priority, what it is
    ("/",             "1.0", "Home"),
    ("/collections",  "0.9", "Every property for sale"),
    ("/map",          "0.8", "Map of every listing, filtered by setting"),
    ("/lifestyle",    "0.7", "Lifestyle Concierge"),
    ("/how-to-buy",   "0.7", "How to buy property in Thailand"),
    ("/insights",     "0.6", "Market insights"),
    ("/contact",      "0.6", "Contact"),
]


def get(table, query=""):
    url = f"{SB}/rest/v1/{table}?{query}"
    req = urllib.request.Request(url, headers={
        "apikey": KEY, "Authorization": f"Bearer {KEY}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def slugify(name):
    s = re.sub(r"[^a-z0-9]+", "-", (name or "").lower()).strip("-")
    return s or "listing"


def baht(v):
    try:
        n = int(float(v))
    except (TypeError, ValueError):
        return None
    return f"฿{n:,}"


def esc(v):
    return html.escape(str(v or ""), quote=True)


def first_sentences(text, limit=155):
    """A meta description has to read like a sentence, not a truncation."""
    t = re.sub(r"\s+", " ", (text or "")).strip()
    if len(t) <= limit:
        return t
    cut = t[:limit]
    stop = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    return (cut[:stop + 1] if stop > 60 else cut.rsplit(" ", 1)[0]) + ("" if stop > 60 else "…")


def build_listing_html(p, images, details, shell):
    name  = p.get("name") or "Property"
    slug  = (p.get("slug") or "").strip() or slugify(name)
    price = p.get("price_display") or baht(p.get("price_thb"))
    loc   = ", ".join(dict.fromkeys(
        x for x in [p.get("location"), p.get("district"), p.get("city")] if x))
    desc  = p.get("description") or ""
    # Three listings carry no photo of their own yet. A shared link with no
    # image is a dead-looking card on LINE or WhatsApp, so fall back to a
    # house photograph rather than nothing.
    hero  = images[0]["url"] if images else f"{SITE}/assets/svc-buy.jpg?v=123"

    title = f"{name} — {p.get('property_type') or 'Property'} for sale in {p.get('city') or 'Phuket'} | MGROUP Estates"
    meta  = first_sentences(desc) or f"{name} in {loc}. Enquire with MGROUP Estates."
    url   = f"{SITE}/property/{slug}/"

    specs = []
    for key, label in (("beds", "bedrooms"), ("baths", "bathrooms"),
                       ("sqm", "sqm built"), ("land_sqm", "sqm land")):
        if p.get(key):
            specs.append(f"{p[key]} {label}")

    highlights = [d for d in details if d.get("category") == "highlight"]

    # Visible, real content. app.js replaces these nodes with the same data
    # once Supabase answers; until then this is what both a crawler and a
    # person on a slow connection get.
    body = [f'<h1 class="det-title">{esc(name)}</h1>']
    if loc:
        body.append(f'<p class="det-location">{esc(loc)}</p>')
    if price:
        body.append(f'<p class="det-price-main">{esc(price)}</p>')
    if specs:
        body.append('<p class="det-specs-line">' + esc(" · ".join(specs)) + "</p>")
    if desc:
        for para in [x.strip() for x in re.split(r"\n\s*\n", desc) if x.strip()]:
            body.append(f"<p>{esc(para)}</p>")
    if highlights:
        body.append("<ul>" + "".join(
            f"<li><strong>{esc(h.get('key'))}</strong> — {esc(h.get('value'))}</li>"
            for h in highlights) + "</ul>")

    ld = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": name,
        "url": url,
        "description": meta,
        "datePosted": str(p.get("created_at") or "")[:10] or str(date.today()),
        "provider": {"@type": "RealEstateAgent", "name": "MGROUP Estates",
                     "url": SITE, "areaServed": "Phuket, Thailand"},
    }
    if images:
        ld["image"] = [i["url"] for i in images[:6]]
    if p.get("price_thb"):
        ld["offers"] = {
            "@type": "Offer", "price": int(p["price_thb"]), "priceCurrency": "THB",
            "availability": ("https://schema.org/SoldOut" if p.get("is_sold")
                             else "https://schema.org/InStock"),
            "url": url}
    acc = []
    if p.get("beds"):
        acc.append({"@type": "LocationFeatureSpecification", "name": "Bedrooms", "value": p["beds"]})
    if p.get("baths"):
        acc.append({"@type": "LocationFeatureSpecification", "name": "Bathrooms", "value": p["baths"]})
    if p.get("pool"):
        acc.append({"@type": "LocationFeatureSpecification", "name": "Pool", "value": str(p["pool"])})
    ld["about"] = {
        "@type": "SingleFamilyResidence",
        "name": name,
        "address": {"@type": "PostalAddress",
                    "addressLocality": p.get("district") or p.get("city") or "Phuket",
                    "addressRegion": p.get("city") or "Phuket",
                    "addressCountry": "TH", "streetAddress": p.get("location") or ""},
        **({"numberOfBedrooms": p["beds"]} if p.get("beds") else {}),
        **({"numberOfBathroomsTotal": p["baths"]} if p.get("baths") else {}),
        **({"floorSize": {"@type": "QuantitativeValue", "value": p["sqm"], "unitCode": "MTK"}}
           if p.get("sqm") else {}),
        **({"amenityFeature": acc} if acc else {}),
    }

    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Collections", "item": SITE + "/collections"},
            {"@type": "ListItem", "position": 3, "name": name, "item": url},
        ]}

    head = f"""<title>{esc(title)}</title>
<meta name="description" content="{esc(meta)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MGROUP Estates">
<meta property="og:title" content="{esc(name)}">
<meta property="og:description" content="{esc(meta)}">
<meta property="og:url" content="{url}">
{f'<meta property="og:image" content="{esc(hero)}">' if hero else ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(name)}">
<meta name="twitter:description" content="{esc(meta)}">
{f'<meta name="twitter:image" content="{esc(hero)}">' if hero else ''}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(crumbs, ensure_ascii=False)}</script>
<script>window.MG_PROPERTY_ID={int(p['id'])};</script>"""

    out = shell
    # one directory deep, so every relative asset path needs lifting
    out = out.replace('href="assets/', 'href="/assets/').replace('src="assets/', 'src="/assets/')
    out = re.sub(r'href="(?!https?:|/|#|mailto:|tel:)([a-z0-9-]+\.html)', r'href="/\1', out)
    out = re.sub(r"<title>.*?</title>", "", out, count=1, flags=re.S)
    out = re.sub(r'<meta name="description"[^>]*>', "", out, count=1)
    out = out.replace("</head>", head + "\n</head>", 1)
    out = out.replace("<body", f'<body data-property-id="{int(p["id"])}"', 1)

    # The pre-rendered copy sits inside the shell where the live content goes,
    # so JS can simply overwrite it.
    # Progressive enhancement, not cloaking: the same words, shown until
    # the live render takes over. If Supabase never answers, the block
    # stays and the page still has its content — which is more than the
    # query-string page managed, since that showed nothing at all.
    block = (
        '<div id="mgPrerender" style="max-width:860px;margin:0 auto;padding:40px 24px">'
        + "".join(body) + "</div>"
        + "<script>(function(){var t=0;(function go(){var live=document.getElementById('detTitle');"
          "if(live&&live.textContent.trim()){var b=document.getElementById('mgPrerender');"
          "if(b)b.remove();return;}if(++t<60)setTimeout(go,200);})();})();</script>")
    out = out.replace('<div class="det-body">', '<div class="det-body">' + block, 1) \
        if '<div class="det-body">' in out else out.replace("</body>", block + "</body>", 1)
    return slug, out


def main():
    shell = open(os.path.join(ROOT, "property.html"), encoding="utf-8").read()

    props = get("properties", "is_active=eq.true&order=id.asc")
    imgs = get("property_images", "order=sort_order.asc")
    dets = get("property_details", "order=sort_order.asc")

    by_prop_img, by_prop_det = {}, {}
    for i in imgs:
        by_prop_img.setdefault(i.get("property_id"), []).append(i)
    for d in dets:
        by_prop_det.setdefault(d.get("property_id"), []).append(d)

    urls = []
    for p in props:
        slug, page = build_listing_html(
            p, by_prop_img.get(p["id"], []), by_prop_det.get(p["id"], []), shell)
        d = os.path.join(ROOT, "property", slug)
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page)
        urls.append((f"/property/{slug}/", "0.8", p.get("name")))
        print(f"  {p['id']:>3}  /property/{slug}/")

    today = date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, prio, _ in PAGES + urls:
        sm.append(f"  <url><loc>{SITE}{path}</loc><lastmod>{today}</lastmod>"
                  f"<priority>{prio}</priority></url>")
    sm.append("</urlset>")
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(sm) + "\n")

    open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8").write(f"""# MGROUP Estates
# Everything here is public listing information and we want it indexed,
# by search engines and by AI assistants alike.

User-agent: *
Allow: /
Disallow: /admin/

# Named explicitly so there is no doubt these are welcome.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: Bytespider
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: meta-externalagent
Allow: /

Sitemap: {SITE}/sitemap.xml
""")

    lines = [
        "# MGROUP Estates",
        "",
        "> Private property advisory in Thailand. We broker luxury villas, branded",
        "> residences, condominiums and land in Phuket, Samui and Bangkok, and manage",
        "> rentals and lifestyle concierge for owners and buyers.",
        "",
        "M GROUP BUSINESS CO.,LTD — 63/202, Thepkasattri Road, Kohkaew Sub-district,",
        "Muang District, Phuket 83000, Thailand. contact@mgroupestates.com",
        "",
        "## Pages",
        "",
    ]
    for path, _, what in PAGES:
        lines.append(f"- [{what}]({SITE}{path})")
    lines += ["", f"## Properties for sale ({len(urls)})", ""]
    for p in props:
        slug = (p.get("slug") or "").strip() or slugify(p.get("name"))
        bits = [b for b in [
            p.get("property_type"), p.get("city"),
            f"{p['beds']} bed" if p.get("beds") else None,
            f"{p['sqm']} sqm" if p.get("sqm") else None,
            p.get("price_display") or baht(p.get("price_thb"))] if b]
        lines.append(f"- [{p.get('name')}]({SITE}/property/{slug}/): " + ", ".join(bits))
    lines += ["", "## Notes", "",
              "- Prices are in Thai baht and current at the date of the sitemap.",
              "- Enquiries and viewing requests go through the contact form on any page.",
              ""]
    open(os.path.join(ROOT, "llms.txt"), "w", encoding="utf-8").write("\n".join(lines))

    print(f"\n  sitemap.xml  {len(PAGES) + len(urls)} urls")
    print(f"  robots.txt   AI crawlers allowed")
    print(f"  llms.txt     {len(urls)} listings")


if __name__ == "__main__":
    sys.exit(main())
