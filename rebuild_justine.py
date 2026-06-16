#!/usr/bin/env python3
"""
justine.pptx — Brutalist Swiss Editorial.
Pitch-black bg · Syne headlines · Space Grotesk body · JetBrains Mono meta
10% electric acid-lime accent · structural metadata markers · image proof placeholders
"""
import zipfile
from xml.sax.saxutils import escape

OUTPUT = "/home/nami/Downloads/justine.pptx"
SLIDES = 17

# ── Palette ──
BLACK = "000000"
WHITE = "FFFFFF"
LIME  = "39FF14"
GRAY  = "94A3B8"
GRAY2 = "475569"

CX = 800000
CW = 10592000
META_Y = 180000
TITLE_Y = 950000

FADE    = '<p:transition><p:fade dur="500"/></p:transition>'
SPLIT_V = '<p:transition><p:split orient="horz" dir="out" dur="500"/></p:transition>'


def tx_body(paras, sz=1800, color=WHITE, font="Space Grotesk"):
    out = []
    for para in paras:
        runs = ""
        for r in para if isinstance(para, list) else [para]:
            if isinstance(r, tuple):
                t = r[0]
                b = r[1] if len(r) > 1 else False
                s = r[2] if len(r) > 2 else sz
                c = r[3] if len(r) > 3 else color
                f = r[4] if len(r) > 4 else font
            else:
                t, b, s, c, f = r, False, sz, color, font
            if not t: continue
            runs += (f'<a:r><a:rPr sz="{s}" b="{1 if b else 0}" color="{c}"'
                     f'><a:latin typeface="{f}"/><a:ea typeface="{f}"/>'
                     f'<a:cs typeface="{f}"/></a:rPr><a:t>{escape(t)}</a:t></a:r>')
        if not runs:
            runs = '<a:r><a:rPr sz="100" color="FFFFFF"><a:latin typeface="Space Grotesk"/></a:rPr><a:t> </a:t></a:r>'
        out.append(f"<a:p>{runs}</a:p>")
    return f"<a:txBody><a:bodyPr/>{''.join(out)}</a:txBody>"


def sp(text_paras, x, y, w, h, fill=None, prst="rect"):
    fx = f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>' if fill else ''
    tx = ""
    if text_paras:
        wp = [[p] if isinstance(p, tuple) else p for p in text_paras]
        tx = tx_body(wp, 1500, WHITE)
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="0" name="S"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="{prst}"><a:avLst/></a:prstGeom>{fx}</p:spPr>
  {tx}
</p:sp>'''


def mk_slide(els, trans=FADE):
    inner = "\n".join(e for e in els if e)
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
{trans}
  <p:csldBg><a:solidFill><a:srgbClr val="000000"/></a:solidFill></p:csldBg>
  <p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr/>
{inner}
  </p:spTree>
</p:sld>'''


# ── Reusable elements ──

def meta(n, label="SYSTEM"):
    return sp([(f"[ {label} / SLIDE {n:02d} ]", False, 900, GRAY2, "JetBrains Mono")], CX, META_Y, CW, 220000)

def lime_bar(x, y, w, h=3000):
    return sp(None, x, y, w, h, fill=LIME)

def short_lime(y, x=CX):
    return lime_bar(x, y, CW // 5)

def full_line(y, x=CX):
    return lime_bar(x, y, CW)

def h1(text, y, sz=5200):
    return sp([(text, True, sz, WHITE, "Syne")], CX, y, CW, sz * 180)

def h2(text, y, sz=3600):
    return sp([(text, True, sz, WHITE, "Syne")], CX, y, CW, sz * 170)

def h3(text, y, sz=2200):
    return sp([(text, True, sz, WHITE, "Syne")], CX, y, CW, sz * 160)

def body(text, y, sz=1700, col=WHITE):
    return sp([(text, False, sz, col, "Space Grotesk")], CX, y, CW, sz * 150)

def body_muted(text, y, sz=1500):
    return sp([(text, False, sz, GRAY, "Space Grotesk")], CX, y, CW, sz * 140)

def mono(text, y, sz=1400, col=LIME):
    return sp([(text, False, sz, col, "JetBrains Mono")], CX, y, CW, sz * 130)


# ── Image placeholder ──

def img_placeholder(x, y, w, h, label="PROOF / SCREENSHOT"):
    """Brutalist image placeholder — lime border, mono label."""
    placeholder = sp(None, x, y, w, h, fill="0A0A0A")
    return placeholder


def image_proof(x, y, w, h, label="PROOF"):
    """Lime-bordered placeholder box with label and crosshair."""
    # Border — 4 thin rectangles forming a box
    border = 2500
    top    = sp(None, x, y, w, border, fill=LIME)
    bottom = sp(None, x, y + h - border, w, border, fill=LIME)
    left   = sp(None, x, y, border, h, fill=LIME)
    right  = sp(None, x + w - border, y, border, h, fill=LIME)
    # Corner accents
    corner_sz = min(w, h) // 6
    tl = sp(None, x, y, corner_sz, corner_sz, fill=LIME)
    tr = sp(None, x + w - corner_sz, y, corner_sz, corner_sz, fill=LIME)
    bl = sp(None, x, y + h - corner_sz, corner_sz, corner_sz, fill=LIME)
    br = sp(None, x + w - corner_sz, y + h - corner_sz, corner_sz, corner_sz, fill=LIME)
    # Crosshair center
    ch_sz = min(w, h) // 10
    ch_x = x + w // 2
    ch_y = y + h // 2
    h_line = sp(None, ch_x - ch_sz, ch_y - border // 2, ch_sz * 2, border, fill=LIME)
    v_line = sp(None, ch_x - border // 2, ch_y - ch_sz, border, ch_sz * 2, fill=LIME)
    # Label
    label_el = sp([
        (f"[ {label} ]", False, 1600, LIME, "JetBrains Mono")
    ], x + corner_sz // 2, y + h // 2 + 100000, w - corner_sz, 300000)
    # Sub-label
    sub = sp([
        ("1280 × 720  |  16:9", False, 1000, GRAY2, "JetBrains Mono")
    ], x + corner_sz // 2, y + h // 2 - 120000, w - corner_sz, 250000)

    return [top, bottom, left, right, tl, tr, bl, br, h_line, v_line, label_el, sub]


# ── Slide builders ──

def tslide(n, title, subtitle, lines):
    return mk_slide([
        meta(n, "TITLE"),
        short_lime(1450000),
        h1(title, 1800000, 5000),
        full_line(3600000),
        body(subtitle, 3900000, 2200),
        *[body_muted(l, 4600000 + i*340000) for i, l in enumerate(lines)],
    ])


def sslide(n, num, title, subtitle=""):
    els = [
        meta(n, "SECTION"),
        h1(num, 1300000, 7000),
        full_line(2600000, CX + 800000),
        h2(title, 2900000, 4000),
    ]
    if subtitle:
        els.append(body_muted(subtitle, 3800000, 2000))
    return mk_slide(els, SPLIT_V)


def bslide(n, title, sections):
    els = [
        meta(n),
        h2(title, TITLE_Y),
        short_lime(TITLE_Y + 600000),
    ]
    y = TITLE_Y + 900000
    for hdr, items in sections:
        if y > 6000000: break
        els.append(sp(None, CX, y + 50000, 6000, 220000, fill=LIME))
        els.append(h3(hdr, y))
        y += 420000
        for t, _ in items:
            if y > 6300000: break
            els.append(sp(None, CX + 60000, y + 85000, 5000, 5000, fill=LIME))
            els.append(body(t, y, 1600))
            y += 320000
        y += 60000
    return mk_slide(els)


def bslide_proof(n, title, sections, proof_label="SCREENSHOT"):
    """Bullet slide with an image placeholder on the right side."""
    els = [
        meta(n),
        h2(title, TITLE_Y),
        short_lime(TITLE_Y + 600000),
    ]
    # Narrower content to make room for placeholder
    content_w = CW * 55 // 100
    y = TITLE_Y + 900000
    for hdr, items in sections:
        if y > 5600000: break
        els.append(sp(None, CX, y + 50000, 6000, 220000, fill=LIME))
        els.append(h3(hdr, y))
        y += 420000
        for t, _ in items:
            if y > 5900000: break
            els.append(sp(None, CX + 60000, y + 85000, 5000, 5000, fill=LIME))
            els.append(sp([(t, False, 1500, WHITE, "Space Grotesk")], CX + 90000, y, content_w - 90000, 280000))
            y += 300000
        y += 40000
    # Image placeholder on the right
    px = CX + content_w + 120000
    pw = CW - content_w - 160000
    py = TITLE_Y + 200000
    ph = 4400000
    els += image_proof(px, py, pw, ph, proof_label)
    return mk_slide(els)


def tslide_table(n, title, headers, rows):
    cw = str(int(CW) // len(headers))
    grid = "".join(f"<a:gridCol w=\"{cw}\"/>" for _ in headers)

    def cell(t, b=False, sz=1300, fc=WHITE, fill=None):
        fx = (f'<a:tcPr l="91440" r="91440" t="20000" b="20000">'
              f'{"<a:solidFill><a:srgbClr val=\"" + fill + "\"/></a:solidFill>" if fill else ""}</a:tcPr>')
        tx = tx_body([[(t, b, sz, fc, "Space Grotesk")]])
        return f"<a:tc>{fx}{tx}</a:tc>"

    hdr_cells = "".join(cell(h, True, 1500, LIME) for h in headers)
    hdr = f"<a:tr h=\"360000\">{hdr_cells}</a:tr>"
    body_rows = ""
    for i, r in enumerate(rows):
        rf = "0D0D0D" if i % 2 == 0 else ""
        body_rows += "<a:tr h=\"280000\">" + "".join(cell(c, fill=rf) for c in r) + "</a:tr>"

    ty = TITLE_Y + 800000
    tbl_h = 6858000 - ty - 150000
    tbl = f'''<p:graphicFrame>
  <p:nvGraphicFramePr><p:cNvPr id="99" name="T"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr>
  <p:xfrm><a:off x="{CX}" y="{ty}"/><a:ext cx="{CW}" cy="{tbl_h}"/></p:xfrm>
  <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
    <a:tbl>
      <a:tblPr>
        <a:lnT><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnT>
        <a:lnB><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnB>
        <a:lnL><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnL>
        <a:lnR><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnR>
      </a:tblPr>
      <a:tblGrid>{grid}</a:tblGrid>{hdr}{body_rows}</a:tbl>
  </a:graphicData></a:graphic>
</p:graphicFrame>'''

    return mk_slide([
        meta(n),
        h2(title, TITLE_Y),
        short_lime(TITLE_Y + 600000),
        tbl,
    ])


def tslide_table_proof(n, title, headers, rows, proof_label="SCREENSHOT"):
    """Table slide with image placeholder beside the table."""
    # Narrow table to make room
    tbl_w = CW * 55 // 100
    cw = str(int(tbl_w) // len(headers))
    grid = "".join(f"<a:gridCol w=\"{cw}\"/>" for _ in headers)

    def cell(t, b=False, sz=1300, fc=WHITE, fill=None):
        fx = (f'<a:tcPr l="68580" r="68580" t="16000" b="16000">'
              f'{"<a:solidFill><a:srgbClr val=\"" + fill + "\"/></a:solidFill>" if fill else ""}</a:tcPr>')
        tx = tx_body([[(t, b, sz, fc, "Space Grotesk")]])
        return f"<a:tc>{fx}{tx}</a:tc>"

    hdr_cells = "".join(cell(h, True, 1400, LIME) for h in headers)
    hdr = f"<a:tr h=\"320000\">{hdr_cells}</a:tr>"
    body_rows = ""
    for i, r in enumerate(rows):
        rf = "0D0D0D" if i % 2 == 0 else ""
        body_rows += "<a:tr h=\"260000\">" + "".join(cell(c, fill=rf) for c in r) + "</a:tr>"

    ty = TITLE_Y + 800000
    tbl_h = 6858000 - ty - 150000
    tbl = f'''<p:graphicFrame>
  <p:nvGraphicFramePr><p:cNvPr id="99" name="T"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr>
  <p:xfrm><a:off x="{CX}" y="{ty}"/><a:ext cx="{tbl_w}" cy="{tbl_h}"/></p:xfrm>
  <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
    <a:tbl>
      <a:tblPr>
        <a:lnT><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnT>
        <a:lnB><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnB>
        <a:lnL><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnL>
        <a:lnR><a:solidFill><a:srgbClr val="1A1A1A"/></a:solidFill></a:lnR>
      </a:tblPr>
      <a:tblGrid>{grid}</a:tblGrid>{hdr}{body_rows}</a:tbl>
  </a:graphicData></a:graphic>
</p:graphicFrame>'''

    # Placeholder beside table
    px = CX + tbl_w + 100000
    pw = CW - tbl_w - 140000
    py = TITLE_Y + 200000
    ph = 4600000

    return mk_slide([
        meta(n),
        h2(title, TITLE_Y),
        short_lime(TITLE_Y + 600000),
        tbl,
    ] + image_proof(px, py, pw, ph, proof_label))


def eslide(n, title, subtitle=""):
    """End slide — large thank you / closing."""
    els = [
        meta(n, "END"),
        h1(title, 2200000, 5200),
        full_line(3800000),
        body_muted(subtitle, 4100000, 2200) if subtitle else "",
    ]
    return mk_slide(els)


# ═══════════════════════════════════════════
#  17 slides
# ═══════════════════════════════════════════

slides = [

# 1 ── Title ──
tslide(1, "Blockchain-Based Electronic\nHealth Record System",
    "A Decentralized EHR Prototype for Small Clinics",
    [
        "Tambong, J.  ·  Somontina, R.  ·  Balon, E.  ·  Agustin, V.  ·  Fernandez, R.",
        "Jesus Reigns Christian College  ·  La Consolacion University Philippines",
        "Stellar Soroban  ·  IPFS  ·  React  ·  Node.js  ·  PostgreSQL",
    ]),

# 2 ── Section: Chapter 1 ──
sslide(2, "01", "Chapter 1", "Background of the Study"),

# 3 ── Background + proof placeholder ──
bslide(3, "Background of the Study", [
    ("Current State at Herbosa Metro Doctors (Tondo, Manila)", [
        ("General paper templates — no standardized recording system", WHITE),
        ("Patient records inconsistent and difficult to retrieve", WHITE),
        ("Privacy compliance challenge under RA 10173 (Data Privacy Act)", WHITE),
    ]),
    ("Limitations of Traditional Systems", [
        ("Paper-based: disorganized, easily lost, no access tracking", WHITE),
        ("Centralized databases: single point of failure, breach-vulnerable", WHITE),
        ("Lack of interoperability causes medical errors and duplicate testing", WHITE),
    ]),
    ("Why Blockchain", [
        ("Decentralization eliminates single point of failure", WHITE),
        ("Immutability ensures tamper-proof records", WHITE),
        ("Patient-controlled access with transparent audit trails", WHITE),
    ]),
]),

# 4 ── Problem ──
bslide(4, "Statement of the Problem", [
    ("Main Problem", [
        ("Small clinics lack a secure, organized EHR system", WHITE),
    ]),
    ("Specific Problem 1: No Standardized System", [
        ("Depends on general paper templates for recording patient info", WHITE),
        ("Hard to maintain consistent, organized, retrievable records", GRAY),
    ]),
    ("Specific Problem 2: Inefficient Access and Sharing", [
        ("No integrated system for sharing records among personnel", WHITE),
        ("Delays and difficulty coordinating patient information", GRAY),
    ]),
    ("Specific Problem 3: No Access Control", [
        ("Cannot track or limit who views a patient's file", WHITE),
        ("Personal health information privacy is at risk", WHITE),
    ]),
]),

# 5 ── Objectives ──
bslide(5, "Objectives of the Study", [
    ("Main Objective", [
        ("Design and develop a blockchain-based EHR system for secure,", WHITE),
        ("accessible, and manageable patient health information.", WHITE),
    ]),
    ("Specific Objective 1: Secure Storage", [
        ("Blockchain immutability + AES-256 encryption + decentralized storage", WHITE),
    ]),
    ("Specific Objective 2: Efficient Access", [
        ("Digital platform for timely retrieval and seamless data exchange", WHITE),
    ]),
    ("Specific Objective 3: Access Control", [
        ("Authentication · Permission control · Immutable audit trail", WHITE),
    ]),
]),

# 6 ── Scope ──
tslide_table(6, "Scope, Limitations and Significance",
    ["Category", "Details"],
    [
        ["Scope", "Clinic prototype using simulated patient data (RA 10173)"],
        ["Scope", "Blockchain storage, secure sharing, dashboard, health tracker"],
        ["Limitation", "No live clinic deployment or external platform integration"],
        ["Limitation", "AI classifies records only — no medical diagnosis"],
        ["Significance: Institutions", "Secure unified platform, reduced admin delays"],
        ["Significance: Professionals", "Accurate records support faster diagnosis"],
        ["Significance: Patients", "Data protection, transparency, consent control"],
        ["Significance: Researchers", "Foundation for future blockchain healthcare"],
    ]),

# 7 ── Section: Chapter 3 ──
sslide(7, "02", "Chapter 3", "Research Methodology"),

# 8 ── Sprints ──
tslide_table(8, "Sprint-to-Phase Mapping",
    ["Sprint", "Weeks", "IDD Phase", "Deliverables"],
    [
        ["Sprint 1", "1-2",   "Requirements", "Interviews, dataset, feature list"],
        ["Sprint 2", "3-4",   "Analysis",     "Feasibility, risk, Stellar Soroban"],
        ["Sprint 3", "5-6",   "Design",       "Architecture, DB schema, wireframes"],
        ["Sprint 4", "7-8",   "Backend",      "Node.js/Express API, AES/SHA-256"],
        ["Sprint 5", "9-10",  "Contracts",    "Solidity, Stellar testnet, React UI"],
        ["Sprint 6", "11-12", "Testing",      "171 test cases across all modules"],
    ]),

# 9 ── Architecture with idea sketch placeholder ──
bslide(9, "System Architecture", [
    ("Hybrid Approach", [
        ("Encrypted records in PostgreSQL + hashes on Stellar Soroban", WHITE),
        ("IPFS for decentralized storage of large medical documents", WHITE),
    ]),
    ("Five System Modules", [
        ("1. Data Acquisition — Patient and provider portals", WHITE),
        ("2. Decentralized Storage — IPFS + encrypted database", WHITE),
        ("3. Blockchain and Smart Contracts — Access control + immutability", WHITE),
        ("4. Monitoring and Verification — React/Tailwind dashboard", WHITE),
        ("5. System Administration — User roles, node monitoring, DID", WHITE),
    ]),
    ("Smart Contracts (Stellar Soroban)", [
        ("Record Registry — Stores record hashes and metadata", WHITE),
        ("Access Manager — Enforces permission-based rules", WHITE),
        ("Audit Trail — Immutable logging of all access events", WHITE),
    ]),
]),

# 10 ── Tech Stack ──
tslide_table(10, "Technology Stack",
    ["Layer", "Technologies"],
    [
        ["Blockchain",    "Stellar Soroban"],
        ["Smart Contracts","Solidity · Remix IDE · Hardhat"],
        ["Backend",       "Node.js · Express · Web3.js · Ethers.js"],
        ["Database",      "PostgreSQL 15 · IPFS"],
        ["Frontend",      "React · Tailwind CSS · Chart.js"],
        ["Encryption",    "AES-256-GCM (field) · SHA-256 (hashing)"],
        ["Tools",         "Stellar Horizon API · Git · GitHub · Postman"],
    ]),

# 11 ── Section: Chapter 4 ──
sslide(11, "03", "Chapter 4", "Interpretation of Results"),

# 12 ── Auth Results + proof placeholder ──
tslide_table_proof(12, "Authentication and Access Control Results",
    ["Test Category", "Result", "Details"],
    [
        ["Login (4 roles)",       "PASS", "Admin, doctor, nurse, patient — HTTP 200"],
        ["Wrong password",        "PASS", "HTTP 401 returned correctly"],
        ["Unauthenticated access", "PASS", "HTTP 401 on protected endpoints"],
        ["Rate limiting",          "PASS", "HTTP 429 after 5 rapid attempts"],
        ["RBAC (12 endpoint tests)","12/12 PASS", "100% pass rate, avg 193 ms"],
        ["Privilege escalation",   "PASS", "Patient tokens receive HTTP 403"],
    ], "API TEST SCREENSHOT"),

# 13 ── Medical Records + proof placeholder ──
tslide_table_proof(13, "Patient Management and Medical Records",
    ["Operation", "Records", "Performance"],
    [
        ["Bulk patient creation", "100",  "100% success · avg 55 ms"],
        ["Bulk retrieval",        "227",  "164 ms total response time"],
        ["SOAP record creation",  "50",   "100% success · avg 81 ms"],
        ["Tamper detection",      "SHA-256", "Hash mismatch detected immediately"],
        ["Field encryption",      "AES-256-GCM", "+97 to 127 byte overhead"],
        ["Audit log query",       "402 entries", "61 ms response time"],
    ], "DASHBOARD UI"),

# 14 ── Security + proof placeholder ──
tslide_table_proof(14, "Security and Blockchain Results",
    ["Category", "Status", "Details"],
    [
        ["Brute-force prevention", "PASS", "429 triggered after 5 attempts"],
        ["Unauthenticated access", "PASS", "All protected endpoints secured"],
        ["Privilege escalation",   "PASS", "Patient vs staff scope enforced"],
        ["Tamper detection",       "PASS", "SHA-256 avalanche confirmed"],
        ["Field encryption",       "PASS", "AES-256-GCM verified in DB"],
        ["Blockchain anchoring",   "PASS", "27 on-chain transactions"],
        ["Smart contract deploy",  "PASS", "3 contracts on Stellar testnet"],
        ["Horizon API verify",     "PASS", "All transactions confirmed"],
    ], "BLOCKCHAIN EXPLORER"),

# 15 ── Section: Chapter 5 ──
sslide(15, "04", "Chapter 5", "Conclusions and Recommendations"),

# 16 ── Conclusions ──
bslide(16, "Conclusions and Recommendations", [
    ("Objective 1: Secure Storage — Achieved", [
        ("Multi-layered: encrypted PostgreSQL + IPFS + smart contracts", WHITE),
        ("Cryptographic hashing guarantees tamper-evident record storage", WHITE),
    ]),
    ("Objective 2: Efficient Access — Achieved", [
        ("React/Tailwind dashboard with Web3-enabled API", WHITE),
        ("Real-time blockchain queries via cryptographic hashes", WHITE),
    ]),
    ("Objective 3: Access Control — Achieved", [
        ("Smart contracts enforce permission rules automatically", WHITE),
        ("Every interaction logged as immutable blockchain transaction", WHITE),
    ]),
    ("Recommendations", [
        ("1. Live clinic deployment with NPC compliance validation", WHITE),
        ("2. Integrate HL7 FHIR for cross-institution interoperability", WHITE),
        ("3. Formal penetration testing and production key management", WHITE),
        ("4. Cursor pagination and increase blockchain anchoring ratio", WHITE),
    ]),
]),

# 17 ── End slide ──
eslide(17, "Thank You",
    "Questions and discussion — tambongjustine@gmail.com"),

]

# ═══════════════════════════════════════════
#  OOXML build
# ═══════════════════════════════════════════

CT = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
"""
CT += "\n".join(f'<Override PartName="/ppt/slides/slide{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>' for i in range(1, SLIDES+1))
CT += "\n</Types>"

PR = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>"""

SR = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>"""

def mk_pr(c):
    i = ''.join(f'  <Relationship Id="rId{j+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{j+1}.xml"/>\n' for j in range(c))
    return f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>\n{i}</Relationships>'

PX = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>{"".join(f'<p:sldId id="{256+i}" r:id="rId{i+2}"/>' for i in range(SLIDES))}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="12192000"/>
</p:presentation>'''

TX = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Brutal">
  <a:themeElements>
    <a:clrScheme name="Brutal">
      <a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="111111"/></a:dk2><a:lt2><a:srgbClr val="F8FAFC"/></a:lt2>
      <a:accent1><a:srgbClr val="39FF14"/></a:accent1>
      <a:accent2><a:srgbClr val="94A3B8"/></a:accent2>
      <a:accent3><a:srgbClr val="FFFFFF"/></a:accent3>
      <a:accent4><a:srgbClr val="FFFFFF"/></a:accent4>
      <a:accent5><a:srgbClr val="FFFFFF"/></a:accent5>
      <a:accent6><a:srgbClr val="475569"/></a:accent6>
    </a:clrScheme>
    <a:fontScheme name="Brutal">
      <a:majorFont><a:latin typeface="Syne"/><a:ea typeface="Syne"/><a:cs typeface="Syne"/></a:majorFont>
      <a:minorFont><a:latin typeface="Space Grotesk"/><a:ea typeface="Space Grotesk"/><a:cs typeface="Space Grotesk"/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Default">
      <a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"/></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"/></a:gs></a:gsLst></a:gradFill><a:noFill/></a:fillStyleLst>
      <a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"/></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"/></a:gs></a:gsLst></a:gradFill><a:noFill/></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>'''

SL = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank">
  <p:csldBg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:csldBg>
  <p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree>
</p:sldLayout>'''

SM = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:csldBg/><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>'''

CX_PROPS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/">
  <dc:title>Blockchain-Based Electronic Health Record System</dc:title>
  <dc:creator>Tambong, Somontina, Balon, Agustin, Fernandez</dc:creator>
  <dcterms:created>2026-06-16T00:00:00Z</dcterms:created>
</cp:coreProperties>'''

APP = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>BMAD / Claude Code</Application>
  <Slides>17</Slides>
</Properties>'''

with zipfile.ZipFile(OUTPUT, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml", CT)
    z.writestr("_rels/.rels", PR)
    z.writestr("docProps/core.xml", CX_PROPS)
    z.writestr("docProps/app.xml", APP)
    z.writestr("ppt/presentation.xml", PX)
    z.writestr("ppt/_rels/presentation.xml.rels", mk_pr(SLIDES))
    z.writestr("ppt/theme/theme1.xml", TX)
    z.writestr("ppt/slideMasters/slideMaster1.xml", SM)
    z.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels",
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>\n</Relationships>')
    z.writestr("ppt/slideLayouts/slideLayout1.xml", SL)
    z.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels",
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>\n</Relationships>')
    for i, s in enumerate(slides, 1):
        z.writestr(f"ppt/slides/slide{i}.xml", s)
        z.writestr(f"ppt/slides/_rels/slide{i}.xml.rels", SR)

print(f"Created: {OUTPUT}  ({SLIDES} slides)")
