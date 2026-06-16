#!/usr/bin/env python3
"""
Blockchain EHR — v2 Corporate Swiss
Obsidian Slate · Helvetica all-caps · silver borders · profile cards · image placeholder frames
"""
import zipfile
from xml.sax.saxutils import escape

OUTPUT = "/home/nami/Downloads/Blockchain EHR Brutalist Presentation.pptx"
SLIDES = 17

# ── Palette ──
BG    = "111625"   # Obsidian Slate Grey
WHITE = "FFFFFF"
BODY  = "A0A5B5"   # Muted Silver-grey
SLATE = "4E5D78"   # System label grey (Consolas indicators)
BORD  = "2A3040"   # Subtle border
DBORD = "1A2030"   # Darker border for tables
CARD  = "0D1525"   # Card fill

CX = 800000
CW = 10592000
CY = 6858000

TITLE_Y = 850000
META_Y  = 150000

FADE    = '<p:transition><p:fade dur="400"/></p:transition>'
SPLIT_V = '<p:transition><p:split orient="horz" dir="out" dur="400"/></p:transition>'


def tx_body(paras, sz=1400, color=BODY, font="Arial", ln_spc=None, char_spc=None):
    out = []
    for para in paras:
        # Paragraph properties: line spacing
        ppr = ""
        if ln_spc is not None:
            ppr += f'<a:lnSpc><a:spcPct val="{ln_spc}"/></a:lnSpc>'
        if ppr:
            ppr = f"<a:pPr>{ppr}</a:pPr>"
        # Build runs
        runs = ""
        for r in para if isinstance(para, list) else [para]:
            if isinstance(r, tuple):
                t = r[0]
                b = r[1] if len(r) > 1 else False
                s = r[2] if len(r) > 2 else sz
                c = r[3] if len(r) > 3 else color
                f = r[4] if len(r) > 4 else font
                cs = r[5] if len(r) > 5 else char_spc
            else:
                t, b, s, c, f, cs = r, False, sz, color, font, char_spc
            if not t: continue
            spc_attr = f' spc="{cs}"' if cs is not None else ''
            runs += (f'<a:r><a:rPr sz="{s}" b="{1 if b else 0}" color="{c}"{spc_attr}'
                     f'><a:latin typeface="{f}"/><a:ea typeface="{f}"/>'
                     f'<a:cs typeface="{f}"/></a:rPr><a:t>{escape(t)}</a:t></a:r>')
        if not runs:
            runs = '<a:r><a:rPr sz="100" color="FFFFFF"><a:latin typeface="Arial"/></a:rPr><a:t> </a:t></a:r>'
        out.append(f"<a:p>{ppr}{runs}</a:p>")
    return f"<a:txBody><a:bodyPr/>{''.join(out)}</a:txBody>"


def sp(text_paras, x, y, w, h, fill=None, prst="rect", ln=None,
       sz=1400, color=BODY, font="Arial", ln_spc=None, char_spc=None):
    fx = f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>' if fill else ''
    lx = ''
    if ln:
        lx = f'<a:ln w="{ln[0]}"><a:solidFill><a:srgbClr val="{ln[1]}"/></a:solidFill></a:ln>'
    tx = ''
    if text_paras:
        wp = [[p] if isinstance(p, tuple) else p for p in text_paras]
        tx = tx_body(wp, sz, color, font, ln_spc, char_spc)
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="0" name="S"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
  <p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm><a:prstGeom prst="{prst}"><a:avLst/></a:prstGeom>{fx}{lx}</p:spPr>
  {tx}
</p:sp>'''


def mk_slide(els, trans=FADE):
    inner = "\n".join(e for e in els if e)
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
{trans}
  <p:csldBg><a:solidFill><a:srgbClr val="{BG}"/></a:solidFill></p:csldBg>
  <p:spTree>
    <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
    <p:grpSpPr/>
{inner}
  </p:spTree>
</p:sld>'''


# ── Reusable elements ──

def meta_line(n, label="EHR"):
    return sp([(f"{label}  |  SLIDE {n:02d}", False, 1100, SLATE, "Consolas", None, 400)],
              CX, META_Y, CW, 180000)

def thin_line(y, col=BORD, w=CW):
    return sp(None, CX, y, w, 1200, fill=col)

def slide_title(text, y=TITLE_Y, sz=3600):
    """Arial Black · ALL CAPS · Tight spacing · 0.9 line height."""
    return sp([(text.upper(), True, sz, WHITE, "Arial Black")],
              CX, y, CW, sz * 150, ln_spc=90000, char_spc=-500)

def section_header(text, y, sz=2400):
    """Trebuchet MS Bold · ALL CAPS · Section/subtitle headers."""
    return sp([(text.upper(), True, sz, WHITE, "Trebuchet MS")],
              CX + 25000, y, CW - 25000, 350000)


# ── Profile card (title slide) ──

def profile_card(x, y, w, h, label="[ NAME PLACEHOLDER ]"):
    els = []
    # Card background with thin border
    els.append(sp(None, x, y, w, h, fill=CARD, ln=(1200, BORD)))
    # Circle (user avatar placeholder)
    cx_c = x + w // 2
    cy_c = y + h * 30 // 100
    r = min(w, h) // 6
    circle_r = r
    els.append(sp(None, cx_c - circle_r, cy_c - circle_r, circle_r*2, circle_r*2,
                  prst="ellipse", ln=(1000, BODY)))
    # Head hint inside circle
    head_r = circle_r // 3
    els.append(sp(None, cx_c - head_r, cy_c - circle_r + circle_r//3, head_r*2, head_r*2,
                  prst="ellipse", fill=BODY))
    # Label — Arial Bold 12pt ALL CAPS White
    els.append(sp([(label, True, 1200, WHITE, "Arial")],
                  x + 20000, cy_c + circle_r + 60000, w - 40000, 250000))
    return els


# ── Image placeholder ──

def img_placeholder(x, y, w, h, label="TECHNICAL DIAGRAM / RESULTS CHART PLACEHOLDER"):
    els = []
    # Background
    els.append(sp(None, x, y, w, h, fill=CARD, ln=(1200, BORD)))
    # Corner L-accents
    ca = min(w, h) // 15
    for (ox, oy) in [(0,0), (w-ca*3,0), (0, h-ca*3), (w-ca*3, h-ca*3)]:
        els.append(sp(None, x+ox, y+oy, ca*3 if ox==0 else ca*3, 1200, fill=BODY))
        els.append(sp(None, x+ox, y+oy, 1200, ca*3 if oy==0 else ca*3, fill=BODY))

    # Icon — abstract chart/mini bars
    icon_cx = x + w // 2
    icon_cy = y + h * 35 // 100
    icon_sz = min(w, h) // 10
    rx = icon_cx - icon_sz
    ry = icon_cy - icon_sz // 2
    els.append(sp(None, rx, ry, icon_sz*2, icon_sz, ln=(800, BODY)))
    bar_w = icon_sz // 3
    for bi in range(3):
        bh = icon_sz // 3 + bi * (icon_sz // 6)
        els.append(sp(None, rx + icon_sz//3 + bi*icon_sz*2//3 - bar_w//2,
                       icon_cy + icon_sz//2 - bh, bar_w, bh, fill=BODY))

    # Label — Arial 13pt · silver-grey · sentence case
    els.append(sp([(f"[ {label} ]", False, 1300, BODY, "Arial")],
                  x + 20000, icon_cy + icon_sz + 80000, w - 40000, 250000))
    els.append(sp([("1280 × 720  |  16:9", False, 1000, BODY, "Arial")],
                  x + 20000, icon_cy + icon_sz + 180000, w - 40000, 200000))
    return els


# ── Slide builders ──

def tslide(n, title, subtitle, team_labels):
    els = [
        meta_line(n, "TITLE"),
        thin_line(1800000),
    ]
    # Title — Arial Black · ALL CAPS · Tight spacing · 0.9 line height
    for i, ln in enumerate(title.split("\n")):
        els.append(sp([(ln.upper(), True, 4000 - i*200, WHITE, "Arial Black")],
                      CX, 2200000 + i*800000, CW, 700000, ln_spc=90000, char_spc=-500))
    # Subtitle — Arial 16pt · silver-grey · sentence case
    els.append(sp([(subtitle, False, 1600, BODY, "Arial")], CX, 3800000, CW, 350000))
    # 3 profile cards
    card_w = 2900000; card_h = 1400000; gap = 240000
    total_w = 3*card_w + 2*gap
    start_x = CX + (CW - total_w)//2
    card_y = 4900000
    for i, label in enumerate(team_labels[:3]):
        els += profile_card(start_x + i*(card_w+gap), card_y, card_w, card_h, label)
    els.append(sp([("Jesus Reigns Christian College  ·  La Consolacion University Philippines",
                   False, 1200, BODY, "Arial")],
                  CX, card_y + card_h + 150000, CW, 200000))
    return mk_slide(els)


def sslide(n, num, title, subtitle=""):
    els = [
        meta_line(n, "SECTION"),
        thin_line(1200000),
        # Number — Arial Black · ALL CAPS · Tight spacing
        sp([(f"0{num}" if num < 10 else str(num), True, 5600, WHITE, "Arial Black")],
           CX, 1500000, CW, 800000, char_spc=-500),
        # Chapter title — Trebuchet MS Bold · ALL CAPS · 24pt
        sp([(title.upper(), True, 2400, WHITE, "Trebuchet MS")],
           CX, 2600000, CW, 600000),
    ]
    if subtitle:
        els.append(sp([(subtitle, False, 1600, BODY, "Arial")], CX, 3500000, CW, 400000))
    return mk_slide(els, SPLIT_V)


def bslide(n, title, sections):
    els = [meta_line(n), slide_title(title), thin_line(TITLE_Y + 600000)]
    y = TITLE_Y + 850000
    for hdr, items in sections:
        if y > 6000000: break
        els.append(sp(None, CX, y+30000, 4000, 200000, fill=BODY))
        els.append(section_header(hdr, y))
        y += 420000
        for t, _ in items:
            if y > 6300000: break
            els.append(sp(None, CX+30000, y+80000, 4000, 4000, fill=BODY))
            els.append(sp([(t, False, 1400, BODY, "Arial")],
                          CX+50000, y, CW-50000, 260000, ln_spc=115000))
            y += 300000
        y += 50000
    return mk_slide(els)


def bslide_proof(n, title, sections, proof_label="TECHNICAL DIAGRAM"):
    els = [meta_line(n), slide_title(title), thin_line(TITLE_Y + 600000)]
    content_w = CW * 50 // 100
    y = TITLE_Y + 850000
    for hdr, items in sections:
        if y > 5500000: break
        els.append(sp(None, CX, y+30000, 4000, 200000, fill=BODY))
        els.append(sp([(hdr.upper(), True, 1800, WHITE, "Trebuchet MS")],
                      CX+25000, y, content_w-25000, 320000))
        y += 380000
        for t, _ in items:
            if y > 5800000: break
            els.append(sp(None, CX+30000, y+70000, 4000, 4000, fill=BODY))
            els.append(sp([(t, False, 1400, BODY, "Arial")],
                          CX+55000, y, content_w-55000, 240000, ln_spc=115000))
            y += 280000
        y += 40000
    px = CX + content_w + 100000
    els += img_placeholder(px, TITLE_Y+150000, CW - content_w - 140000, 5200000, proof_label)
    return mk_slide(els)


def tslide_table(n, title, headers, rows):
    cw = str(int(CW) // len(headers))
    grid = "".join(f'<a:gridCol w="{cw}"/>' for _ in headers)
    def cell(t, b=False, sz=1300, fc=BODY, fill=None):
        fx = (f'<a:tcPr l="68580" r="68580" t="16000" b="16000">'
              f'{"<a:solidFill><a:srgbClr val=\"" + fill + "\"/></a:solidFill>" if fill else ""}</a:tcPr>')
        tx = tx_body([[(t, b, sz, fc, "Arial")]])
        return f"<a:tc>{fx}{tx}</a:tc>"

    hdr_cells = "".join(cell(h, True, 1400, WHITE) for h in headers)
    body_rows = ""
    for i, r in enumerate(rows):
        rf = "0A1220" if i % 2 == 0 else ""
        body_rows += "<a:tr h=\"260000\">" + "".join(cell(c, fill=rf) for c in r) + "</a:tr>"

    ty = TITLE_Y + 750000
    tbl = f'''<p:graphicFrame>
  <p:nvGraphicFramePr><p:cNvPr id="99" name="T"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr>
  <p:xfrm><a:off x="{CX}" y="{ty}"/><a:ext cx="{CW}" cy="{CY - ty - 150000}"/></p:xfrm>
  <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
    <a:tbl><a:tblPr>
      <a:lnT><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnT>
      <a:lnB><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnB>
      <a:lnL><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnL>
      <a:lnR><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnR>
    </a:tblPr>
    <a:tblGrid>{grid}</a:tblGrid><a:tr h="320000">{hdr_cells}</a:tr>{body_rows}</a:tbl>
  </a:graphicData></a:graphic>
</p:graphicFrame>'''
    return mk_slide([meta_line(n), slide_title(title), thin_line(TITLE_Y + 600000), tbl])


def tslide_table_proof(n, title, headers, rows, proof_label="RESULTS CHART PLACEHOLDER"):
    tbl_w = CW * 50 // 100
    cw = str(int(tbl_w) // len(headers))
    grid = "".join(f'<a:gridCol w="{cw}"/>' for _ in headers)
    def cell(t, b=False, sz=1200, fc=BODY, fill=None):
        fx = (f'<a:tcPr l="57150" r="57150" t="14000" b="14000">'
              f'{"<a:solidFill><a:srgbClr val=\"" + fill + "\"/></a:solidFill>" if fill else ""}</a:tcPr>')
        tx = tx_body([[(t, b, sz, fc, "Arial")]])
        return f"<a:tc>{fx}{tx}</a:tc>"

    hdr_cells = "".join(cell(h, True, 1300, WHITE) for h in headers)
    body_rows = ""
    for i, r in enumerate(rows):
        rf = "0A1220" if i % 2 == 0 else ""
        body_rows += "<a:tr h=\"240000\">" + "".join(cell(c, fill=rf) for c in r) + "</a:tr>"

    ty = TITLE_Y + 750000
    tbl = f'''<p:graphicFrame>
  <p:nvGraphicFramePr><p:cNvPr id="99" name="T"/><p:cNvGraphicFramePr/><p:nvPr/></p:nvGraphicFramePr>
  <p:xfrm><a:off x="{CX}" y="{ty}"/><a:ext cx="{tbl_w}" cy="{CY - ty - 150000}"/></p:xfrm>
  <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
    <a:tbl><a:tblPr>
      <a:lnT><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnT>
      <a:lnB><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnB>
      <a:lnL><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnL>
      <a:lnR><a:solidFill><a:srgbClr val="{DBORD}"/></a:solidFill></a:lnR>
    </a:tblPr>
    <a:tblGrid>{grid}</a:tblGrid><a:tr h="300000">{hdr_cells}</a:tr>{body_rows}</a:tbl>
  </a:graphicData></a:graphic>
</p:graphicFrame>'''
    return mk_slide([meta_line(n), slide_title(title), thin_line(TITLE_Y + 600000), tbl,
                    *img_placeholder(CX + tbl_w + 100000, TITLE_Y+150000,
                                     CW - tbl_w - 140000, 5300000, proof_label)])


def eslide(n, title, subtitle=""):
    els = [
        meta_line(n, "END"),
        thin_line(2000000),
        sp([(title.upper(), True, 4800, WHITE, "Arial Black")],
           CX, 2400000, CW, 700000, ln_spc=90000, char_spc=-500),
    ]
    if subtitle:
        els.append(sp([(subtitle, False, 1600, BODY, "Arial")], CX, 3400000, CW, 400000))
    return mk_slide(els)


# ═══════════════════════════════════════════
#  Slides
# ═══════════════════════════════════════════

slides = [

tslide(1,
    "Blockchain-Based Electronic\nHealth Record System",
    "A Decentralized EHR Prototype for Small Clinics",
    ["[ J. TAMBONG ]", "[ R. SOMONTINA ]", "[ E. BALON JR. ]"]
),

sslide(2, 1, "Chapter 1", "Background of the Study"),

bslide(3, "Background of the Study", [
    ("Current State at Herbosa Metro Doctors", [
        ("General paper templates — no standardized recording system", ""),
        ("Patient records inconsistent and difficult to retrieve", ""),
        ("Privacy compliance challenge under RA 10173", ""),
    ]),
    ("Limitations of Traditional Systems", [
        ("Paper-based: disorganized, easily lost, no access tracking", ""),
        ("Centralized databases: single point of failure", ""),
        ("Lack of interoperability causes errors and duplicate testing", ""),
    ]),
    ("Why Blockchain", [
        ("Decentralization eliminates single point of failure", ""),
        ("Immutability ensures tamper-proof records", ""),
        ("Patient-controlled access with transparent audit trails", ""),
    ]),
]),

bslide(4, "Statement of the Problem", [
    ("Main Problem", [
        ("Small clinics lack a secure, organized EHR system", ""),
    ]),
    ("Specific Problem 1: No Standardized System", [
        ("Depends on general paper templates for recording patient info", ""),
        ("Hard to maintain consistent, organized retrievable records", ""),
    ]),
    ("Specific Problem 2: Inefficient Access", [
        ("No integrated system for sharing records among personnel", ""),
        ("Delays and difficulty coordinating patient information", ""),
    ]),
    ("Specific Problem 3: No Access Control", [
        ("Cannot track or limit who views a patient's file", ""),
        ("Personal health information privacy is at risk", ""),
    ]),
]),

bslide(5, "Objectives of the Study", [
    ("Main Objective", [
        ("Design and develop a blockchain-based EHR system", ""),
        ("for secure, accessible patient health information.", ""),
    ]),
    ("Specific Objective 1: Secure Storage", [
        ("Blockchain immutability + AES-256 + decentralized storage", ""),
    ]),
    ("Specific Objective 2: Efficient Access", [
        ("Digital platform for timely retrieval and data exchange", ""),
    ]),
    ("Specific Objective 3: Access Control", [
        ("Authentication · Permission control · Immutable audit trail", ""),
    ]),
]),

tslide_table(6, "Scope, Limitations and Significance",
    ["Category", "Details"],
    [
        ["Scope", "Clinic prototype using simulated patient data"],
        ["Scope", "Blockchain storage, secure sharing, dashboard"],
        ["Limitation", "No live clinic deployment or external integration"],
        ["Limitation", "AI classifies records only — no diagnosis"],
        ["Significance: Institutions", "Secure unified platform, reduced delays"],
        ["Significance: Professionals", "Accurate records support faster diagnosis"],
        ["Significance: Patients", "Data protection, transparency, consent"],
        ["Significance: Researchers", "Foundation for future blockchain healthcare"],
    ]),

sslide(7, 3, "Chapter 3", "Research Methodology"),

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

bslide_proof(9, "System Architecture",
    [
        ("Hybrid Approach", [
            ("Encrypted PostgreSQL + hashes on Stellar Soroban", ""),
            ("IPFS for decentralized storage of large docs", ""),
        ]),
        ("Five System Modules", [
            ("1. Data Acquisition — Patient/provider portals", ""),
            ("2. Decentralized Storage — IPFS + encrypted DB", ""),
            ("3. Blockchain & Smart Contracts — Access + immutability", ""),
            ("4. Monitoring — React/Tailwind dashboard", ""),
            ("5. Administration — User roles, node monitoring", ""),
        ]),
        ("Smart Contracts", [
            ("Record Registry · Access Manager · Audit Trail", ""),
        ]),
    ], "SYSTEM ARCHITECTURE DIAGRAM"),

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

sslide(11, 4, "Chapter 4", "Interpretation of Results"),

tslide_table_proof(12, "Authentication & Access Control",
    ["Test Category", "Result", "Details"],
    [
        ["Login (4 roles)",       "PASS", "Admin, doctor, nurse, patient OK"],
        ["Wrong password",        "PASS", "HTTP 401 returned correctly"],
        ["Unauthenticated access", "PASS", "HTTP 401 blocked"],
        ["Rate limiting",          "PASS", "HTTP 429 after 5 attempts"],
        ["RBAC (12 tests)",       "12/12", "100% pass at avg 193 ms"],
        ["Privilege escalation",   "PASS", "Patient tokens get HTTP 403"],
    ], "API TEST RESULTS"),

tslide_table_proof(13, "Patient & Medical Records",
    ["Operation", "Records", "Performance"],
    [
        ["Bulk patient creation", "100",  "100% success · avg 55 ms"],
        ["Bulk retrieval",        "227",  "164 ms total response"],
        ["SOAP record creation",  "50",   "100% success · avg 81 ms"],
        ["Tamper detection",      "SHA-256", "Hash mismatch detected"],
        ["Field encryption",      "AES-256-GCM", "Ciphertext verified"],
        ["Audit log query",       "402 entries", "61 ms response"],
    ], "DASHBOARD UI SCREENSHOT"),

tslide_table_proof(14, "Security & Blockchain Results",
    ["Category", "Status", "Details"],
    [
        ["Brute-force prevention", "PASS", "429 after 5 attempts"],
        ["Privilege escalation",   "PASS", "Patient vs staff enforced"],
        ["Tamper detection",       "PASS", "SHA-256 avalanche confirmed"],
        ["Field encryption",       "PASS", "AES-256-GCM verified"],
        ["Blockchain anchoring",   "PASS", "27 on-chain transactions"],
        ["Smart contract deploy",  "PASS", "3 contracts on Stellar testnet"],
        ["Horizon API verify",     "PASS", "All tx confirmed"],
    ], "BLOCKCHAIN EXPLORER PROOF"),

sslide(15, 5, "Chapter 5", "Conclusions and Recommendations"),

bslide(16, "Conclusions and Recommendations", [
    ("Objective 1: Secure Storage — Achieved", [
        ("Multi-layered: encrypted PostgreSQL + IPFS + smart contracts", ""),
        ("Cryptographic hashing guarantees tamper-evident storage", ""),
    ]),
    ("Objective 2: Efficient Access — Achieved", [
        ("React/Tailwind dashboard with Web3-enabled API", ""),
        ("Real-time blockchain queries via cryptographic hashes", ""),
    ]),
    ("Objective 3: Access Control — Achieved", [
        ("Smart contracts enforce permission rules automatically", ""),
        ("Every interaction logged as immutable blockchain tx", ""),
    ]),
    ("Recommendations", [
        ("1. Live deployment with NPC compliance validation", ""),
        ("2. Integrate HL7 FHIR for cross-institution interoperability", ""),
        ("3. Penetration testing and production key management", ""),
        ("4. Cursor pagination, increase blockchain anchoring ratio", ""),
    ]),
]),

eslide(17, "Thank You", "tambongjustine@gmail.com"),

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

def mk_rel(c):
    i = ''.join(f'  <Relationship Id="rId{j+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{j+1}.xml"/>\n' for j in range(c))
    return f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>\n{i}</Relationships>'

PX = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>{"".join(f'<p:sldId id="{256+i}" r:id="rId{i+2}"/>' for i in range(SLIDES))}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="12192000"/>
</p:presentation>'''

TX = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Obsidian">
  <a:themeElements>
    <a:clrScheme name="Obsidian">
      <a:dk1><a:srgbClr val="{BG}"/></a:dk1><a:lt1><a:srgbClr val="{WHITE}"/></a:lt1>
      <a:dk2><a:srgbClr val="0A1220"/></a:dk2><a:lt2><a:srgbClr val="{BODY}"/></a:lt2>
      <a:accent1><a:srgbClr val="{BODY}"/></a:accent1>
      <a:accent2><a:srgbClr val="{BORD}"/></a:accent2>
      <a:accent3><a:srgbClr val="{WHITE}"/></a:accent3>
      <a:accent4><a:srgbClr val="{WHITE}"/></a:accent4>
      <a:accent5><a:srgbClr val="{WHITE}"/></a:accent5>
      <a:accent6><a:srgbClr val="{DBORD}"/></a:accent6>
    </a:clrScheme>
    <a:fontScheme name="Obsidian">
      <a:majorFont><a:latin typeface="Arial Black"/><a:ea typeface="Arial"/><a:cs typeface="Arial"/></a:majorFont>
      <a:minorFont><a:latin typeface="Arial"/><a:ea typeface="Arial"/><a:cs typeface="Arial"/></a:minorFont>
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
    z.writestr("ppt/_rels/presentation.xml.rels", mk_rel(SLIDES))
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
