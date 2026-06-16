import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Blockchain-Based Electronic Health Record System";

const BG = "000000";
const NEON = "CCFF00";
const WHITE = "FFFFFF";
const DARK_CARD = "111111";
const GRAY_TEXT = "AAAAAA";
const LABEL_BG = "1A2200";

// Helper to add consistent footer labels
function addFooter(slide, leftText, rightText) {
  // Thin separator line
  slide.addShape(pres.shapes.LINE, {
    x: 0.45, y: 5.2, w: 9.1, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  slide.addText(leftText.toUpperCase(), {
    x: 0.45, y: 5.28, w: 7, h: 0.25,
    fontSize: 7, color: "555555", fontFace: "Arial", charSpacing: 2, margin: 0
  });
  slide.addText(rightText.toUpperCase(), {
    x: 7.5, y: 5.28, w: 2.1, h: 0.25,
    fontSize: 7, color: "555555", fontFace: "Arial", charSpacing: 2, align: "right", margin: 0
  });
}

function addTopBar(slide, leftText, rightLabel) {
  slide.addText(`[ ${leftText.toUpperCase()} ]`, {
    x: 0.45, y: 0.22, w: 5, h: 0.25,
    fontSize: 7.5, color: "555555", fontFace: "Arial", charSpacing: 2, margin: 0
  });
  // Green label badge
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 0.17, w: 1.75, h: 0.28,
    fill: { color: NEON }, line: { color: NEON }
  });
  slide.addText(rightLabel.toUpperCase(), {
    x: 7.8, y: 0.17, w: 1.75, h: 0.28,
    fontSize: 7, color: "000000", fontFace: "Arial", bold: true, align: "center", valign: "middle", charSpacing: 1, margin: 0
  });
  // Top separator line
  slide.addShape(pres.shapes.LINE, {
    x: 0.45, y: 0.52, w: 9.1, h: 0,
    line: { color: "333333", width: 0.5 }
  });
}

// ─────────────── SLIDE 01: TITLE ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addTopBar(s, "System Overview Protocol", "Decentralized Architecture");

  // Big title
  s.addText("BLOCKCHAIN-\nBASED\nELECTRONIC\nHEALTH", {
    x: 0.45, y: 0.65, w: 9.1, h: 3.0,
    fontSize: 54, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addText("RECORD SYSTEM", {
    x: 0.45, y: 3.5, w: 9.1, h: 0.85,
    fontSize: 54, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left bar accent for subtitle
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.42, w: 0.06, h: 0.55,
    fill: { color: NEON }, line: { color: NEON }
  });
  s.addText("A Decentralized EHR Prototype optimized for Small Clinics using Stellar Soroban\n& IPFS", {
    x: 0.6, y: 4.42, w: 7.5, h: 0.55,
    fontSize: 10.5, color: WHITE, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Tambong, J.  ·  Somontina, R.  ·  Balon, E.  ·  Agustin, V.  ·  Fernandez, R.", "SLIDE 01");

  // School info
  s.addText("Jesus Reigns Christian College\nLa Consolacion University Philippines", {
    x: 6.2, y: 4.72, w: 3.35, h: 0.4,
    fontSize: 7.5, color: "555555", fontFace: "Arial", align: "right", margin: 0
  });

  // Tech stack bar
  s.addText("TECH STACK:  STELLAR SOROBAN  ·  IPFS  ·  REACT  ·  NODE.JS  ·  POSTGRESQL", {
    x: 0.45, y: 5.28, w: 5.5, h: 0.25,
    fontSize: 7, color: "555555", fontFace: "Arial", charSpacing: 1.5, margin: 0
  });
}

// ─────────────── SLIDE 02: SECTION - STUDY ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Segment Overview", "Section 01");

  s.addText("STUDY", {
    x: 0.5, y: 2.1, w: 9, h: 1.4,
    fontSize: 100, color: NEON, bold: true, fontFace: "Arial Black", align: "center", margin: 0
  });

  addFooter(s, "Healthcare Decentralization Research", "SLIDE 02");
}

// ─────────────── SLIDE 03: BACKGROUND OF THE STUDY ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Problem Domain", "Research Context");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("BACKGROUND OF THE STUDY", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 4.55, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("LIMITATIONS OF\nTRADITIONAL EHR", {
    x: 0.65, y: 1.6, w: 4.15, h: 0.65,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 2.32, w: 4.15, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "Paper-Based: ", options: { bold: true, color: WHITE } },
    { text: "General paper templates are disorganized, easily lost, and provide no active access tracking.\n\n", options: { color: GRAY_TEXT } },
    { text: "Centralized: ", options: { bold: true, color: WHITE } },
    { text: "Single point of failure vulnerabilities leave databases open to breaches.\n\n", options: { color: GRAY_TEXT } },
    { text: "Interoperability: ", options: { bold: true, color: WHITE } },
    { text: "Fragmented data sharing delays care coordination and forces medical testing duplication.", options: { color: GRAY_TEXT } },
  ], {
    x: 0.65, y: 2.42, w: 4.15, h: 2.4,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.42, w: 4.4, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("CURRENT STATE &\nBLOCKCHAIN ADVANTAGE", {
    x: 5.35, y: 1.6, w: 4.0, h: 0.65,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.35, y: 2.32, w: 3.95, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "Herbosa Metro Doctors (Tondo): ", options: { bold: true, color: WHITE } },
    { text: "Paper records lack strict privacy compliance mechanisms mandated under RA 10173.\n\n", options: { color: GRAY_TEXT } },
    { text: "Decentralization & Integrity: ", options: { bold: true, color: WHITE } },
    { text: "Distributing node structures prevents systemic fail states while cryptographic hashing ensures records are completely tamper-proof.", options: { color: GRAY_TEXT } },
  ], {
    x: 5.35, y: 2.42, w: 4.0, h: 2.4,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Analysis of Current Clinical Record Repositories", "SLIDE 03");
}

// ─────────────── SLIDE 04: STATEMENT OF THE PROBLEM ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Systematic Audit", "Core Deficiencies");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("STATEMENT OF THE PROBLEM", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  const cards = [
    {
      x: 0.45, label: "NO STANDARDS",
      icon: "📋",
      body: "Clinics depend purely on generic physical paper templates. Maintaining clean, structured, and instantly searchable patient medical histories remains impossible."
    },
    {
      x: 3.62, label: "SHARING\nINEFFICIENCY",
      icon: "↗",
      body: "There are no integrated transfer systems to securely swap records across clinical units, generating coordinate delays and administrative friction."
    },
    {
      x: 6.78, label: "ZERO ACCESS\nCONTROL",
      icon: "👤",
      body: "Personnel interactions with files go unmonitored. This lack of access logs leaves protected health information vulnerable to undetected breaches."
    }
  ];

  cards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.42, w: 3.0, h: 3.6,
      fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
    });
    // Icon area (neon symbol)
    s.addText(c.icon, {
      x: c.x + 0.2, y: 1.58, w: 0.6, h: 0.45,
      fontSize: 18, color: NEON, fontFace: "Arial", margin: 0
    });
    s.addText(c.label, {
      x: c.x + 0.2, y: 2.12, w: 2.7, h: 0.7,
      fontSize: 13, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: c.x + 0.2, y: 2.88, w: 2.6, h: 0,
      line: { color: "333333", width: 0.5 }
    });
    s.addText(c.body, {
      x: c.x + 0.2, y: 2.98, w: 2.65, h: 1.9,
      fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", margin: 0
    });
  });

  addFooter(s, "Primary Inquiry Parameters for Clinical Systems", "SLIDE 04");
}

// ─────────────── SLIDE 05: OBJECTIVES OF THE STUDY ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "System Definitions", "Objectives");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("OBJECTIVES OF THE STUDY", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 4.55, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("MAIN PROJECT TARGET", {
    x: 0.65, y: 1.6, w: 4.15, h: 0.5,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 2.17, w: 4.15, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText("Design and develop a blockchain-based EHR prototype to guarantee secure storage, rapid access, and complete access management.", {
    x: 0.65, y: 2.27, w: 4.15, h: 1.0,
    fontSize: 11, color: WHITE, fontFace: "Arial", bold: true, margin: 0
  });
  s.addText("This approach balances local operations with decentralized blockchain anchoring for small-scale physical clinics.", {
    x: 0.65, y: 3.35, w: 4.15, h: 0.8,
    fontSize: 9.5, color: GRAY_TEXT, fontFace: "Arial", margin: 0
  });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.42, w: 4.4, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("SPECIFIC TECHNICAL\nTARGETS", {
    x: 5.35, y: 1.6, w: 4.0, h: 0.65,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.35, y: 2.32, w: 3.95, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "• Secure Storage: ", options: { bold: true, color: NEON } },
    { text: "Apply blockchain immutability, AES-256 field encryption, and decentralized IPFS payload networks.\n\n", options: { color: GRAY_TEXT } },
    { text: "• Efficient Exchange: ", options: { bold: true, color: NEON } },
    { text: "Construct standard digital pathways to fast-track lookup operations.\n\n", options: { color: GRAY_TEXT } },
    { text: "• Access Enforcements: ", options: { bold: true, color: NEON } },
    { text: "Embed smart contracts for cryptographic role authorization.", options: { color: GRAY_TEXT } },
  ], {
    x: 5.35, y: 2.42, w: 4.0, h: 2.4,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Methodological Development Scope", "SLIDE 05");
}

// ─────────────── SLIDE 06: SCOPE & LIMITATIONS ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Matrix Design", "Limits & Advantages");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("SCOPE & LIMITATIONS", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Table header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 9.1, h: 0.35,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  const headers = [["CATEGORY", 0.55], ["SCOPE & DETAILS", 2.15], ["SIGNIFICANCE & IMPACT", 6.35]];
  headers.forEach(([label, x]) => {
    s.addText(label, {
      x, y: 1.46, w: 3.5, h: 0.28,
      fontSize: 7.5, color: NEON, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0
    });
  });

  const rows = [
    ["Functional Scope", "Prototype tracking simulated metrics (RA 10173 compliant) & IPFS sharing dashboards.", "Institutions secure unified operations with reduced delays."],
    ["Core Limitations", "No live clinical deployment or integration with third-party networks.", "Establishes a solid research baseline for developers."],
    ["Analytical Bounds", "AI algorithms solely analyze, organize, and sort files (no clinical diagnoses).", "Protects integrity while avoiding diagnostic liability."],
  ];

  rows.forEach((row, i) => {
    const y = 1.8 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.45, y, w: 9.1, h: 1.0,
      fill: { color: i % 2 === 0 ? "0A0A0A" : "0E0E0E" }, line: { color: "222222", width: 0.5 }
    });
    s.addText(row[0], { x: 0.55, y: y + 0.1, w: 1.5, h: 0.8, fontSize: 9.5, color: WHITE, fontFace: "Arial", bold: true, valign: "middle", margin: 0 });
    s.addText(row[1], { x: 2.15, y: y + 0.1, w: 4.1, h: 0.8, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
    s.addText(row[2], { x: 6.35, y: y + 0.1, w: 3.1, h: 0.8, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addFooter(s, "Development Restrictions & Value Propositions", "SLIDE 06");
}

// ─────────────── SLIDE 07: SECTION - METHODOLOGY ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Segment Overview", "Section 02");

  s.addText("METHODOLOGY", {
    x: 0.45, y: 2.2, w: 9.1, h: 1.2,
    fontSize: 80, color: NEON, bold: true, fontFace: "Arial Black", align: "left", margin: 0
  });

  addFooter(s, "System Design and Engineering Scheduling", "SLIDE 07");
}

// ─────────────── SLIDE 08: SPRINT-TO-PHASE MAPPING ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Phase Monitoring", "Sprint Delivery");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("SPRINT-TO-PHASE MAPPING", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Table header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 9.1, h: 0.35,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  [["SPRINT", 0.55], ["TIMELINE", 1.95], ["IDD PHASE", 3.5], ["CORE DELIVERABLES", 5.05]].forEach(([label, x]) => {
    s.addText(label, {
      x, y: 1.46, w: 3, h: 0.28,
      fontSize: 7.5, color: NEON, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0
    });
  });

  const sprints = [
    ["Sprint 1", "Weeks 1-2", "Requirements", "User interviews, mockup datasets, targeted functionality profiles."],
    ["Sprint 2", "Weeks 3-4", "Analysis", "Feasibility matrices, threat profiles, and Stellar network reviews."],
    ["Sprint 3", "Weeks 5-6", "Design", "System architecture blueprints, relational DB structures, interfaces."],
    ["Sprint 4-5", "Weeks 7-10", "Development", "Express REST APIs, Soroban integration tests, React user views."],
    ["Sprint 6", "Weeks 11-12", "Testing", "Execution of 171 custom test vectors checking endpoints & state changes."],
  ];

  sprints.forEach((row, i) => {
    const y = 1.8 + i * 0.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.45, y, w: 9.1, h: 0.65,
      fill: { color: i % 2 === 0 ? "0A0A0A" : "0E0E0E" }, line: { color: "222222", width: 0.5 }
    });
    s.addText(row[0], { x: 0.55, y: y + 0.08, w: 1.3, h: 0.5, fontSize: 9.5, color: NEON, fontFace: "Arial", bold: true, valign: "middle", margin: 0 });
    s.addText(row[1], { x: 1.95, y: y + 0.08, w: 1.45, h: 0.5, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
    s.addText(row[2], { x: 3.5, y: y + 0.08, w: 1.45, h: 0.5, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
    s.addText(row[3], { x: 5.05, y: y + 0.08, w: 4.3, h: 0.5, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addFooter(s, "Methodological Milestone Pipeline", "SLIDE 08");
}

// ─────────────── SLIDE 09: HYBRID ARCHITECTURE ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };

  addTopBar(s, "Flow Inventory", "Hybrid Topology");

  s.addText("HYBRID\nARCHITECTURE", {
    x: 0.45, y: 1.3, w: 4.4, h: 1.4,
    fontSize: 30, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addText("Securing clinical databases through off-chain storage combined with cryptographic on-chain validations.", {
    x: 0.45, y: 2.78, w: 4.3, h: 0.7,
    fontSize: 10, color: WHITE, fontFace: "Arial", margin: 0
  });
  s.addText("We write encrypted health record payload files onto PostgreSQL while storing unique cryptographic hashes directly inside the decentralized IPFS structure. Access logs and ledger references execute directly on Stellar Soroban contracts.", {
    x: 0.45, y: 3.55, w: 4.3, h: 1.1,
    fontSize: 8.5, color: GRAY_TEXT, fontFace: "Arial", margin: 0
  });

  // Left bar accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.7, w: 0.05, h: 0.4,
    fill: { color: NEON }, line: { color: NEON }
  });

  // Right side - gray architecture image placeholder (brutalist style)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 0.6, w: 4.55, h: 4.5,
    fill: { color: "888888" }, line: { color: "666666", width: 0.5 }
  });
  // Geometric shapes inside representing the brutalist architecture image
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: 1.1, w: 3.35, h: 3.5,
    fill: { color: "AAAAAA" }, line: { color: "999999", width: 0.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.1, y: 1.6, w: 2.35, h: 2.5,
    fill: { color: "CCCCCC" }, line: { color: "BBBBBB", width: 0.5 }
  });
  s.addText("[ HYBRID TOPOLOGY ]", {
    x: 5.0, y: 4.72, w: 4.55, h: 0.3,
    fontSize: 7, color: "555555", fontFace: "Arial", align: "center", charSpacing: 1.5, margin: 0
  });

  addFooter(s, "Immutable Database Layers", "SLIDE 09");
}

// ─────────────── SLIDE 10: TECHNOLOGY PIPELINES ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "System Profile", "Technology Stack");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("TECHNOLOGY PIPELINES", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  const techCards = [
    {
      x: 0.45, title: "BLOCKCHAIN", icon: "⬡",
      desc: "Stellar Soroban acts as our primary state engine for anchoring identities and records.",
      tags: "Solidity  ·  Hardhat  ·  Horizon API"
    },
    {
      x: 3.62, title: "INFRASTRUCTURE", icon: "▤",
      desc: "The Node.js and Express backend links system portals to decentralized IPFS storage nodes.",
      tags: "PostgreSQL 15  ·  IPFS"
    },
    {
      x: 6.78, title: "SECURITY", icon: "🔑",
      desc: "Leverages field-level cryptographic structures alongside clean frontend frameworks.",
      tags: "AES-256-GCM  ·  React  ·  Tailwind"
    }
  ];

  techCards.forEach(c => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.42, w: 3.0, h: 3.6,
      fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
    });
    s.addText(c.icon, {
      x: c.x + 0.2, y: 1.6, w: 0.5, h: 0.4,
      fontSize: 18, color: NEON, fontFace: "Arial", margin: 0
    });
    s.addText(c.title, {
      x: c.x + 0.2, y: 2.1, w: 2.7, h: 0.5,
      fontSize: 16, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: c.x + 0.2, y: 2.68, w: 2.6, h: 0,
      line: { color: "333333", width: 0.5 }
    });
    s.addText(c.desc, {
      x: c.x + 0.2, y: 2.78, w: 2.65, h: 1.5,
      fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", margin: 0
    });
    s.addText(c.tags, {
      x: c.x + 0.2, y: 4.55, w: 2.65, h: 0.3,
      fontSize: 8, color: NEON, fontFace: "Arial", margin: 0
    });
  });

  addFooter(s, "Modern Decentralized Integrations", "SLIDE 10");
}

// ─────────────── SLIDE 11: SECTION - RESULTS ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Segment Overview", "Section 03");

  s.addText("RESULTS", {
    x: 1.5, y: 2.1, w: 7, h: 1.4,
    fontSize: 100, color: NEON, bold: true, fontFace: "Arial Black", align: "center", margin: 0
  });

  addFooter(s, "Empirical Performance Logs", "SLIDE 11");
}

// ─────────────── SLIDE 12: AUTHENTICATION PERFORMANCE ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Metric Logs", "Access Tests");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("AUTHENTICATION PERFORMANCE", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 26, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 4.55, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("PORTAL SECURITY PROFILE", {
    x: 0.65, y: 1.6, w: 4.15, h: 0.5,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 2.17, w: 4.15, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "PASS: ", options: { bold: true, color: NEON } },
    { text: "Checked role-based login interfaces for all 4 profiles (Admin, Doctor, Nurse, Patient).\n\n", options: { color: GRAY_TEXT } },
    { text: "PASS: ", options: { bold: true, color: NEON } },
    { text: "Malicious endpoint operations and credential requests systematically reject via strict HTTP 401 protocols.\n\n", options: { color: GRAY_TEXT } },
    { text: "PASS: ", options: { bold: true, color: NEON } },
    { text: "Rapid login spamming triggers automatic HTTP 429 rate limit parameters.", options: { color: GRAY_TEXT } },
  ], {
    x: 0.65, y: 2.27, w: 4.15, h: 2.5,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.42, w: 4.4, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("RBAC EVALUATION", {
    x: 5.35, y: 1.6, w: 4.0, h: 0.5,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.35, y: 2.17, w: 3.95, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "Rule Enforcements: ", options: { bold: true, color: WHITE } },
    { text: "Ran 12 target endpoint privilege escalation tests.\n\n", options: { color: GRAY_TEXT } },
    { text: "Success rate: ", options: { bold: true, color: WHITE } },
    { text: "12/12 PASS (100% security coverage).\n\n", options: { color: GRAY_TEXT } },
    { text: "Performance metrics: ", options: { bold: true, color: WHITE } },
    { text: "Secured an average endpoint response speed of 193ms under load conditions.", options: { color: GRAY_TEXT } },
  ], {
    x: 5.35, y: 2.27, w: 4.0, h: 2.5,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Role-Based Authorization Validation Runs", "SLIDE 12");
}

// ─────────────── SLIDE 13: RECORD CREATION LATENCY ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Benchmarks", "Transaction Speeds");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("RECORD CREATION LATENCY", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Big stat card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.55, w: 4.55, h: 2.9,
    fill: { color: "0A0A0A" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("55ms", {
    x: 0.45, y: 1.7, w: 4.55, h: 2.2,
    fontSize: 90, color: NEON, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0
  });
  s.addText("BULK CREATION LATENCY", {
    x: 0.45, y: 4.1, w: 4.55, h: 0.28,
    fontSize: 7.5, color: "555555", fontFace: "Arial", charSpacing: 2.5, align: "center", margin: 0
  });

  // Right content
  s.addText("EVALUATING MASS\nRECORD CREATIONS", {
    x: 5.15, y: 1.55, w: 4.4, h: 0.85,
    fontSize: 16, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addText("Testing data transfers with 100 bulk accounts secured a 100% success rating at a minimal average latency of 55ms.", {
    x: 5.15, y: 2.5, w: 4.4, h: 0.8,
    fontSize: 10.5, color: WHITE, fontFace: "Arial", margin: 0
  });
  s.addText("Standard SOAP clinic documents are created and processed in 81ms. Every document undergoes automatic local hashing using SHA-256 alongside AES-256-GCM database encryption, protecting records with minimal overhead.", {
    x: 5.15, y: 3.4, w: 4.4, h: 1.35,
    fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Data Transit & Security Pipeline Latency Stats", "SLIDE 13");
}

// ─────────────── SLIDE 14: SECURITY ASSURANCE PROTOCOLS ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Final Status", "Audit Summary");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.85,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("SECURITY ASSURANCE\nPROTOCOLS", {
    x: 0.6, y: 0.72, w: 9, h: 0.85,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Table
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.72, w: 9.1, h: 0.35,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  [["VERIFICATION VECTOR", 0.55], ["STATUS", 3.55], ["OBSERVED TECHNICAL METRICS", 4.85]].forEach(([label, x]) => {
    s.addText(label, {
      x, y: 1.76, w: 3, h: 0.26,
      fontSize: 7.5, color: NEON, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0
    });
  });

  const secRows = [
    ["Brute-Force Safeguard", "HTTP 429 response rate limits trigger instantly on the 5th failed attempt."],
    ["Tamper Monitoring", "SHA-256 validations flag record discrepancies on query start."],
    ["On-Chain Anchoring", "27 transactions successfully executed and confirmed on the Stellar Soroban testnet."],
    ["Horizon Verification", "Verified hash registry, audit logs, and access control interactions."],
  ];

  secRows.forEach((row, i) => {
    const y = 2.1 + i * 0.73;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.45, y, w: 9.1, h: 0.68,
      fill: { color: i % 2 === 0 ? "0A0A0A" : "0E0E0E" }, line: { color: "222222", width: 0.5 }
    });
    s.addText(row[0], { x: 0.55, y: y + 0.08, w: 2.85, h: 0.52, fontSize: 9.5, color: WHITE, fontFace: "Arial", bold: true, valign: "middle", margin: 0 });
    // PASS badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.55, y: y + 0.17, w: 0.65, h: 0.3,
      fill: { color: NEON }, line: { color: NEON }
    });
    s.addText("PASS", { x: 3.55, y: y + 0.17, w: 0.65, h: 0.3, fontSize: 7.5, color: "000000", fontFace: "Arial", bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(row[1], { x: 4.85, y: y + 0.08, w: 4.5, h: 0.52, fontSize: 9, color: GRAY_TEXT, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addFooter(s, "System Security Verification Metrics", "SLIDE 14");
}

// ─────────────── SLIDE 15: SECTION - RECOMMENDATIONS ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Segment Overview", "Section 04");

  s.addText("RECOMMENDATIONS", {
    x: 0.3, y: 2.2, w: 9.4, h: 1.2,
    fontSize: 56, color: NEON, bold: true, fontFace: "Arial Black", align: "left", margin: 0
  });

  addFooter(s, "Future Deployment Pathways", "SLIDE 15");
}

// ─────────────── SLIDE 16: CONCLUSIONS & OUTLOOK ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Milestones", "Project Status");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("CONCLUSIONS & OUTLOOK", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.42, w: 4.55, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("ACHIEVED OBJECTIVES", {
    x: 0.65, y: 1.6, w: 4.15, h: 0.5,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 2.17, w: 4.15, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "• Safe Storage: ", options: { bold: true, color: NEON } },
    { text: "Implemented hybrid architecture leveraging encrypted local SQL stores alongside Stellar transaction ledgers.\n\n", options: { color: GRAY_TEXT } },
    { text: "• Fast Access: ", options: { bold: true, color: NEON } },
    { text: "Deployed light dashboards for secure data queries with response speeds under 193ms.\n\n", options: { color: GRAY_TEXT } },
    { text: "• Transparent Auditing: ", options: { bold: true, color: NEON } },
    { text: "Anchored all system interactions in smart contracts to prevent back-end changes.", options: { color: GRAY_TEXT } },
  ], {
    x: 0.65, y: 2.27, w: 4.15, h: 2.5,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.42, w: 4.4, h: 3.55,
    fill: { color: "0E0E0E" }, line: { color: "222222", width: 0.5 }
  });
  s.addText("STRATEGIC SUGGESTIONS", {
    x: 5.35, y: 1.6, w: 4.0, h: 0.5,
    fontSize: 13.5, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.35, y: 2.17, w: 3.95, h: 0,
    line: { color: "333333", width: 0.5 }
  });
  s.addText([
    { text: "1. Real Deployments: ", options: { bold: true, color: WHITE } },
    { text: "Execute live pilot testing on-site alongside compliance validations from the National Privacy Commission.\n\n", options: { color: GRAY_TEXT } },
    { text: "2. Interoperability: ", options: { bold: true, color: WHITE } },
    { text: "Implement HL7 FHIR standards for record parsing.\n\n", options: { color: GRAY_TEXT } },
    { text: "3. Network Audits: ", options: { bold: true, color: WHITE } },
    { text: "Conduct expert penetration tests before migrating to production mainnets.", options: { color: GRAY_TEXT } },
  ], {
    x: 5.35, y: 2.27, w: 4.0, h: 2.5,
    fontSize: 9.5, fontFace: "Arial", margin: 0
  });

  addFooter(s, "Final Specifications & Deployment Roadmap", "SLIDE 16");
}

// ─────────────── SLIDE 17: IMAGE SOURCES ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.45, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("IMAGE SOURCES", {
    x: 0.6, y: 0.45, w: 9, h: 0.55,
    fontSize: 28, color: WHITE, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Small image placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 3.2, w: 1.1, h: 0.8,
    fill: { color: "444444" }, line: { color: "555555", width: 0.5 }
  });
  s.addText("https://i.etsystatic.com/50370009/r/il/0962cf/8128037401/il_fullxfull.8128037401_rg94.jpg", {
    x: 1.65, y: 3.2, w: 7.8, h: 0.3,
    fontSize: 8.5, color: GRAY_TEXT, fontFace: "Arial", margin: 0
  });
  s.addText("Source: www.etsy.com", {
    x: 1.65, y: 3.55, w: 4, h: 0.3,
    fontSize: 9, color: "4499FF", fontFace: "Arial", margin: 0
  });
}

// ─────────────── SLIDE 18: TEAM MEMBERS ───────────────
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addTopBar(s, "Research Team", "Members");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.72, w: 0.07, h: 0.55,
    fill: { color: WHITE }, line: { color: WHITE }
  });
  s.addText("TEAM MEMBERS", {
    x: 0.6, y: 0.72, w: 9, h: 0.55,
    fontSize: 28, color: NEON, bold: true, fontFace: "Arial Black", margin: 0
  });

  const members = [
    { x: 0.45, name: "[ MEMBER NAME ]", sub: "Role / Position" },
    { x: 3.62, name: "[ MEMBER NAME ]", sub: "Role / Position" },
    { x: 6.78, name: "[ MEMBER NAME ]", sub: "Role / Position" },
  ];

  members.forEach((m, i) => {
    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x, y: 1.42, w: 3.0, h: 3.7,
      fill: { color: "0E0E0E" }, line: { color: "333333", width: 0.5 }
    });

    // Photo placeholder box
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x + 0.2, y: 1.6, w: 2.6, h: 2.3,
      fill: { color: "1A1A1A" }, line: { color: "444444", width: 1 }
    });
    // Placeholder icon (person silhouette-ish)
    s.addShape(pres.shapes.OVAL, {
      x: m.x + 0.85, y: 1.85, w: 1.3, h: 1.3,
      fill: { color: "222222" }, line: { color: "444444", width: 0.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x + 0.5, y: 3.0, w: 2.0, h: 0.75,
      fill: { color: "222222" }, line: { color: "444444", width: 0.5 }
    });
    s.addText("PHOTO", {
      x: m.x + 0.2, y: 2.5, w: 2.6, h: 0.4,
      fontSize: 8, color: "444444", fontFace: "Arial", align: "center", charSpacing: 2, margin: 0
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: m.x + 0.2, y: 4.0, w: 2.6, h: 0,
      line: { color: "333333", width: 0.5 }
    });

    // Name placeholder
    s.addText(m.name, {
      x: m.x + 0.2, y: 4.1, w: 2.6, h: 0.35,
      fontSize: 10, color: WHITE, fontFace: "Arial", bold: true, align: "center", margin: 0
    });
    s.addText(m.sub, {
      x: m.x + 0.2, y: 4.48, w: 2.6, h: 0.25,
      fontSize: 8.5, color: NEON, fontFace: "Arial", align: "center", margin: 0
    });

    // Member number
    s.addText(`0${i + 1}`, {
      x: m.x + 2.55, y: 1.62, w: 0.4, h: 0.28,
      fontSize: 8, color: "333333", fontFace: "Arial", bold: true, align: "right", margin: 0
    });
  });

  addFooter(s, "Jesus Reigns Christian College  ·  La Consolacion University Philippines", "SLIDE 18");
}

pres.writeFile({ fileName: "/home/nami/Downloads/Blockchain_EHR_Presentation.pptx" })
  .then(() => console.log("✅ PPTX written successfully"))
  .catch(err => console.error("❌ Error:", err));
