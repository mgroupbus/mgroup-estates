#!/usr/bin/env python3
"""Build the condo rental pages.

Writes rent/<slug>.html for every condo in PROJECTS and refreshes the condo
cards on rent-condo.html (between the CARDS markers). Run after editing the data:

    python3 build-rent.py
"""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = "https://mgroupestates.com"
PHONE = "66899723321"
SAMPLE = True  # listings below are placeholders; set False once real units are in
SB = "https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/"

# img: path under the site root, or a full URL. Empty = brown placeholder.
PROJECTS = [
    dict(slug="angsana-oceanview", name="Angsana Oceanview", code="AN",
         area="Laguna · Bang Tao Beach", area_th="ลากูน่า · หาดบางเทา", filt="laguna bangtao", img="",
         lo=80000, hi=250000, lease="Monthly – yearly", lease_th="รายเดือน – รายปี",
         best="Beachfront living", best_th="อยู่ริมหาด",
         desc="Beachfront residences by Angsana in Laguna Phuket, on Bang Tao Beach. Sea views, resort facilities and the Laguna lifestyle on your doorstep.",
         desc_th="เรสซิเดนซ์ริมหาดโดย Angsana ในลากูน่า ภูเก็ต บนหาดบางเทา วิวทะเล สิ่งอำนวยความสะดวกระดับรีสอร์ต และไลฟ์สไตล์ลากูน่าใกล้ตัว"),
    dict(slug="standard-residence-bangtao", name="The Standard Residence Bangtao", code="SR",
         area="Bang Tao", area_th="บางเทา", filt="bangtao", img="assets/rent/standard-residence-bangtao.jpg",
         lo=70000, hi=180000, lease="Monthly – yearly", lease_th="รายเดือน – รายปี",
         best="Beach lifestyle", best_th="ไลฟ์สไตล์ริมหาด",
         desc="Luxury branded residences by The Standard and Central Group, in one of Bang Tao's prime locations. For tenants who want a design-led home close to the beach.",
         desc_th="แบรนด์เรสซิเดนซ์ระดับลักชัวรีโดย The Standard และ Central Group ในทำเลหลักของบางเทา เหมาะกับผู้ที่ต้องการไลฟ์สไตล์ดีไซน์จัดใกล้ชายหาด"),
    dict(slug="the-aqua", name="The Aqua", code="AQ",
         area="Bang Tao", area_th="บางเทา", filt="bangtao", img="assets/rent/the-aqua.jpg",
         lo=60000, hi=120000, lease="Monthly – yearly", lease_th="รายเดือน – รายปี",
         best="Holidays · couples", best_th="พักผ่อน · คู่รัก",
         desc="A luxury waterfront residence by Boat Pattana in Bang Tao, close to the beach, restaurants and Boat Avenue. Suits both short and long stays.",
         desc_th="เรสซิเดนซ์ริมน้ำระดับลักชัวรีโดย Boat Pattana ในบางเทา ใกล้ชายหาด ร้านอาหาร และ Boat Avenue เหมาะกับการเช่าระยะสั้นและระยะยาว"),
    dict(slug="the-space", name="The Space Choeng Thale", code="SP",
         area="Cherng Talay", area_th="เชิงทะเล", filt="cherngtalay", img="",
         lo=18000, hi=35000, lease="6 – 12 months", lease_th="6 – 12 เดือน",
         best="Remote workers", best_th="คนทำงานทางไกล",
         desc="A condominium in Cherng Talay on Phuket's west coast, with easy access to Bang Tao, Laguna and daily shopping. A practical choice for remote workers and long stays.",
         desc_th="คอนโดในเชิงทะเล ฝั่งตะวันตกของภูเก็ต เดินทางสะดวกไปบางเทา ลากูน่า และซูเปอร์มาร์เก็ต เหมาะกับคนทำงานและผู้เช่าระยะยาว"),
    dict(slug="the-base", name="The Base Choeng Thale", code="BA",
         area="Cherng Talay", area_th="เชิงทะเล", filt="cherngtalay", img="assets/rent/the-base.jpg",
         lo=15000, hi=30000, lease="6 – 12 months", lease_th="6 – 12 เดือน",
         best="Families · professionals", best_th="ครอบครัว · คนทำงาน",
         desc="A condominium in Cherng Talay for tenants who want an easy everyday base, near international schools, shops and the west-coast beaches.",
         desc_th="คอนโดในเชิงทะเล สำหรับผู้เช่าที่ต้องการทำเลใช้ชีวิตประจำวันได้สะดวก ใกล้โรงเรียนนานาชาติ ร้านค้า และชายหาดฝั่งตะวันตก"),
    dict(slug="sky-park", name="Sky Park", code="SK",
         area="Laguna · Cherng Talay", area_th="ลากูน่า · เชิงทะเล", filt="laguna cherngtalay", img="",
         lo=25000, hi=55000, lease="Monthly – yearly", lease_th="รายเดือน – รายปี",
         best="Professionals · couples", best_th="คนทำงาน · คู่รัก",
         desc="A condominium in the Laguna area of Cherng Talay, close to Laguna's restaurants, cafés and facilities. Everything you need within a short walk or drive.",
         desc_th="คอนโดในย่านลากูน่า เชิงทะเล ใกล้ร้านอาหาร คาเฟ่ และสิ่งอำนวยความสะดวกของลากูน่า เหมาะกับผู้เช่าที่อยากได้ความสะดวกครบในที่เดียว"),
    dict(slug="canvas-sansiri", name="Canvas Sansiri", code="CV",
         area="Cherng Talay · Sansiri", area_th="เชิงทะเล · แสนสิริ", filt="cherngtalay", img=SB + "sale/p31/project/1776600364635-zfviyv.jpg",
         lo=25000, hi=50000, lease="6 – 12 months", lease_th="6 – 12 เดือน",
         best="Privacy · long stay", best_th="ความเป็นส่วนตัว · อยู่ยาว",
         desc="A Sansiri condominium in Cherng Talay: 175 units across four low-rise buildings, with a separate facilities building. Quiet and private.",
         desc_th="คอนโดโดยแสนสิริในเชิงทะเล 175 ยูนิต ใน 4 อาคารโลว์ไรส์ พร้อมอาคารส่วนกลางแยก บรรยากาศเป็นส่วนตัว"),
]

# Lifestyle fits. Which condo gets which is a first guess; confirm with the team.
TAGS = {
    "nomad":    ("Digital nomad", "ดิจิทัลโนแมด", "Цифровые кочевники", "Quiet corners to work and reliable Wi-Fi.", "มุมทำงานเงียบ และ Wi-Fi เสถียร", "Тихие места для работы и стабильный Wi-Fi."),
    "pet":      ("Pet-friendly", "เลี้ยงสัตว์ได้", "Можно с питомцами", "Units where pets are welcome. Ask us for the rules.", "มีห้องที่เลี้ยงสัตว์ได้ สอบถามกฎได้", "Есть квартиры, где можно с питомцами. Уточните правила."),
    "cook":     ("Love to cook", "ชอบทำอาหาร", "Любите готовить", "Units with a full kitchen.", "มีห้องที่ครัวครบ", "Квартиры с полноценной кухней."),
    "cafe":     ("Café lover", "ชอบนั่งคาเฟ่", "Любите кафе", "Cafés within a short walk or ride.", "มีคาเฟ่ใกล้ เดินหรือขับไม่ไกล", "Кафе в паре минут пешком или на байке."),
    "beach":    ("Near the beach", "ไปทะเลสะดวก", "Рядом с пляжем", "A few minutes to the sand.", "ไปทะเลได้ในไม่กี่นาที", "До пляжа несколько минут."),
    "parking":  ("Plenty of parking", "ที่จอดรถเยอะ", "Много парковки", "Plenty of resident parking.", "ที่จอดรถสำหรับลูกบ้านเพียงพอ", "Достаточно парковочных мест для жильцов."),
    "mall":     ("Near a shopping mall", "ใกล้ห้างสรรพสินค้า", "Рядом торговый центр", "Shopping malls a short drive away.", "ใกล้ห้าง ขับรถไปไม่ไกล", "Торговые центры в нескольких минутах езды."),
    "airport":  ("Easy to the airport", "ไปสนามบินง่าย", "Близко к аэропорту", "About 20–30 minutes to Phuket Airport.", "ไปสนามบินภูเก็ตประมาณ 20–30 นาที", "Около 20–30 минут до аэропорта Пхукета."),
    "gym":      ("Technogym fitness", "ฟิตเนส Technogym", "Фитнес Technogym", "A gym fitted with Technogym equipment.", "ฟิตเนสพร้อมอุปกรณ์ Technogym", "Спортзал с оборудованием Technogym."),
    "wellness": ("Near wellness", "ใกล้เวลเนส", "Рядом велнес", "Gyms, yoga and spas nearby.", "ใกล้ยิม โยคะ และสปา", "Рядом спортзалы, йога и спа."),
    "sauna":    ("Near a sauna", "ใกล้ซาวน่า", "Рядом сауна", "A sauna on site or close by.", "มีซาวน่าในโครงการหรือใกล้ๆ", "Сауна в комплексе или рядом."),
}
# Line icons for the lifestyle fits (24x24, stroke only)
FIT_ICONS = {
    "nomad": '<rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
    "pet": '<circle cx="7" cy="9" r="1.6"/><circle cx="11" cy="6" r="1.6"/><circle cx="15.5" cy="7" r="1.6"/><circle cx="18" cy="11" r="1.6"/><path d="M8.5 17.5c0-2.7 2-5 4.3-5s4.2 2.3 4.2 5c0 1.5-1.3 2.2-2.7 1.8-1-.3-2-.3-3 0-1.5.4-2.8-.3-2.8-1.8z"/>',
    "cook": '<path d="M3 11h13v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M16 12h5"/><path d="M7 4c-.8 1 .8 2 0 3M11 4c-.8 1 .8 2 0 3"/>',
    "cafe": '<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3c-.8 1 .8 2 0 3M12 3c-.8 1 .8 2 0 3"/>',
    "beach": '<path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M12 15V6"/><path d="M4 8a8 8 0 0 1 16 0z"/>',
    "parking": '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    "mall": '<path d="M5 8h14l-1 12H6z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    "airport": '<path d="M2 16l20-6-3-2-6 2-6-5-2 1 4 5-4 1.2-2-1.5-1.5.5z"/><path d="M3 20h18"/>',
    "gym": '<path d="M6 7v10M3.5 9.5v5M18 7v10M20.5 9.5v5M6 12h12"/>',
    "wellness": '<path d="M12 20c-4 0-8-2.5-8-7 3 0 5.5 1.5 8 4 2.5-2.5 5-4 8-4 0 4.5-4 7-8 7z"/><path d="M12 17c-2-2.5-2-6.5 0-10 2 3.5 2 7.5 0 10z"/>',
    "sauna": '<path d="M3 20h18"/><path d="M5 20v-6h14v6"/><path d="M8 4c-1 1.3 1 2.7 0 4M12 4c-1 1.3 1 2.7 0 4M16 4c-1 1.3 1 2.7 0 4"/>',
}

FITS = {
    "angsana-oceanview": ["beach", "gym", "wellness", "sauna", "cafe", "cook"],
    "standard-residence-bangtao": ["beach", "gym", "wellness", "sauna", "cafe", "nomad", "cook"],
    "the-aqua": ["beach", "gym", "cafe", "cook", "pet", "parking", "mall"],
    "the-space": ["nomad", "pet", "cook", "parking", "airport", "mall"],
    "the-base": ["nomad", "cook", "parking", "airport", "pet", "mall"],
    "cassia": ["beach", "wellness", "sauna", "cafe"],
    "sky-park": ["nomad", "cafe", "wellness", "parking", "airport", "mall"],
    "canvas-sansiri": ["pet", "cook", "parking", "sauna", "airport", "mall"],
}


def tag_span(k, cls=""):
    en, th, ru = TAGS[k][:3]
    c = f' class="{cls}"' if cls else ""
    return f'<span{c} data-th="{esc(th)}" data-ru="{esc(ru)}">{esc(en)}</span>'


def fits_filter():
    chips = "".join(f'<button type="button" data-fit="{k}"><svg viewBox="0 0 24 24" aria-hidden="true">{FIT_ICONS[k]}</svg>{tag_span(k)}</button>' for k in TAGS)
    return ('<div class="fits-box">\n      <!-- FITS:START (generated by build-rent.py) -->\n'
            '      <h3 data-th="อะไรสำคัญสำหรับคุณ?">What matters to you?</h3>\n'
            '      <p data-th="แตะเพื่อกรอง เลือกได้หลายข้อ">Tap to filter. Pick more than one.</p>\n'
            f'      <div class="fits" role="group" aria-label="Lifestyle">{chips}</div>\n'
            '      <p class="nofit" id="nofit" hidden data-th="ยังไม่มีคอนโดที่ตรงทุกข้อ ลองเอาออกสักข้อ">No condo matches all of these. Remove one to see more.</p>\n'
            '      <!-- FITS:END -->\n    </div>')


# Nest+ concierge: what every MGROUP Estates tenant can use. Shown on every rental page.
NEST = [
    ('<circle cx="8" cy="12" r="4.5"/><circle cx="8" cy="12" r="1.2"/><path d="M12.5 12H21M18 12v3.5M21 12v2.5"/>',
     "Move-in help", "ช่วยย้ายเข้า", "Помощь с заездом",
     "We meet you at the condo, check the unit with you and hand over the keys.", "พบคุณที่ห้อง ตรวจห้องด้วยกัน และส่งมอบกุญแจ", "Встречаем в квартире, вместе проверяем её и передаём ключи."),
    ('<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
     "Internet & utilities", "เน็ต · น้ำไฟ", "Интернет и коммуналка",
     "We set up Wi-Fi, electricity and water for you.", "ติดตั้ง Wi-Fi และจัดการค่าน้ำค่าไฟให้", "Подключаем Wi-Fi, электричество и воду."),
    ('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
     "Cleaning & laundry", "แม่บ้าน · ซักรีด", "Уборка и стирка",
     "Book weekly cleaning or laundry through us.", "จองแม่บ้านรายสัปดาห์หรือซักรีดผ่านเรา", "Еженедельная уборка или стирка через нас."),
    ('<path d="M3 15l2-6a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 9l2 6v3h-3v-2H6v2H3z"/><circle cx="7.5" cy="13.5" r=".8"/><circle cx="16.5" cy="13.5" r=".8"/>',
     "Car & scooter", "รถยนต์ · มอเตอร์ไซค์", "Машина и байк",
     "A car or scooter delivered to your condo.", "เช่ารถยนต์หรือมอเตอร์ไซค์ ส่งถึงคอนโด", "Машина или байк с доставкой к кондо."),
    ('<path d="M2 16l20-6-3-2-6 2-6-5-2 1 4 5-4 1.2-2-1.5-1.5.5z"/><path d="M3 20h18"/>',
     "Airport transfers", "รับส่งสนามบิน", "Трансфер в аэропорт",
     "Pick-up and drop-off at Phuket Airport.", "รับส่งสนามบินภูเก็ต", "Встреча и проводы в аэропорту Пхукета."),
    ('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.5-.6-.6-2.5z"/>',
     "Repairs", "แจ้งซ่อม", "Ремонт",
     "Message us and we arrange the fix with the owner.", "แจ้งเรา เราประสานเจ้าของห้องและช่างให้", "Напишите нам — мы организуем ремонт с владельцем."),
]

NEST_CSS = """
/* Nest+ concierge: compact header + six small icon tiles */
.nest{background:var(--band);border-block:1px solid var(--line);padding-block:0}
.nest .wrap{padding-block:40px;display:grid;gap:18px}
.nest .top{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:12px 24px}
.nest .top>div{display:grid;gap:4px;min-width:0}
.nest .eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--accent)}
.nest h2{font-family:var(--display);font-weight:500;font-size:clamp(30px,4vw,40px);line-height:1;color:var(--ink)}
.nest h2.mark{display:inline-grid;justify-items:start;gap:2px;margin-block:2px 4px}
.nest h2 .word{font-size:clamp(38px,5vw,52px);line-height:.9;letter-spacing:-.01em}
.nest h2 .plus{color:var(--accent);font-style:italic;margin-left:1px}
.nest h2 .sub{font-family:var(--body);font-size:10px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--mid);padding-left:3px}
.nest .lead{color:var(--mid);font-size:14.5px}
.nest .ask{font-size:13px;font-weight:600;color:var(--accent);text-decoration:none;white-space:nowrap}
.nest .ask:hover{text-decoration:underline}
.nest ul{list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.nest li{display:grid;justify-items:center;align-content:start;gap:10px;text-align:center;padding:18px 8px 16px;border-radius:18px;min-width:0;cursor:default;
  background:none;border:0;
  transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.nest li .ic{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 32% 28%,color-mix(in srgb,var(--accent) 6%,var(--band)) 0,color-mix(in srgb,var(--accent) 24%,var(--band)) 75%);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 38%,transparent),0 10px 20px -12px color-mix(in srgb,var(--accent) 80%,transparent);
  transition:background .3s,transform .3s cubic-bezier(.2,.8,.2,1)}
.nest li svg{width:24px;height:24px;color:var(--accent);fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;transition:color .3s}
.nest li b{font-weight:500;font-size:13.5px;line-height:1.3;color:var(--ink)}
.nest li:hover{transform:translateY(-4px)}
.nest li:hover .ic{background:var(--accent);transform:scale(1.06) rotate(-4deg)}
.nest li:hover svg{color:var(--accent-ink)}
@media(max-width:860px){.nest ul{grid-template-columns:repeat(3,1fr)}}
"""


def nest_block():
    items = "\n".join(
        f'      <li title="{esc(d)}"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></span>'
        f'<b data-th="{esc(th)}" data-ru="{esc(ru)}">{esc(en)}</b></li>'
        for icon, en, th, ru, d, dth, dru in NEST)
    return f"""<!-- NEST:START (generated by build-rent.py) -->
<section class="nest" id="nest">
  <div class="wrap">
    <div class="top">
      <div>
        <p class="eyebrow" data-th="MGROUP Estates ดูแลอะไรให้คุณ" data-ru="Чем помогает MGROUP Estates">What MGROUP Estates takes care of</p>
        <h2 class="mark" aria-label="Nest+ concierge"><span class="word">Nest<span class="plus">+</span></span><span class="sub">concierge</span></h2>
        <p class="lead" data-th="เช่ากับเรา ใช้บริการ Nest+ concierge ได้ตลอดสัญญาเช่า" data-ru="Арендуйте у нас и пользуйтесь Nest+ concierge весь срок аренды.">Rent with us and you can use Nest+ concierge for as long as your lease runs.</p>
      </div>
      <a class="ask" href="https://wa.me/{PHONE}?text=Nest%2B%20concierge" target="_blank" rel="noopener" data-th="สอบถาม Nest+ →" data-ru="Узнать о Nest+ →">Ask about Nest+ →</a>
    </div>
    <ul>
{items}
    </ul>
  </div>
</section>
<!-- NEST:END -->"""


# Menu (three-line button + side panel), same on every rental page
MENU_BTN = ('<button type="button" class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="drawer">'
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>')

MENU_CSS = """/* menu drawer */
.hdr-r{display:flex;align-items:center;gap:10px}
.menu-btn{width:42px;height:42px;flex:none;border-radius:50%;border:1px solid var(--line);background:var(--paper);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:transform .2s,background .2s}
.menu-btn:hover{transform:scale(1.06)}
.menu-btn svg{width:20px;height:20px}
header.top.over .menu-btn{background:rgba(255,250,242,.12);border-color:rgba(255,250,242,.45);color:#fffaf2;backdrop-filter:blur(6px)}
.drawer{position:fixed;inset:0;z-index:90;display:flex;justify-content:flex-end;pointer-events:none}
.drawer .scrim{position:absolute;inset:0;background:rgba(20,15,10,.5);opacity:0;transition:opacity .3s}
.drawer .panel{position:relative;width:min(420px,100%);height:100%;overflow-y:auto;background:var(--page);color:var(--ink);transform:translateX(100%);transition:transform .45s cubic-bezier(.2,.8,.2,1);
  padding:calc(18px + env(safe-area-inset-top,0px)) max(24px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) 28px;display:flex;flex-direction:column;gap:18px;box-shadow:-30px 0 60px -30px rgba(0,0,0,.4)}
.drawer.open{pointer-events:auto}
.drawer.open .scrim{opacity:1}
.drawer.open .panel{transform:none}
.drawer .ph{display:flex;align-items:center;justify-content:space-between}
.drawer .ph img{height:16px;width:auto;filter:var(--logo)}
.drawer .x{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--paper);color:var(--ink);display:grid;place-items:center;cursor:pointer}
.drawer .x svg{width:18px;height:18px}
.drawer nav{display:grid;margin-top:8px}
.drawer nav a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink)}
.drawer nav a:first-child{border-top:1px solid var(--line)}
.drawer nav b{display:block;font:500 30px/1.1 var(--display)}
:lang(th) .drawer nav b{font:500 22px/1.3 "Noto Sans Thai",var(--body)}
.drawer nav small{display:block;font-size:13px;color:var(--mid);margin-top:3px}
.drawer nav svg{width:20px;height:20px;flex:none;color:var(--accent);transition:transform .25s}
.drawer nav a:hover svg{transform:translateX(5px)}
.drawer nav a:hover b{color:var(--accent)}
.drawer .pf{margin-top:auto;font-size:12.5px;color:var(--mid)}
body.menu-open{overflow:hidden}
@media (prefers-reduced-motion:reduce){.drawer .panel,.drawer .scrim{transition:none}}
/* end menu drawer */"""


def menu_block(prefix, logo, owners_url):
    home = prefix or ""
    ar = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
    items = [
        (home + "#tenant", "", "Tenant", "ผู้เช่า", "Арендаторам", "Find a condominium and book a viewing", "หาคอนโดและนัดดูห้อง", "Выберите кондо и запишитесь на просмотр"),
        (owners_url, "", "Owner", "เจ้าของห้อง", "Владельцам", "List your condominium with us", "ลงประกาศปล่อยเช่ากับเรา", "Сдайте квартиру с нами"),
        ("#nest", "", "Nest+ concierge", "Nest+ concierge", "Nest+ concierge", "What we take care of for tenants", "บริการดูแลผู้เช่า", "Сервис для арендаторов"),
        (f"https://wa.me/{PHONE}", ' target="_blank" rel="noopener"', "Contact us", "ติดต่อเรา", "Связаться с нами", "Chat with us on WhatsApp", "แชตกับเราทาง WhatsApp", "Напишите нам в WhatsApp"),
    ]
    links = "\n".join(
        f'      <a href="{h}"{x}><span><b data-th="{esc(bt)}" data-ru="{esc(br)}">{esc(b)}</b><small data-th="{esc(st)}" data-ru="{esc(sr)}">{esc(sm)}</small></span>{ar}</a>'
        for h, x, b, bt, br, sm, st, sr in items)
    return f"""<!-- MENU:START (generated by build-rent.py) -->
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="scrim" data-close></div>
  <div class="panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="ph"><img src="{logo}" alt="MGROUP Estates" width="126" height="16"><button type="button" class="x" data-close aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <nav aria-label="Main">
{links}
    </nav>
    <p class="pf">contact@mgroupestates.com</p>
  </div>
</div>
<script>
(function(){{
  var d=document.getElementById("drawer"),btn=document.getElementById("menuBtn");
  function set(open){{d.classList.toggle("open",open);d.setAttribute("aria-hidden",String(!open));btn.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open);if(open){{var f=d.querySelector(".x");setTimeout(function(){{f.focus()}},50)}}else btn.focus({{preventScroll:true}})}}
  btn.addEventListener("click",function(){{set(true)}});
  d.addEventListener("click",function(e){{if(e.target.closest("[data-close]")||e.target.closest("nav a"))set(false)}});
  document.addEventListener("keydown",function(e){{if(e.key==="Escape"&&d.classList.contains("open"))set(false)}});
}})();
</script>
<!-- MENU:END -->"""


# Five sample units per condo: (beds, baths, sqm, floor, view, view_th, price share of the range, photo crop)
UNITS = [
    (1, 1, 38, 2, "Garden view", "วิวสวน", 0.0, "20% 30%"),
    (1, 1, 45, 5, "Pool view", "วิวสระว่ายน้ำ", 0.15, "80% 60%"),
    (2, 2, 72, 3, "Pool view", "วิวสระว่ายน้ำ", 0.42, "50% 85%"),
    (2, 2, 80, 6, "Mountain view", "วิวภูเขา", 0.58, "10% 90%"),
    (3, 3, 125, 7, "Top floor · corner", "ชั้นบนสุด · ห้องมุม", 1.0, "90% 10%"),
]


def esc(s):
    return html.escape(s, quote=True)


def baht(n):
    return f"{n:,}"


def units_for(p):
    out = []
    for i, (beds, baths, sqm, floor, view, view_th, share, crop) in enumerate(UNITS):
        price = p["lo"] + (p["hi"] - p["lo"]) * share
        price = int(round(price / 1000.0) * 1000)
        ref = f"{p['code']}-{floor}{chr(65 + i)}"
        out.append(dict(ref=ref, beds=beds, baths=baths, sqm=sqm, floor=floor, view=view, view_th=view_th, price=price, crop=crop))
    return out


def img_url(p, prefix):
    if not p["img"]:
        return ""
    return p["img"] if p["img"].startswith("http") else prefix + p["img"]


def abs_img(p):
    if not p["img"]:
        return SITE + "/assets/svc-rent.jpg"
    return p["img"] if p["img"].startswith("http") else SITE + "/" + p["img"]


ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"/></svg>'


# ---------- main page cards ----------
def card(p):
    url = img_url(p, "")
    style = f' style="--img:url(\'{esc(url)}\')"' if url else ""
    return (
        f'      <a class="item" id="{p["slug"]}" href="rent/{p["slug"]}.html" data-name="{esc(p["name"])}" data-area="{p["filt"]}" data-tags="{" ".join(FITS[p["slug"]])}">'
        f'<span class="card"{style}><span class="ttl">'
        f'<span class="area" data-th="{esc(p["area_th"])}">{esc(p["area"])}</span><h3>{esc(p["name"])}</h3>'
        f'<span class="price">฿{baht(p["lo"])} – {baht(p["hi"])} <small data-th="/ เดือน">/ month</small></span>'
        f'<span class="beds" data-th="1–3 ห้องนอน · ดู 5 ห้อง">1–3 bedrooms · see 5 units</span>'
        f'<span class="fitline">{" · ".join(tag_span(k) for k in FITS[p["slug"]][:3])}</span>'
        f'</span><span class="chev">{ARROW}</span></span></a>'
    )


def update_main():
    path = os.path.join(ROOT, "rent-condo.html")
    s = open(path, encoding="utf-8").read()
    cards = "\n".join(card(p) for p in PROJECTS)
    block = f'<div class="acc" id="acc">\n      <!-- CARDS:START (generated by build-rent.py) -->\n{cards}\n      <!-- CARDS:END -->\n    </div>'
    if "<!-- CARDS:START" in s:
        s = re.sub(r'<div class="acc" id="acc">.*?<!-- CARDS:END -->\n    </div>', lambda m: block, s, count=1, flags=re.S)
    else:
        start = s.index('<div class="acc" id="acc">')
        end = s.index('\n  </div>\n</section>', start)
        s = s[:start] + block + s[end:]
    box = fits_filter()
    if "<!-- FITS:START" in s:
        s = re.sub(r'<div class="fits-box">.*?<!-- FITS:END -->\n    </div>', lambda m: box, s, count=1, flags=re.S)
    else:
        i = s.index('<div class="filters" role="group" aria-label="Filter by area">')
        s = s[:i] + box + "\n\n    " + s[i:]
    if "<!-- NEST:START" in s:
        s = re.sub(r'<!-- NEST:START.*?<!-- NEST:END -->', lambda m: nest_block(), s, count=1, flags=re.S)
    else:
        s = s.replace("<!-- FAQ -->", nest_block() + "\n\n<!-- FAQ -->", 1)
    s = re.sub(r"/\* Nest\+ concierge[^*]*\*/.*?(?=\n\n/\* tabs: tenant / owner \*/)", "", s, count=1, flags=re.S)
    s = s.replace("/* tabs: tenant / owner */", NEST_CSS.strip() + "\n\n/* tabs: tenant / owner */", 1)
    n = len(PROJECTS)
    for pat, rep in [(r"All \(\d+\)", f"All ({n})"), (r"ทั้งหมด \(\d+\)", f"ทั้งหมด ({n})"), (r"Все \(\d+\)", f"Все ({n})"),
                     (r"See \d+ condo", f"See {n} condo"), (r"ดู \d+ คอนโด", f"ดู {n} คอนโด"), (r"\d+ кондо и запись", f"{n} кондо и запись"),
                     (r"\d+ hand-picked", f"{n} hand-picked")]:
        s = re.sub(pat, rep, s)
    items = ",\n".join(
        '   {"@type":"ListItem","position":%d,"item":{"@type":"ApartmentComplex","name":%s,"url":"%s/rent/%s","address":{"@type":"PostalAddress","addressLocality":%s,"addressRegion":"Phuket","addressCountry":"TH"}}}'
        % (i + 1, json.dumps(p["name"]), SITE, p["slug"], json.dumps(p["area"].replace(" · ", ", "))) for i, p in enumerate(PROJECTS))
    s = re.sub(r'\{"@type":"ItemList".*?\]\},\n', lambda m: '{"@type":"ItemList","name":"Condominiums for rent in Bang Tao and Cherng Talay, Phuket","numberOfItems":%d,"itemListElement":[\n%s]},\n' % (n, items), s, count=1, flags=re.S)
    if "<!-- MENU:START" in s:
        s = re.sub(r"<!-- MENU:START.*?<!-- MENU:END -->", lambda m: menu_block("", "assets/logo.png", "rent/owners.html"), s, count=1, flags=re.S)
    else:
        s = s.replace("</header>\n", "</header>\n" + menu_block("", "assets/logo.png", "rent/owners.html") + "\n", 1)
    s = re.sub(r"/\* menu drawer \*/.*?/\* end menu drawer \*/\n?", "", s, count=1, flags=re.S)
    s = s.replace("/* tabs: tenant / owner */", MENU_CSS + "\n\n/* tabs: tenant / owner */", 1)
    # structured data: each condo points at its own page
    for p in PROJECTS:
        s = re.sub(r'"url":"https://mgroupestates.com/rent-condo#' + re.escape(p["slug"]) + '"',
                   f'"url":"{SITE}/rent/{p["slug"]}"', s)
    open(path, "w", encoding="utf-8").write(s)


# ---------- project pages ----------
CSS = r"""
/* Layout: photo hero with the price range, then a bedroom filter over a grid of unit cards. */
:root{
  --page:#fcfaf7; --paper:#ffffff; --band:#f5f0e8;
  --ink:#33291f; --mid:#6b5a47; --stone:#9a8467; --line:#e6ded3;
  --accent:#8a6d3b; --accent-ink:#ffffff; --wa:#1f7a4d; --wa-ink:#ffffff;
  --logo:none; --shadow:0 18px 50px -24px rgba(51,41,31,.35);
  --display:"Cormorant Garamond","Noto Sans Thai",Georgia,serif;
  --body:"Figtree","Noto Sans Thai",system-ui,sans-serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --page:#1a1612; --paper:#231e18; --band:#1f1a15; --ink:#f1e9dc; --mid:#c3b5a2; --stone:#a8926f; --line:#3a3128;
  --accent:#c9a96a; --accent-ink:#1a1612; --wa:#2f9a64; --wa-ink:#0e1a13;
  --logo:invert(1) brightness(1.1); --shadow:0 18px 50px -24px rgba(0,0,0,.7); color-scheme:dark}}
:root[data-theme="dark"]{
  --page:#1a1612; --paper:#231e18; --band:#1f1a15; --ink:#f1e9dc; --mid:#c3b5a2; --stone:#a8926f; --line:#3a3128;
  --accent:#c9a96a; --accent-ink:#1a1612; --wa:#2f9a64; --wa-ink:#0e1a13;
  --logo:invert(1) brightness(1.1); --shadow:0 18px 50px -24px rgba(0,0,0,.7); color-scheme:dark}
*{box-sizing:border-box;margin:0;padding:0}
[hidden]{display:none!important}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
body{font-family:var(--body);font-size:16px;line-height:1.6;color:var(--ink);background:var(--page);-webkit-font-smoothing:antialiased;overflow-x:hidden;padding-top:env(safe-area-inset-top,0px)}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:#2a2119}
a{color:inherit}
.wrap{max-width:1120px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
h1,h2,h3{font-family:var(--display);font-weight:500;line-height:1.1;text-wrap:balance}
:lang(th) h1,:lang(th) h2,:lang(th) h3{font-family:"Noto Sans Thai",var(--body);line-height:1.3}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 20px;border-radius:999px;font:600 13px/1 var(--body);letter-spacing:.05em;text-decoration:none;border:1px solid var(--ink);background:var(--ink);color:var(--page);cursor:pointer}
.btn svg{width:16px;height:16px;flex:none}
.btn.gold{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.btn.wa{background:var(--wa);border-color:var(--wa);color:var(--wa-ink)}
.btn.line{background:transparent;color:var(--ink)}
.btn.sm{min-height:38px;padding:0 14px;font-size:12px}

header.top{position:absolute;left:0;right:0;top:env(safe-area-inset-top,0px);z-index:50;background:transparent}
header.top.over{background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none}
header.top.over .back{color:rgba(255,250,242,.85)}
header.top.over .brand img{filter:invert(1) drop-shadow(0 1px 6px rgba(0,0,0,.45))}
header.top.over .lang{border-color:rgba(255,250,242,.4)}
header.top.over .lang button{color:rgba(255,250,242,.8)}
header.top.over .lang button.on{background:#fffaf2;color:#33291f}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;height:60px}
.back{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;text-decoration:none;color:var(--mid)}
.back svg{width:16px;height:16px;transform:rotate(180deg)}
.brand img{height:16px;width:auto;filter:var(--logo)}
.lang{display:flex;border:1px solid var(--line);border-radius:999px;overflow:hidden}
.lang button{background:none;border:0;padding:6px 11px;font:600 11px var(--body);letter-spacing:.1em;cursor:pointer;color:var(--mid)}
.lang button.on{background:var(--ink);color:var(--page)}
@media(max-width:520px){.brand{display:none}}

.hero{color:#fffaf2;background:linear-gradient(180deg,rgba(20,15,10,.25),rgba(20,15,10,.5) 45%,rgba(20,15,10,.9)),var(--img,none) center/cover no-repeat,radial-gradient(120% 90% at 85% 0%,#a0865c 0,transparent 55%),linear-gradient(140deg,#5b4936,#241c15)}
.hero .wrap{padding-block:clamp(120px,22vw,220px) 34px;display:grid;gap:10px}
.hero .area{font-size:11.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:#e8d3a8}
.hero h1{font-size:clamp(38px,6.4vw,68px)}
.hero .price{font-size:clamp(18px,2.4vw,22px);font-weight:600;font-variant-numeric:tabular-nums}
.hero .price small{font-weight:400;opacity:.8;font-size:.75em}
.hero p.desc{max-width:60ch;color:rgba(255,250,242,.86);font-size:15.5px}
.hero .facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.hero .facts>span{font-size:12.5px;padding:6px 12px;border-radius:999px;background:rgba(255,250,242,.12);border:1px solid rgba(255,250,242,.28);backdrop-filter:blur(4px)}
.hero .facts b{font-weight:600;color:#e8d3a8;margin-right:4px}

section{padding-block:44px}
.bar-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:14px;margin-bottom:18px}
.bar-head h2{font-size:clamp(28px,4vw,40px)}
.bar-head p{color:var(--mid);font-size:14px}
.sample{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);border:1px dashed var(--accent);border-radius:999px;padding:3px 10px}
.filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.filters button{font:500 13px var(--body);padding:9px 16px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--mid);cursor:pointer}
.filters button.on{background:var(--ink);border-color:var(--ink);color:var(--page)}
.filters button span{opacity:.6;margin-left:4px;font-variant-numeric:tabular-nums}

.units{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:900px){.units{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.units{grid-template-columns:1fr}}
.unit{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.unit .ph{position:relative;aspect-ratio:16/10;max-width:100%;background:var(--img,none) var(--pos,center)/var(--zoom,cover) no-repeat,radial-gradient(120% 90% at 85% 0%,#a0865c 0,transparent 55%),linear-gradient(140deg,#5b4936,#241c15)}
.unit .ph .bd{position:absolute;left:12px;top:12px;font:600 12px var(--body);letter-spacing:.04em;padding:5px 11px;border-radius:999px;background:rgba(255,250,242,.92);color:#33291f}
.unit .ph .ref{position:absolute;right:12px;top:12px;font:600 11px var(--body);letter-spacing:.08em;padding:5px 10px;border-radius:999px;background:rgba(20,15,10,.55);color:#fffaf2}
.unit .ph .big{position:absolute;left:14px;bottom:8px;font:500 54px/1 var(--display);color:rgba(255,250,242,.28)}
.unit .in{padding:16px;display:grid;gap:10px;flex:1}
.unit h3{font-size:24px;font-variant-numeric:lining-nums}
.unit .meta{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13.5px;color:var(--mid);font-variant-numeric:tabular-nums}
.unit .meta span+span::before{content:"·";margin-right:14px;color:var(--stone)}
.unit .row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;padding-top:12px;border-top:1px solid var(--line)}
.unit .pr{font:600 20px var(--body);font-variant-numeric:tabular-nums}
.unit .pr small{font-weight:400;font-size:12.5px;color:var(--mid)}
.empty{padding:30px;text-align:center;color:var(--mid);border:1px dashed var(--line);border-radius:16px}

.great{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.great div{padding:14px 16px;border:1px solid var(--line);border-radius:14px;background:var(--paper);display:grid;grid-template-columns:44px 1fr;gap:2px 12px;align-items:center;min-width:0}
.great svg{grid-row:span 2;width:44px;height:44px;padding:10px;border-radius:50%;background:color-mix(in srgb,var(--accent) 12%,var(--paper));color:var(--accent);fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round}
.great b{font-weight:600;font-size:15px;align-self:end}
.great span{font-size:13.5px;color:var(--mid);align-self:start}
@media(max-width:720px){.great{grid-template-columns:1fr 1fr}}
@media(max-width:420px){.great{grid-template-columns:1fr}}
.steps-head{display:grid;gap:4px}
.steps-head p{color:var(--mid);font-size:14.5px}
.steps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;position:relative;counter-reset:none}
.steps li:not(:last-child)::after{content:"";position:absolute;left:44px;right:-12px;top:21px;height:2px;background:var(--line)}
.steps li.now::after{background:var(--accent)!important}
.steps li{position:relative;display:grid;gap:12px;align-content:start;min-width:0}
.steps .n{position:relative;z-index:1;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:600 17px var(--body);font-variant-numeric:tabular-nums;background:var(--paper);color:var(--accent);border:2px solid var(--accent)}
.steps li.now .n{background:var(--accent);color:var(--accent-ink);box-shadow:0 0 0 6px color-mix(in srgb,var(--accent) 20%,transparent)}
.steps li>div{display:grid;gap:3px;padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--paper);height:100%}
.steps li.now>div{border-color:var(--accent)}
.steps small{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--accent)}
.steps b{font-weight:600;font-size:15.5px;line-height:1.3}
.steps span{font-size:13.5px;color:var(--mid)}
.steps-cta{display:flex;flex-wrap:wrap;gap:10px}
.steps-cta .btn.wa{min-height:52px;padding:0 24px;font-size:14px}
@media(max-width:860px){
  .steps{grid-template-columns:1fr;gap:10px}
  .steps li:not(:last-child)::after{left:21px;right:auto;top:44px;bottom:-10px;width:2px;height:auto}
  .steps li{grid-template-columns:44px 1fr;gap:14px}
  .steps-cta .btn{flex:1 1 100%}
}

.others{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}
.others a{flex:0 0 min(70%,260px);scroll-snap-align:start;min-height:150px;border-radius:14px;padding:14px;display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;color:#fffaf2;background:linear-gradient(180deg,rgba(20,15,10,.1),rgba(20,15,10,.85)),var(--img,none) center/cover no-repeat,radial-gradient(120% 90% at 85% 0%,#a0865c 0,transparent 55%),linear-gradient(140deg,#5b4936,#241c15)}
.others b{font:500 21px/1.15 var(--display)}
.others small{font-size:12.5px;opacity:.85;font-variant-numeric:tabular-nums}
.share{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:12.5px;color:var(--mid)}
.share button{font:500 12px var(--body);padding:6px 12px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer}

footer{background:var(--ink);color:color-mix(in srgb,var(--page) 78%,transparent);font-size:14px}
footer .wrap{padding-block:44px calc(110px + env(safe-area-inset-bottom,0px));display:grid;gap:14px}
footer small{font-size:10.5px;letter-spacing:.3em;text-transform:uppercase}
footer img{height:20px;width:auto;filter:invert(1) brightness(1.2)}
:root[data-theme="dark"] footer img{filter:none}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) footer img{filter:none}}
footer a{text-decoration:none}
.sticky{position:fixed;left:0;right:0;bottom:0;z-index:55;display:flex;gap:8px;padding:10px max(14px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(14px,env(safe-area-inset-left,0px));background:color-mix(in srgb,var(--page) 96%,transparent);border-top:1px solid var(--line);backdrop-filter:blur(8px)}
.sticky .btn{flex:1}
@media(min-width:861px){.sticky{display:none}footer .wrap{padding-bottom:44px}}
.toast{position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--page);padding:10px 18px;border-radius:999px;font-size:13px;opacity:0;pointer-events:none;transition:opacity .3s;z-index:70;max-width:calc(100% - 32px);text-align:center}
.toast.show{opacity:1}
"""

JS = r"""
(function(){
  var PHONE="%PHONE%", PAGE="%PAGE%", NAME=%NAME%, lang="en", src="";
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  try{var qs=new URLSearchParams(location.search);src=qs.get("utm_source")||"";if(/^(th|ru)$/.test(qs.get("lang")||""))lang=qs.get("lang")}catch(e){}
  function wa(m){return "https://wa.me/"+PHONE+"?text="+encodeURIComponent(m+(src?"\nSource: "+src:""))}
  var tt;function toast(t){var e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){e.classList.remove("show")},2200)}
  function copy(t,m){try{navigator.clipboard.writeText(t).then(function(){toast(m)},function(){toast(t)})}catch(e){toast(t)}}

  function build(){
    var th=lang==="th";
    $$(".unit").forEach(function(u){
      var d=u.dataset;
      $(".ask",u).href=wa(th
        ?"สวัสดีค่ะ ขอนัดดูห้อง "+NAME+" ห้อง "+d.ref+" ("+d.beds+" ห้องนอน, "+d.sqm+" ตร.ม., ฿"+d.price+"/เดือน) ค่ะ"
        :"Hello, I'd like to book a viewing at "+NAME+", unit "+d.ref+" ("+d.beds+" bed, "+d.sqm+" sqm, ฿"+d.price+"/month).");
    });
    $$(".ask-all").forEach(function(a){a.href=wa(th?"สวัสดีค่ะ สนใจเช่าคอนโด "+NAME+" ค่ะ ขอห้องว่างและราคาล่าสุด":"Hello, I'm interested in renting at "+NAME+". Could you send available units and rates?")});
  }
  var tr=$$("[data-th]");tr.forEach(function(el){el.setAttribute("data-en",el.textContent)});
  function setLang(l){
    lang=l;document.documentElement.lang=l;
    tr.forEach(function(el){el.textContent=el.getAttribute("data-"+l)||el.getAttribute("data-en")});
    $$(".lang button").forEach(function(b){b.classList.toggle("on",b.dataset.lang===l)});
    build();try{localStorage.setItem("mg-lang",l)}catch(e){}
  }
  $$(".lang button").forEach(function(b){b.addEventListener("click",function(){setLang(b.dataset.lang)})});

  /* bedroom filter */
  $$(".filters button").forEach(function(b){b.addEventListener("click",function(){
    $$(".filters button").forEach(function(x){x.classList.toggle("on",x===b)});
    var n=0;$$(".unit").forEach(function(u){var show=b.dataset.b==="all"||u.dataset.beds===b.dataset.b;u.hidden=!show;if(show)n++});
    $("#empty").hidden=n>0;
  })});

  /* ad links for this condo */
  $$(".share button").forEach(function(b){b.addEventListener("click",function(){
    copy(PAGE+"?utm_source="+b.dataset.ch+"&utm_medium=paid_social&utm_campaign=condo-rent&utm_content="+PAGE.split("/").pop(),
      lang==="th"?"คัดลอกลิงก์ "+b.textContent+" แล้ว":b.textContent+" ad link copied");
  })});


  if(lang==="en"){try{var sl=localStorage.getItem("mg-lang");if(sl==="th"||sl==="ru")lang=sl}catch(e){}}
  setLang(lang);
})();
"""


def unit_card(p, u, i):
    url = img_url(p, "../")
    style = []
    if url:
        style += [f"--img:url('{esc(url)}')", f"--pos:{u['crop']}", "--zoom:" + ("cover" if i == 0 else f"{150 + i * 12}%")]
    st = f' style="{";".join(style)}"' if style else ""
    bed_en = f"{u['beds']} bedroom" + ("s" if u["beds"] > 1 else "")
    bed_th = f"{u['beds']} ห้องนอน"
    return f"""      <article class="unit" data-beds="{u['beds']}" data-ref="{u['ref']}" data-sqm="{u['sqm']}" data-price="{baht(u['price'])}">
        <div class="ph"{st}><span class="bd" data-th="{bed_th}">{bed_en}</span><span class="ref">{u['ref']}</span>{'' if url else f'<span class="big" aria-hidden="true">{u["beds"]} BR</span>'}</div>
        <div class="in">
          <h3><span data-th="{bed_th}">{bed_en}</span> · <span data-th="{esc(u['view_th'])}">{esc(u['view'])}</span></h3>
          <p class="meta"><span data-th="{u['sqm']} ตร.ม.">{u['sqm']} sqm</span><span data-th="{u['baths']} ห้องน้ำ">{u['baths']} bath</span><span data-th="ชั้น {u['floor']}">Floor {u['floor']}</span></p>
          <div class="row"><span class="pr">฿{baht(u['price'])} <small data-th="/ เดือน">/ month</small></span><a class="btn wa sm ask" href="https://wa.me/{PHONE}" target="_blank" rel="noopener">{WA_ICON}<span data-th="นัดดูห้อง">Book viewing</span></a></div>
        </div>
      </article>"""


def project_page(p):
    units = units_for(p)
    url = img_url(p, "../")
    hero_style = f' style="--img:url(\'{esc(url)}\')"' if url else ""
    page_url = f"{SITE}/rent/{p['slug']}"
    title = f"{p['name']} Condo for Rent, {p['area'].split(' · ')[0]}, Phuket | MGROUP Estates"
    desc = (f"Rent at {p['name']}, {p['area']}, Phuket. 1–3 bedroom units from ฿{baht(p['lo'])} to ฿{baht(p['hi'])} a month. "
            f"Book a viewing on WhatsApp with MGROUP Estates.")
    counts = {b: sum(1 for u in units if u["beds"] == b) for b in (1, 2, 3)}
    others = "\n".join(
        f'      <a href="{o["slug"]}.html"' + (f' style="--img:url(\'{esc(img_url(o, "../"))}\')"' if o["img"] else "") +
        f'><b>{esc(o["name"])}</b><small>฿{baht(o["lo"])} – {baht(o["hi"])} <span data-th="/ เดือน">/ month</span></small></a>'
        for o in PROJECTS if o is not p)
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "ApartmentComplex", "name": p["name"], "url": page_url, "image": abs_img(p), "description": p["desc"],
             "address": {"@type": "PostalAddress", "addressLocality": p["area"].replace(" · ", ", "), "addressRegion": "Phuket", "addressCountry": "TH"},
             "numberOfBedrooms": "1-3"},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "Condos for rent", "item": SITE + "/rent-condo"},
                {"@type": "ListItem", "position": 3, "name": p["name"], "item": page_url}]},
            {"@type": "RealEstateAgent", "name": "MGROUP Estates", "url": SITE, "logo": SITE + "/assets/logo.png"},
        ]}
    great = "\n".join(
        f'      <div><svg viewBox="0 0 24 24" aria-hidden="true">{FIT_ICONS[k]}</svg><b data-th="{esc(TAGS[k][1])}" data-ru="{esc(TAGS[k][2])}">{esc(TAGS[k][0])}</b>'
        f'<span data-th="{esc(TAGS[k][4])}" data-ru="{esc(TAGS[k][5])}">{esc(TAGS[k][3])}</span></div>'
        for k in FITS[p["slug"]])
    js = JS.replace("%PHONE%", PHONE).replace("%PAGE%", page_url).replace("%NAME%", json.dumps(p["name"]))
    sample = ('<span class="sample" data-th="ตัวอย่างข้อมูล">Sample listings</span>' if SAMPLE else "")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MGROUP Estates">
<meta property="og:title" content="{esc(p['name'])} · condo for rent in {esc(p['area'])}, Phuket">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{page_url}">
<meta property="og:image" content="{esc(abs_img(p))}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Figtree:wght@300;400;500;600&family=Noto+Sans+Thai:wght@300;400;500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{CSS}{NEST_CSS}{MENU_CSS}</style>
</head>
<body>
<header class="top over">
  <div class="wrap">
    <a class="back" href="../rent-condo.html">{ARROW}<span data-th="คอนโดทั้งหมด">All condos</span></a>
    <a class="brand" href="{SITE}/" aria-label="MGROUP Estates"><img src="../assets/logo.png" alt="MGROUP Estates" width="126" height="16"></a>
    <div class="hdr-r"><div class="lang" role="group" aria-label="Language"><button type="button" data-lang="en" class="on">EN</button><button type="button" data-lang="ru">RU</button><button type="button" data-lang="th">TH</button></div>{MENU_BTN}</div>
  </div>
</header>
{menu_block("../rent-condo.html", "../assets/logo.png", "owners.html")}

<main>
<div class="hero"{hero_style}>
  <div class="wrap">
    <span class="area" data-th="{esc(p['area_th'])}">{esc(p['area'])}</span>
    <h1>{esc(p['name'])}</h1>
    <span class="price">฿{baht(p['lo'])} – {baht(p['hi'])} <small data-th="/ เดือน · 1–3 ห้องนอน">/ month · 1–3 bedrooms</small></span>
    <p class="desc" data-th="{esc(p['desc_th'])}">{esc(p['desc'])}</p>
    <div class="facts"><span><b data-th="ระยะเช่า">Lease</b><span data-th="{esc(p['lease_th'])}">{esc(p['lease'])}</span></span><span><b data-th="เหมาะกับ">Best for</b><span data-th="{esc(p['best_th'])}">{esc(p['best'])}</span></span></div>
  </div>
</div>

<section id="units">
  <div class="wrap">
    <div class="bar-head">
      <div><h2 data-th="ห้องว่างให้เช่า">Units for rent</h2><p data-th="กดนัดดูห้อง ระบบจะเตรียมข้อความใน WhatsApp ให้">Tap Book viewing and your WhatsApp message is ready.</p></div>
      {sample}
    </div>
    <div class="filters" role="group" aria-label="Bedrooms">
      <button type="button" class="on" data-b="all"><span data-th="ทั้งหมด" style="opacity:1;margin:0">All</span><span>{len(units)}</span></button>
      <button type="button" data-b="1"><span data-th="1 ห้องนอน" style="opacity:1;margin:0">1 bedroom</span><span>{counts[1]}</span></button>
      <button type="button" data-b="2"><span data-th="2 ห้องนอน" style="opacity:1;margin:0">2 bedrooms</span><span>{counts[2]}</span></button>
      <button type="button" data-b="3"><span data-th="3 ห้องนอน" style="opacity:1;margin:0">3 bedrooms</span><span>{counts[3]}</span></button>
    </div>
    <div class="units">
{chr(10).join(unit_card(p, u, i) for i, u in enumerate(units))}
    </div>
    <p class="empty" id="empty" hidden data-th="ยังไม่มีห้องแบบนี้ ทักมาทาง WhatsApp เราจะหาให้">No units of this size right now. Message us on WhatsApp and we'll find one.</p>
  </div>
</section>

<section style="padding-top:0">
  <div class="wrap" style="display:grid;gap:14px">
    <h2 style="font-size:clamp(26px,3.4vw,34px)" data-th="เหมาะกับคนที่">Great for</h2>
    <div class="great">
{great}
    </div>
  </div>
</section>

<section style="padding-top:0">
  <div class="wrap" style="display:grid;gap:14px">
    <div class="steps-head">
      <h2 style="font-size:clamp(26px,3.4vw,34px)" data-th="เช่าง่ายใน 4 ขั้นตอน">Rent in four steps</h2>
      <p data-th="ใช้เวลาแค่ 1 นาทีสำหรับขั้นตอนแรก ที่เหลือเราดูแลให้">Step 1 takes a minute. We handle the rest.</p>
    </div>
    <ol class="steps">
      <li class="now"><span class="n">1</span><div><small data-th="ขั้นตอนที่ 1 · ตอนนี้">Step 1 · Now</small><b data-th="เลือกห้องแล้วกดนัดดู">Pick a unit and tap Book viewing</b><span data-th="ข้อความ WhatsApp ถูกเตรียมไว้ให้แล้ว แค่กดส่ง">Your WhatsApp message is ready. Just send it.</span></div></li>
      <li><span class="n">2</span><div><small data-th="ขั้นตอนที่ 2 · ภายในวันทำการ">Step 2 · Same business day</small><b data-th="แอดมินโทรหรือแชตกลับ">Our admin gets back to you</b><span data-th="ส่งห้องว่าง รูป และราคาล่าสุดให้">With available units, photos and rates.</span></div></li>
      <li><span class="n">3</span><div><small data-th="ขั้นตอนที่ 3 · วันที่คุณสะดวก">Step 3 · A day that suits you</small><b data-th="ดูห้องจริงหรือวิดีโอคอล">View the unit</b><span data-th="ไปดูที่ห้อง หรือดูผ่านวิดีโอคอลก็ได้">In person or by video call.</span></div></li>
      <li><span class="n">4</span><div><small data-th="ขั้นตอนที่ 4 · ย้ายเข้า">Step 4 · Move in</small><b data-th="เซ็นสัญญา รับกุญแจ">Sign the lease, get the keys</b><span data-th="เราเตรียมสัญญาและส่งมอบห้องให้">We prepare the agreement and hand over the unit.</span></div></li>
    </ol>
    <div class="steps-cta">
      <a class="btn wa ask-all" href="https://wa.me/{PHONE}" target="_blank" rel="noopener">{WA_ICON}<span data-th="เริ่มขั้นตอนที่ 1 · นัดดูห้องทาง WhatsApp">Start step 1 · Book on WhatsApp</span></a>
      <a class="btn line" href="#units" data-th="ดูห้องว่างก่อน">See units first</a>
    </div>
  </div>
</section>

{nest_block()}

<section>
  <div class="wrap" style="display:grid;gap:14px">
    <h2 style="font-size:clamp(26px,3.4vw,34px)" data-th="คอนโดอื่นที่น่าสนใจ">Other condos</h2>
    <div class="others">
{others}
    </div>
    <div class="share"><b data-th="ลิงก์โฆษณาหน้านี้:">Ad link for this page:</b><button type="button" data-ch="facebook">Facebook</button><button type="button" data-ch="instagram">Instagram</button><button type="button" data-ch="whatsapp">WhatsApp</button><button type="button" data-ch="tiktok">TikTok</button><button type="button" data-ch="youtube">YouTube</button></div>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <small data-th="นำเสนอโดย">Presented by</small>
    <img src="../assets/logo.png" alt="MGROUP Estates" width="157" height="20">
    <p>M GROUP BUSINESS CO.,LTD · 63/202 Thepkasattri Rd, Kohkaew, Muang, Phuket 83000<br><a href="https://wa.me/{PHONE}" target="_blank" rel="noopener" data-th="แชตกับเราทาง WhatsApp" data-ru="Написать нам в WhatsApp">Chat with us on WhatsApp</a> · contact@mgroupestates.com</p>
  </div>
</footer>

<div class="sticky"><a class="btn gold" href="#units" data-th="ดูห้องว่าง">See units</a><a class="btn wa ask-all" href="https://wa.me/{PHONE}" target="_blank" rel="noopener">WhatsApp</a></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="sticky"><a class="btn gold" href="#list" data-th="ลงประกาศห้อง" data-ru="Разместить">List my condominium</a><a class="btn wa est" href="https://wa.me/{PHONE}" target="_blank" rel="noopener" data-th="ประเมินฟรี" data-ru="Оценка">Free estimate</a></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>{js}</script>
</body>
</html>
"""


OWNER_CSS = r"""
label{display:grid;gap:6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--mid);font-weight:600}
input,select,textarea{font:400 15px var(--body);color:var(--ink);padding:12px 14px;border:1px solid var(--line);background:var(--page);border-radius:10px;width:100%;letter-spacing:0;text-transform:none;min-width:0;appearance:none;-webkit-appearance:none}
select{background-image:linear-gradient(45deg,transparent 50%,var(--stone) 50%),linear-gradient(135deg,var(--stone) 50%,transparent 50%);background-position:calc(100% - 18px) 52%,calc(100% - 13px) 52%;background-size:5px 5px;background-repeat:no-repeat;padding-right:34px}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 22%,transparent)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start}
@media(max-width:860px){.grid2{grid-template-columns:1fr;gap:30px}}
.grid2>*{min-width:0}
ol.flow{list-style:none;display:grid;gap:0}
ol.flow li{display:grid;grid-template-columns:44px 1fr;gap:16px;padding-bottom:26px;position:relative}
ol.flow li:not(:last-child)::before{content:"";position:absolute;left:21px;top:44px;bottom:0;width:1px;background:var(--line)}
ol.flow .n{font-variant-numeric:lining-nums;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:600 18px var(--display);border:1px solid var(--accent);color:var(--accent);background:var(--paper)}
ol.flow li:first-child .n{background:var(--accent);color:var(--accent-ink)}
ol.flow h3{font-size:23px;margin-top:6px}
ol.flow p{color:var(--mid);font-size:15px;margin-top:4px}
ol.flow .when{display:inline-block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--stone);font-weight:600;margin-top:6px}
form.card{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:24px;display:grid;gap:14px;box-shadow:var(--shadow)}
form.card h3{font-size:28px;scroll-margin-top:100px}
form.card .sub{color:var(--mid);font-size:14px;margin-top:-6px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:440px){.two{grid-template-columns:1fr}}
.note{font-size:12.5px;color:var(--mid)}
.why{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.why div{padding:18px;border:1px solid var(--line);border-radius:14px;background:var(--paper)}
.why h3{font-size:21px;margin-bottom:4px}
.why p{font-size:14px;color:var(--mid)}
@media(max-width:520px){.why{grid-template-columns:1fr}}
.brand.keep{display:block!important}
ol.flow .n{font-family:var(--body)!important;font-size:16px!important}
.page-hero{color:#fffaf2;background:linear-gradient(180deg,rgba(20,15,10,.45),rgba(20,15,10,.55) 50%,rgba(20,15,10,.85)),url("../assets/rent/hero.jpg") center/cover no-repeat,#2a2119}
.page-hero .wrap{padding-block:clamp(120px,20vw,200px) 40px;display:grid;gap:12px}
.page-hero .area{font-size:11.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:#e8d3a8}
.page-hero h1{font-size:clamp(38px,6vw,64px);max-width:16ch}
.page-hero p{max-width:52ch;color:rgba(255,250,242,.86)}
"""

OWNER_BODY = """<div class="grid2">
      <div>
        <h3 style="font-size:clamp(28px,3.4vw,38px);margin-bottom:16px" data-th="ทำไมต้องลงประกาศกับเรา" data-ru="Почему стоит сдавать квартиру с нами">Why list your condominium with us</h3>
        <div class="why">
          <div><h3 data-th="โฆษณาให้ฟรี" data-ru="Рекламу оплачиваем мы">We pay for the ads</h3><p data-th="ห้องของคุณได้ลงโฆษณาบน Facebook, Instagram, TikTok, YouTube และ WhatsApp" data-ru="Ваша квартира рекламируется в Facebook, Instagram, TikTok, YouTube и WhatsApp.">Your unit is advertised on Facebook, Instagram, TikTok, YouTube and WhatsApp.</p></div>
          <div><h3 data-th="ผู้เช่าที่ผ่านการคัดกรอง" data-ru="Проверенные арендаторы">Screened tenants</h3><p data-th="เราตรวจสอบผู้เช่าก่อนส่งให้คุณพิจารณา" data-ru="Мы проверяем каждого арендатора, прежде чем представить его вам.">We check every tenant before we bring them to you.</p></div>
          <div><h3 data-th="ทีมพูด 3 ภาษา" data-ru="Три языка">Three languages</h3><p data-th="ดูแลผู้เช่าไทย อังกฤษ และรัสเซีย" data-ru="Работаем с арендаторами на тайском, английском и русском.">We handle Thai, English and Russian-speaking tenants.</p></div>
          <div><h3 data-th="ดูแลจบในที่เดียว" data-ru="Одна команда от начала до конца">One team, start to finish</h3><p data-th="ตั้งแต่ถ่ายรูป นัดดูห้อง ทำสัญญา จนส่งมอบกุญแจ" data-ru="Фото, показы, договор и передача ключей.">Photos, viewings, the lease and the key handover.</p></div>
          <div><h3 data-th="ลูกค้าจากเครือข่ายสากล" data-ru="Международная сеть клиентов">Global buyer network</h3><p data-th="ในเครือ List Sotheby's International Realty Thailand" data-ru="Партнёр List Sotheby&#x27;s International Realty Thailand.">Affiliated with List Sotheby's International Realty Thailand.</p></div>
          <div><h3 data-th="ไม่มีค่าใช้จ่ายล่วงหน้า" data-ru="Без предоплаты">Nothing to pay upfront</h3><p data-th="เราได้รับค่าคอมมิชชั่นเมื่อปล่อยเช่าสำเร็จเท่านั้น" data-ru="Комиссию мы получаем, только когда квартира сдана.">We earn our commission only when your unit is rented.</p></div>
        </div>
        <ol class="flow" id="how-owner" style="margin-top:30px">
          <li><span class="n">1</span><div><h3 data-th="ส่งรายละเอียดห้อง" data-ru="Пришлите данные квартиры">Send your unit details</h3><p data-th="โครงการ เลขห้อง ขนาด และค่าเช่าที่ต้องการ" data-ru="Кондо, номер квартиры, площадь и желаемая цена.">Condominium, unit number, size and your target rent.</p></div></li>
          <li><span class="n">2</span><div><h3 data-th="เราจัดทำประกาศ" data-ru="Мы готовим объявление">We prepare the listing</h3><p data-th="ถ่ายรูป เขียนรายละเอียด และตั้งราคาร่วมกับคุณ" data-ru="Фото, описание и цена — по согласованию с вами.">Photos, description and pricing, agreed with you.</p></div></li>
          <li><span class="n">3</span><div><h3 data-th="โปรโมตและพาผู้เช่าดูห้อง" data-ru="Продвигаем и показываем">We promote and show it</h3><p data-th="ยิงโฆษณา ตอบผู้สนใจ และนัดดูห้องแทนคุณ" data-ru="Запускаем рекламу, отвечаем на заявки и проводим показы.">We run the ads, answer enquiries and arrange viewings.</p></div></li>
          <li><span class="n">4</span><div><h3 data-th="ทำสัญญาและรับค่าเช่า" data-ru="Договор подписан, аренда оплачена">Lease signed, rent paid</h3><p data-th="เราจัดทำสัญญาเช่าและส่งมอบห้องให้ผู้เช่า" data-ru="Готовим договор и передаём квартиру арендатору.">We prepare the agreement and hand over to the tenant.</p></div></li>
        </ol>
      </div>
      <form class="card" id="ownerForm" autocomplete="on" style="scroll-margin-top:24px"><span id="list"></span>
        <h3 data-th="ลงประกาศห้องของคุณ" data-ru="Сдать квартиру">List your condominium</h3>
        <p class="sub" data-th="ส่งรายละเอียด ทีมงานติดต่อกลับภายในวันทำการ" data-ru="Пришлите данные — ответим в тот же рабочий день.">Send the details and we get back to you the same business day.</p>
        <label for="o-name"><span data-th="ชื่อเจ้าของ" data-ru="Имя владельца">Owner name</span><input id="o-name" type="text" autocomplete="name"></label>
        <label for="o-condo"><span data-th="โครงการ" data-ru="Кондо">Condominium</span>
          <select id="o-condo" class="condo-select">{options}<option value="" data-th="โครงการอื่น" data-ru="Другое кондо">Other condominium</option></select></label>
        <div class="two">
          <label for="o-unit"><span data-th="เลขห้อง / ขนาด" data-ru="№ квартиры / площадь">Unit no. / size</span><input id="o-unit" type="text" placeholder="A-305 · 45 sqm"></label>
          <label for="o-bed"><span data-th="ห้องนอน" data-ru="Спальни">Bedrooms</span>
            <select id="o-bed"><option value="Studio">Studio</option><option value="1 bed" selected>1</option><option value="2 bed">2</option><option value="3+ bed">3+</option></select></label>
        </div>
        <div class="two">
          <label for="o-rent"><span data-th="ค่าเช่าที่ต้องการ (บาท/เดือน)" data-ru="Желаемая цена (бат/мес.)">Target rent (THB/mo)</span><input id="o-rent" type="text" inputmode="numeric"></label>
          <label for="o-from"><span data-th="ว่างตั้งแต่" data-ru="Свободна с">Available from</span><input id="o-from" type="date"></label>
        </div>
        <a class="btn gold" id="ownerSend" href="https://wa.me/{PHONE}" target="_blank" rel="noopener" data-th="ส่งรายละเอียดทาง WhatsApp" data-ru="Отправить в WhatsApp">Send on WhatsApp</a>
        <p class="note" data-th="ไม่มีค่าใช้จ่ายจนกว่าจะปล่อยเช่าได้" data-ru="Никаких платежей, пока квартира не сдана.">No fee until your unit is rented.</p>
      </form>
    </div>"""


OWNER_FAQ = [
    ("How much does it cost to list my condominium?", "ลงประกาศปล่อยเช่ามีค่าใช้จ่ายเท่าไร", "Сколько стоит разместить квартиру?",
     "Nothing upfront. We earn a commission only when your unit is rented, and we confirm the rate with you in writing before we start.",
     "ไม่มีค่าใช้จ่ายล่วงหน้า เราได้รับค่าคอมมิชชั่นเมื่อปล่อยเช่าได้เท่านั้น และแจ้งอัตราเป็นลายลักษณ์อักษรก่อนเริ่มงาน",
     "Ничего заранее. Комиссию мы получаем только после сдачи квартиры, ставку подтверждаем письменно до начала работы."),
    ("Do I need to be in Phuket?", "ต้องอยู่ภูเก็ตไหม", "Нужно ли быть на Пхукете?",
     "No. Many owners live abroad. We handle the photos, viewings, lease and keys, and keep you updated on WhatsApp.",
     "ไม่จำเป็น เจ้าของหลายคนอยู่ต่างประเทศ เราดูแลถ่ายรูป พาดูห้อง ทำสัญญา และส่งมอบกุญแจ พร้อมอัปเดตทาง WhatsApp",
     "Нет. Многие владельцы живут за границей. Мы занимаемся фото, показами, договором и ключами и держим вас в курсе в WhatsApp."),
    ("Which condominiums do you rent out?", "รับปล่อยเช่าคอนโดโครงการไหนบ้าง", "Какие кондо вы сдаёте?",
     "{names}, and other condominiums in Bang Tao, Cherng Talay and Laguna, Phuket.",
     "{names} และคอนโดอื่นในบางเทา เชิงทะเล และลากูน่า ภูเก็ต",
     "{names}, а также другие кондо в Банг Тао, Ченг Талае и Лагуне на Пхукете."),
    ("How do you find tenants?", "หาผู้เช่าอย่างไร", "Как вы находите арендаторов?",
     "We advertise on Facebook, Instagram, TikTok, YouTube and WhatsApp, reaching Thai, English and Russian-speaking renters. Every tenant is screened before we bring them to you.",
     "เรายิงโฆษณาบน Facebook, Instagram, TikTok, YouTube และ WhatsApp เข้าถึงผู้เช่าไทย อังกฤษ และรัสเซีย และคัดกรองผู้เช่าทุกคนก่อนส่งให้คุณ",
     "Мы даём рекламу в Facebook, Instagram, TikTok, YouTube и WhatsApp для арендаторов, говорящих на тайском, английском и русском. Каждого арендатора проверяем до знакомства с вами."),
    ("Who sets the rent?", "ใครเป็นคนกำหนดค่าเช่า", "Кто устанавливает цену?",
     "You do. We suggest a price based on similar units and the season, and you decide.",
     "คุณเป็นผู้กำหนด เราแนะนำราคาจากห้องใกล้เคียงและฤดูกาล แล้วคุณตัดสินใจ",
     "Вы. Мы предлагаем цену на основе похожих квартир и сезона, решение за вами."),
    ("What do my tenants get?", "ผู้เช่าของฉันจะได้อะไร", "Что получают мои арендаторы?",
     "Every MGROUP Estates tenant can use Nest+ concierge: move-in help, internet and utilities, cleaning, car or scooter rental, airport transfers and repairs. It makes your unit easier to rent.",
     "ผู้เช่าของ MGROUP Estates ทุกคนใช้บริการ Nest+ concierge ได้ ทั้งช่วยย้ายเข้า น้ำไฟอินเทอร์เน็ต แม่บ้าน เช่ารถ รับส่งสนามบิน และแจ้งซ่อม ทำให้ห้องของคุณปล่อยเช่าได้ง่ายขึ้น",
     "Каждый арендатор MGROUP Estates пользуется Nest+ concierge: помощь с заездом, интернет и коммуналка, уборка, аренда машины или байка, трансфер и ремонт. Так вашу квартиру проще сдать."),
]

OWNER_EXTRA_CSS = """
.page-hero .cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.page-hero .cta .btn.line{color:#fffaf2;border-color:rgba(255,250,242,.6)}
.page-hero .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.page-hero .chips span{font-size:12.5px;padding:6px 12px;border-radius:999px;background:rgba(255,250,242,.12);border:1px solid rgba(255,250,242,.3);backdrop-filter:blur(4px)}
.answer{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:start;padding:24px;border:1px solid var(--line);border-radius:18px;background:var(--paper)}
.answer h2{font-size:clamp(26px,3.4vw,34px);margin-bottom:8px}
.answer p{color:var(--mid)}
.answer dl{display:grid;grid-template-columns:auto 1fr;gap:10px 16px;font-size:14px}
.answer dt{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--stone);font-weight:600;padding-top:2px}
.answer dd{color:var(--ink)}
@media(max-width:760px){.answer{grid-template-columns:1fr;gap:18px}}
.condos{display:flex;flex-wrap:wrap;gap:8px}
.condos a{font-size:13.5px;padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--ink);text-decoration:none}
.condos a:hover{border-color:var(--accent);color:var(--accent)}
details.q{border-bottom:1px solid var(--line)}
details.q summary{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;cursor:pointer;list-style:none}
details.q summary::-webkit-details-marker{display:none}
details.q h3{font:500 clamp(16.5px,2vw,19px)/1.4 var(--body)}
details.q p{padding:0 0 18px;color:var(--mid);max-width:68ch;font-size:15px}
details.q .chev{width:34px;height:34px;flex:none;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:transform .25s}
details.q .chev svg{width:14px;height:14px}
details.q[open] .chev{transform:rotate(180deg);background:var(--ink);color:var(--page)}
.h2s{font-size:clamp(26px,3.4vw,34px);margin-bottom:14px}
"""


def owners_page():
    page_url = f"{SITE}/rent/owners"
    options = "".join(f"<option>{esc(p['name'])}</option>" for p in PROJECTS)
    body = OWNER_BODY.format(options=options, PHONE=PHONE)
    title = "Rent Out Your Condominium in Phuket | MGROUP Estates for Owners"
    desc = ("Rent out your condominium in Bang Tao, Cherng Talay or Laguna, Phuket. MGROUP Estates advertises it, screens tenants, "
            "arranges viewings and prepares the lease. Nothing to pay upfront.")
    names = ", ".join(p["name"] for p in PROJECTS)
    faq = [(q, qt, qr, a.format(names=names), at.format(names=names), ar.format(names=names)) for q, qt, qr, a, at, ar in OWNER_FAQ]
    steps = [("Send your unit details", "Condominium, unit number, size and your target rent."),
             ("We prepare the listing", "Photos, description and pricing, agreed with you."),
             ("We promote and show it", "We run the ads, answer enquiries and arrange viewings."),
             ("Lease signed, rent paid", "We prepare the agreement and hand over to the tenant.")]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Service", "@id": page_url + "#service", "name": "Condominium rental management for owners in Phuket",
         "serviceType": "Residential rental listing and tenant placement", "url": page_url, "description": desc,
         "provider": {"@type": "RealEstateAgent", "name": "MGROUP Estates", "url": SITE, "logo": SITE + "/assets/logo.png", "email": "contact@mgroupestates.com",
                      "sameAs": ["https://www.instagram.com/mgroupestates", "https://www.tiktok.com/@mgroupestates", "https://www.youtube.com/@mgroupestates"]},
         "areaServed": [{"@type": "Place", "name": n} for n in ("Bang Tao, Phuket", "Cherng Talay, Phuket", "Laguna Phuket")],
         "audience": {"@type": "Audience", "audienceType": "Condominium owners"},
         "availableLanguage": ["th", "en", "ru"]},
        {"@type": "HowTo", "name": "How to rent out your condominium in Phuket with MGROUP Estates",
         "step": [{"@type": "HowToStep", "position": i + 1, "name": a, "text": b} for i, (a, b) in enumerate(steps)]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, qt, qr, a, at, ar in faq]},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Condominiums for rent", "item": SITE + "/rent-condo"},
            {"@type": "ListItem", "position": 3, "name": "For owners", "item": page_url}]}]}
    chev = '<span class="chev" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 5l5 5 5-5"/></svg></span>'
    faq_html = "\n".join(
        f'    <details class="q"><summary><h3 data-th="{esc(qt)}" data-ru="{esc(qr)}">{esc(q)}</h3>{chev}</summary><p data-th="{esc(at)}" data-ru="{esc(ar)}">{esc(a)}</p></details>'
        for q, qt, qr, a, at, ar in faq)
    condos = "".join(f'<a href="{p["slug"]}.html">{esc(p["name"])}</a>' for p in PROJECTS)
    js = r"""
(function(){
  var PHONE="%PHONE%", lang="en", src="";
  var $=function(s){return document.querySelector(s)}, $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  try{var qs=new URLSearchParams(location.search);src=qs.get("utm_source")||"";if(/^(th|ru)$/.test(qs.get("lang")||""))lang=qs.get("lang")}catch(e){}
  function v(id){return $(id).value.trim()}
  function msg(){
    var th=lang==="th",L=[];
    L.push(th?"สวัสดีค่ะ ต้องการลงประกาศปล่อยเช่าคอนโดค่ะ":"Hello, I'd like to list my condominium for rent with MGROUP Estates.");
    if(v("#o-name"))L.push((th?"ชื่อ: ":"Name: ")+v("#o-name"));
    L.push((th?"โครงการ: ":"Condominium: ")+(v("#o-condo")||(th?"โครงการอื่น":"Other")));
    if(v("#o-unit"))L.push((th?"ห้อง/ขนาด: ":"Unit/size: ")+v("#o-unit"));
    L.push((th?"ห้องนอน: ":"Bedrooms: ")+v("#o-bed"));
    if(v("#o-rent"))L.push((th?"ค่าเช่าที่ต้องการ/เดือน: ":"Target rent/month: ")+v("#o-rent")+" THB");
    if(v("#o-from"))L.push((th?"ว่างตั้งแต่: ":"Available from: ")+v("#o-from"));
    if(src)L.push("Source: "+src);
    return L.join("\n");
  }
  function wa(t){return "https://wa.me/"+PHONE+"?text="+encodeURIComponent(t+(src&&t.indexOf("Source:")<0?"\nSource: "+src:""))}
  function build(){
    $("#ownerSend").href=wa(msg());
    var th=lang==="th";
    $$(".est").forEach(function(a){a.href=wa(th?"สวัสดีค่ะ อยากให้ช่วยประเมินค่าเช่าคอนโดของฉันค่ะ":"Hello, I'd like a free rent estimate for my condominium.")});
  }
  var tt;function toast(t){var e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){e.classList.remove("show")},2200)}
  $$(".share button").forEach(function(b){b.addEventListener("click",function(){
    var u="%PAGE%?utm_source="+b.dataset.ch+"&utm_medium=paid_social&utm_campaign=owner-listing";
    try{navigator.clipboard.writeText(u).then(function(){toast(b.textContent+" ad link copied")},function(){toast(u)})}catch(e){toast(u)}
  })});
  $$("#ownerForm input,#ownerForm select").forEach(function(el){el.addEventListener("input",build);el.addEventListener("change",build)});
  var tr=$$("[data-th]");tr.forEach(function(el){el.setAttribute("data-en",el.textContent)});
  function setLang(l){
    lang=l;document.documentElement.lang=l;
    tr.forEach(function(el){el.textContent=el.getAttribute("data-"+l)||el.getAttribute("data-en")});
    $$(".lang button").forEach(function(b){b.classList.toggle("on",b.dataset.lang===l)});
    $("#o-name").placeholder=l==="th"?"ชื่อของคุณ":l==="ru"?"Ваше имя":"Your name";
    build();try{localStorage.setItem("mg-lang",l)}catch(e){}
  }
  $$(".lang button").forEach(function(b){b.addEventListener("click",function(){setLang(b.dataset.lang)})});
  if(lang==="en"){try{var sl=localStorage.getItem("mg-lang");if(sl==="th"||sl==="ru")lang=sl}catch(e){}}
  setLang(lang);
})();
""".replace("%PHONE%", PHONE).replace("%PAGE%", page_url)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="{esc(desc)}">
<meta name="keywords" content="rent out condo Phuket, list my condo for rent Phuket, condo rental management Phuket, Bang Tao condo owner, Cherng Talay condo owner, Laguna condo rental, ปล่อยเช่าคอนโด ภูเก็ต, ฝากเช่าคอนโด ภูเก็ต, сдать квартиру Пхукет">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="{page_url}">
<link rel="alternate" hreflang="en" href="{page_url}">
<link rel="alternate" hreflang="th" href="{page_url}?lang=th">
<link rel="alternate" hreflang="ru" href="{page_url}?lang=ru">
<link rel="alternate" hreflang="x-default" href="{page_url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MGROUP Estates">
<meta property="og:title" content="Rent out your Phuket condominium. We find the tenant.">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{page_url}">
<meta property="og:image" content="{SITE}/assets/rent/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Rent out your Phuket condominium. We find the tenant.">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{SITE}/assets/rent/hero.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Figtree:wght@300;400;500;600&family=Noto+Sans+Thai:wght@300;400;500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{CSS}{MENU_CSS}{OWNER_CSS}{OWNER_EXTRA_CSS}</style>
</head>
<body>
<header class="top over">
  <div class="wrap">
    <a class="brand keep" href="../rent-condo.html" aria-label="MGROUP Estates"><img src="../assets/logo.png" alt="MGROUP Estates" width="126" height="16"></a>
    <div class="hdr-r"><div class="lang" role="group" aria-label="Language"><button type="button" data-lang="en" class="on">EN</button><button type="button" data-lang="ru">RU</button><button type="button" data-lang="th">TH</button></div>{MENU_BTN}</div>
  </div>
</header>
{menu_block("../rent-condo.html", "../assets/logo.png", "owners.html").replace('href="#nest"', 'href="../rent-condo.html#nest"')}

<main>
<div class="page-hero">
  <div class="wrap">
    <span class="area" data-th="สำหรับเจ้าของคอนโดในภูเก็ต" data-ru="Для владельцев кондо на Пхукете">For condominium owners in Phuket</span>
    <h1 data-th="ปล่อยเช่าคอนโดของคุณ เราหาผู้เช่าให้" data-ru="Сдайте свою квартиру. Арендатора найдём мы.">Rent out your condominium. We find the tenant.</h1>
    <p data-th="เรายิงโฆษณาบน Facebook, Instagram, TikTok, YouTube และ WhatsApp คัดกรองผู้เช่า พาดูห้อง และทำสัญญาให้ครบ" data-ru="Мы рекламируем квартиру в Facebook, Instagram, TikTok, YouTube и WhatsApp, проверяем арендаторов, проводим показы и готовим договор.">We advertise your unit on Facebook, Instagram, TikTok, YouTube and WhatsApp, screen tenants, show the unit and prepare the lease.</p>
    <div class="cta"><a class="btn gold" href="#list" data-th="ลงประกาศห้องของฉัน" data-ru="Разместить квартиру">List my condominium</a><a class="btn line est" href="https://wa.me/{PHONE}" target="_blank" rel="noopener" data-th="ขอประเมินค่าเช่าฟรี" data-ru="Бесплатная оценка аренды">Free rent estimate</a></div>
    <div class="chips"><span data-th="ไม่มีค่าใช้จ่ายล่วงหน้า" data-ru="Без предоплаты">No upfront fee</span><span data-th="คัดกรองผู้เช่า" data-ru="Проверенные арендаторы">Screened tenants</span><span>TH · EN · RU</span><span data-th="เจ้าของอยู่ต่างประเทศได้" data-ru="Подходит владельцам за границей">Owners abroad welcome</span></div>
  </div>
</div>

<section>
  <div class="wrap" style="display:grid;gap:40px">
    <div class="answer">
      <div>
        <h2 data-th="สรุปสั้นๆ" data-ru="Коротко">In short</h2>
        <p data-th="MGROUP Estates ช่วยเจ้าของคอนโดในบางเทา เชิงทะเล และลากูน่า ภูเก็ต ปล่อยเช่าห้อง เราทำประกาศ ยิงโฆษณา คัดกรองผู้เช่า พาดูห้อง และทำสัญญาเช่า ไม่มีค่าใช้จ่ายล่วงหน้า เราได้รับค่าคอมมิชชั่นเมื่อปล่อยเช่าได้เท่านั้น" data-ru="MGROUP Estates помогает владельцам кондо в Банг Тао, Ченг Талае и Лагуне на Пхукете сдавать квартиры. Мы готовим объявление, даём рекламу, проверяем арендаторов, проводим показы и оформляем договор. Без предоплаты: комиссия только после сдачи.">MGROUP Estates helps condominium owners in Bang Tao, Cherng Talay and Laguna, Phuket rent out their units. We prepare the listing, run the ads, screen tenants, arrange viewings and prepare the lease. There is nothing to pay upfront; we earn a commission only when your unit is rented.</p>
      </div>
      <dl>
        <dt data-th="พื้นที่" data-ru="Районы">Areas</dt><dd data-th="บางเทา · เชิงทะเล · ลากูน่า" data-ru="Банг Тао · Ченг Талай · Лагуна">Bang Tao · Cherng Talay · Laguna</dd>
        <dt data-th="ค่าบริการ" data-ru="Стоимость">Fees</dt><dd data-th="ไม่มีล่วงหน้า · คอมมิชชั่นเมื่อปล่อยเช่าได้" data-ru="Без предоплаты · комиссия после сдачи">None upfront · commission when rented</dd>
        <dt data-th="ช่องทาง" data-ru="Каналы">Channels</dt><dd>Facebook · Instagram · TikTok · YouTube · WhatsApp</dd>
        <dt data-th="ภาษา" data-ru="Языки">Languages</dt><dd data-th="ไทย · อังกฤษ · รัสเซีย" data-ru="тайский · английский · русский">Thai · English · Russian</dd>
        <dt data-th="ตอบกลับ" data-ru="Ответ">Reply</dt><dd data-th="ภายในวันทำการ" data-ru="В тот же рабочий день">Same business day</dd>
      </dl>
    </div>

{body}

    <div>
      <h2 class="h2s" data-th="คอนโดที่เรารับปล่อยเช่า" data-ru="Кондо, которые мы сдаём">Condominiums we rent out</h2>
      <div class="condos">{condos}</div>
    </div>

    <div style="max-width:860px">
      <h2 class="h2s" data-th="คำถามจากเจ้าของห้อง" data-ru="Вопросы владельцев">Questions owners ask</h2>
{faq_html}
    </div>

    <div class="share"><b data-th="ลิงก์โฆษณาหน้านี้:" data-ru="Рекламная ссылка:">Ad link for this page:</b><button type="button" data-ch="facebook">Facebook</button><button type="button" data-ch="instagram">Instagram</button><button type="button" data-ch="whatsapp">WhatsApp</button><button type="button" data-ch="tiktok">TikTok</button><button type="button" data-ch="youtube">YouTube</button></div>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <small data-th="นำเสนอโดย">Presented by</small>
    <img src="../assets/logo.png" alt="MGROUP Estates" width="157" height="20">
    <p>M GROUP BUSINESS CO.,LTD · 63/202 Thepkasattri Rd, Kohkaew, Muang, Phuket 83000<br><a href="https://wa.me/{PHONE}" target="_blank" rel="noopener" data-th="แชตกับเราทาง WhatsApp" data-ru="Написать нам в WhatsApp">Chat with us on WhatsApp</a> · contact@mgroupestates.com</p>
  </div>
</footer>
<script>{js}</script>
</body>
</html>
"""


RU = json.load(open(os.path.join(ROOT, "rent", "i18n-ru.json"), encoding="utf-8"))
RU_PATTERNS = [(r"^(\d+) sqm$", r"\1 м²"), (r"^(\d+) bath$", r"\1 ванн."), (r"^Floor (\d+)$", r"Этаж \1")]


def ru_for(en):
    if en in RU:
        return RU[en]
    for pat, rep in RU_PATTERNS:
        if re.match(pat, en):
            return re.sub(pat, rep, en)
    return None


def add_ru(path):
    """Give every element that has a Thai translation a Russian one too (data-ru)."""
    s = open(path, encoding="utf-8").read()
    missing = []

    def tag(m):
        if "data-ru=" in m.group(0):
            return m.group(0)
        en = html.unescape(re.sub(r"<[^>]+>", "", m.group(5))).strip()
        ru = ru_for(en)
        if ru is None:
            missing.append(en)
            return m.group(0)
        return f'<{m.group(1)}{m.group(2)} data-th="{m.group(3)}" data-ru="{esc(ru)}"{m.group(4)}>{m.group(5)}</{m.group(1)}>'

    s = re.sub(r'<(\w+)([^>]*?) data-th="([^"]*)"([^>]*)>(.*?)</\1>', tag, s, flags=re.S)
    open(path, "w", encoding="utf-8").write(s)
    return missing


WORD = re.compile(r"\b([Cc])ondo(s?)\b")


def full_word(text):
    """English copy says "condominium", never "condo"."""
    return WORD.sub(lambda m: m.group(1) + "ondominium" + m.group(2), text)


def use_full_word(path):
    s = open(path, encoding="utf-8").read()
    out = []
    # leave CSS alone; in scripts only touch quoted text that reads as a sentence or label
    for part in re.split(r"(<script[^>]*>.*?</script>|<style>.*?</style>)", s, flags=re.S):
        if part.startswith("<style>"):
            out.append(part)
        elif part.startswith("<script"):
            out.append(re.sub(r'"([^"\n]*)"', lambda m: '"' + (full_word(m.group(1)) if (" " in m.group(1) or ":" in m.group(1)) and "http" not in m.group(1) and "/" not in m.group(1) and "#" not in m.group(1) else m.group(1)) + '"', part))
        else:
            part = re.sub(r">([^<]+)<", lambda m: ">" + full_word(m.group(1)) + "<", part)
            part = re.sub(r'\b(content|alt|aria-label|title)="([^"]*)"', lambda m: f'{m.group(1)}="{m.group(2) if m.group(2).startswith("http") else full_word(m.group(2))}"', part)
            out.append(part)
    open(path, "w", encoding="utf-8").write("".join(out))


def update_index_files():
    sm = os.path.join(ROOT, "sitemap.xml")
    s = open(sm, encoding="utf-8").read()
    for p in PROJECTS + [dict(slug="owners")]:
        loc = f"{SITE}/rent/{p['slug']}"
        if loc not in s:
            s = s.replace("</urlset>", f"  <url><loc>{loc}</loc><lastmod>2026-11-03</lastmod><priority>0.8</priority></url>\n</urlset>")
    open(sm, "w", encoding="utf-8").write(s)
    lt = os.path.join(ROOT, "llms.txt")
    s = open(lt, encoding="utf-8").read()
    for line in (f"- [Condominiums for rent in Bang Tao & Cherng Talay]({SITE}/rent-condo)",
                 f"- [Rent out your condominium in Phuket (for owners)]({SITE}/rent/owners)"):
        if line.split("](")[1] not in s:
            s = s.replace("## Pages\n\n", "## Pages\n\n" + line + "\n", 1)
    s = re.sub(r"## Condos for rent \(\d+\)\n\n.*?\n\n(?=## Notes)", "", s, flags=re.S)
    if True:
        lines = "\n".join(f"- [{p['name']}]({SITE}/rent/{p['slug']}): Condominium for rent, {p['area']}, Phuket, 1–3 bedrooms, ฿{baht(p['lo'])}–{baht(p['hi'])} per month"
                          for p in PROJECTS)
        s = s.replace("## Notes", f"## Condos for rent ({len(PROJECTS)})\n\n{lines}\n\n## Notes")
    open(lt, "w", encoding="utf-8").write(s)


ORDER = ["angsana-oceanview", "standard-residence-bangtao", "the-aqua", "the-space", "the-base", "canvas-sansiri", "sky-park"]
PROJECTS.sort(key=lambda p: ORDER.index(p["slug"]))


if __name__ == "__main__":
    os.makedirs(os.path.join(ROOT, "rent"), exist_ok=True)
    for p in PROJECTS:
        open(os.path.join(ROOT, "rent", p["slug"] + ".html"), "w", encoding="utf-8").write(project_page(p))
    open(os.path.join(ROOT, "rent", "owners.html"), "w", encoding="utf-8").write(owners_page())
    update_main()
    update_index_files()
    missing = []
    for f in ["rent-condo.html", os.path.join("rent", "owners.html")] + [os.path.join("rent", p["slug"] + ".html") for p in PROJECTS]:
        missing += add_ru(os.path.join(ROOT, f))
    if missing:
        print("no Russian for:", sorted(set(missing)))
    for f in ["rent-condo.html", os.path.join("rent", "owners.html")] + [os.path.join("rent", p["slug"] + ".html") for p in PROJECTS]:
        use_full_word(os.path.join(ROOT, f))
    print("built", len(PROJECTS), "condo pages")
