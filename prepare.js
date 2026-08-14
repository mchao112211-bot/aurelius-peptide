const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const source = fs.readFileSync(sourcePath, 'utf8');

// Reuse the already-embedded Aurelius product sprite so product imagery can never go missing.
const spriteMatch = source.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (!spriteMatch) throw new Error('Embedded Aurelius product image not found in source index.html');
const sprite = `data:image/webp;base64,${spriteMatch[1]}`;

const products = [
  ['Retatrutide', 'Research peptide'],
  ['Tirzepatide', 'Research peptide'],
  ['Semaglutide', 'Research peptide'],
  ['Tesamorelin', 'Research peptide'],
  ['Sermorelin', 'Research peptide'],
  ['BPC-157', 'Research peptide'],
  ['TB-500', 'Research peptide'],
  ['GHK-Cu', 'Blue copper peptide'],
  ['MOTS-c', 'Research peptide'],
  ['IGF-1 LR3', 'Research peptide']
];

const cards = products.map(([name, sub], i) => `
  <article class="product-card">
    <div class="product-photo p${i}" role="img" aria-label="${name}"></div>
    <div class="product-meta"><h3>${name}</h3><span>${sub}</span></div>
  </article>`).join('');

const coaCards = products.map(([name]) => `
  <article class="coa-card">
    <div class="coa-paper">
      <div class="coa-head"><strong>COA</strong><span>REPORT</span></div>
      <div class="coa-name">${name}</div>
      <div class="coa-lines"><i></i><i></i><i></i><i></i></div>
      <div class="coa-foot">Third-party report slot</div>
    </div>
    <div class="coa-title">${name}</div>
  </article>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aurelius Peptide</title>
<meta name="description" content="Aurelius Peptide research product showcase, COA display and facility overview.">
<style>
:root{--navy:#082b5c;--blue:#1f6fe8;--ink:#173453;--muted:#7489a2;--line:#d9e6f4;--soft:#f4f8fd;--white:#fff}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:var(--ink);background:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1180px,calc(100% - 34px));margin:auto}
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.97);backdrop-filter:blur(10px);border-bottom:1px solid #e8eef7}.nav{height:68px;display:flex;align-items:center;justify-content:space-between}.brand{font-size:22px;font-weight:900;letter-spacing:-.03em;color:var(--navy)}.brand span{font-weight:500;color:var(--blue)}nav{display:flex;gap:25px;font-size:13px;font-weight:650;color:#355575}nav a:hover{color:var(--blue)}
.hero{padding:35px 0 25px;background:linear-gradient(180deg,#f6faff 0,#fff 100%)}.hero-row{display:flex;align-items:end;justify-content:space-between;gap:28px}.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.17em;font-weight:900;color:var(--blue)}.hero h1{margin:8px 0 8px;font-size:clamp(34px,4vw,48px);line-height:1;letter-spacing:-.04em;color:var(--navy)}.hero p{margin:0;max-width:650px;color:#647c98;font-size:14px;line-height:1.65}.badges{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.badge{border:1px solid #cfe0f4;background:#fff;border-radius:999px;padding:9px 12px;color:#315b8d;font-size:11px;font-weight:800;white-space:nowrap}
section{padding:52px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:22px;margin-bottom:19px}.section-head h2{margin:0;font-size:28px;letter-spacing:-.03em;color:var(--navy)}.section-head p{margin:5px 0 0;color:#7b8fa7;font-size:12px}
.product-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.product-card{border:1px solid var(--line);border-radius:17px;overflow:hidden;background:#fff;box-shadow:0 7px 22px rgba(16,55,101,.045);transition:.18s ease}.product-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(16,55,101,.095)}.product-photo{aspect-ratio:1/1;background-image:url('${sprite}');background-repeat:no-repeat;background-size:500% 200%;background-color:#eef5ff;border-bottom:1px solid #e6eef8}.p0{background-position:0 0}.p1{background-position:25% 0}.p2{background-position:50% 0}.p3{background-position:75% 0}.p4{background-position:100% 0}.p5{background-position:0 100%}.p6{background-position:25% 100%}.p7{background-position:50% 100%}.p8{background-position:75% 100%}.p9{background-position:100% 100%}.product-meta{padding:12px 13px 14px}.product-meta h3{margin:0;color:#07356e;font-size:14px}.product-meta span{display:block;margin-top:4px;color:#8394aa;font-size:11px}
.coa{background:linear-gradient(135deg,#072957,#0c3c79);color:#fff}.coa .section-head h2{color:#fff}.coa .section-head p{color:#bfd0e5}.coa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.coa-card{background:#fff;border-radius:14px;padding:11px;color:#12365f;box-shadow:0 9px 22px rgba(0,0,0,.13)}.coa-paper{height:148px;border:1px solid #d8e3ef;border-radius:9px;background:linear-gradient(#fff,#f8fbff);padding:11px;position:relative;overflow:hidden}.coa-paper:after{content:'AURELIUS';position:absolute;right:-20px;bottom:9px;font-size:28px;font-weight:900;letter-spacing:.08em;color:#0a32670a;transform:rotate(-18deg)}.coa-head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e1e9f3;padding-bottom:7px}.coa-head strong{font-size:16px;letter-spacing:.08em;color:#0b3c7d}.coa-head span{font-size:8px;font-weight:900;color:#1b61b8;background:#edf5ff;border-radius:999px;padding:4px 6px}.coa-name{margin:12px 0 10px;font-size:11px;font-weight:900}.coa-lines{display:grid;gap:6px}.coa-lines i{display:block;height:5px;border-radius:4px;background:#e7eef7}.coa-lines i:nth-child(2){width:84%}.coa-lines i:nth-child(3){width:68%}.coa-lines i:nth-child(4){width:91%}.coa-foot{position:absolute;left:11px;bottom:10px;font-size:8px;color:#8b9bad}.coa-title{margin-top:9px;font-size:11px;font-weight:850;color:#123a70}.coa-note{margin-top:14px;text-align:center;color:#bbcee5;font-size:10px}
.facility{background:#f4f8fd}.facility-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:30px;align-items:center}.video-shell{position:relative;border:1px solid #d5e2f1;border-radius:18px;overflow:hidden;background:#dce9f7;box-shadow:0 12px 32px rgba(20,58,101,.09)}.video-shell video{display:block;width:100%;aspect-ratio:16/7;object-fit:cover;background:#dce9f7}.video-label{position:absolute;left:12px;top:12px;background:rgba(6,35,72,.78);color:#fff;border:1px solid rgba(255,255,255,.18);padding:7px 9px;border-radius:999px;font-size:9px;font-weight:850;letter-spacing:.08em;text-transform:uppercase;pointer-events:none}.facility-copy h2{margin:7px 0 0;font-size:30px;letter-spacing:-.03em;color:var(--navy)}.facility-copy p{margin:12px 0 18px;color:#667f99;font-size:13px;line-height:1.65}.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.feature{background:#fff;border:1px solid #d7e4f2;border-radius:11px;padding:11px}.feature strong{display:block;color:#123e72;font-size:11px}.feature span{display:block;margin-top:3px;color:#7a8ea6;font-size:10px;line-height:1.35}.credit{margin-top:9px;color:#95a5b8;font-size:9px;line-height:1.4}
.about{padding:42px 0 54px}.about-box{display:flex;justify-content:space-between;align-items:center;gap:28px;border:1px solid #dbe7f4;border-radius:18px;padding:23px 25px;background:linear-gradient(135deg,#fff,#f7faff)}.about-box h2{margin:0 0 6px;color:var(--navy);font-size:24px}.about-box p{margin:0;max-width:780px;color:#6b8098;font-size:12px;line-height:1.65}.ruo{background:#0a3771;color:#fff;border-radius:999px;padding:10px 13px;font-size:10px;font-weight:900;letter-spacing:.11em;white-space:nowrap}footer{background:#071f42;color:#a8bdd7;padding:20px 0;font-size:10px}.foot{display:flex;justify-content:space-between;gap:18px}.foot strong{color:#fff}
@media(max-width:950px){.product-grid,.coa-grid{grid-template-columns:repeat(3,1fr)}.facility-grid{grid-template-columns:1fr}.hero-row{flex-direction:column;align-items:flex-start}.badges{justify-content:flex-start}}
@media(max-width:620px){.wrap{width:min(100% - 20px,1180px)}.nav{height:62px}.brand{font-size:18px}nav{gap:12px;font-size:11px}.hero{padding:27px 0 19px}.hero h1{font-size:36px}section{padding:42px 0}.section-head{display:block}.product-grid,.coa-grid{grid-template-columns:repeat(2,1fr);gap:9px}.feature-grid{grid-template-columns:1fr}.about-box{display:block}.ruo{display:inline-block;margin-top:15px}.foot{display:block;line-height:1.7}}
</style>
</head>
<body>
<header><div class="wrap nav"><a class="brand" href="#top">AURELIUS <span>PEPTIDE</span></a><nav><a href="#products">Products</a><a href="#coa">COA</a><a href="#facility">Facility</a><a href="#about">About</a></nav></div></header>
<main id="top">
<section class="hero"><div class="wrap hero-row"><div><div class="eyebrow">Research Peptide Showcase</div><h1>Premium presentation, kept simple.</h1><p>A clean product-focused showcase for Aurelius Peptide, with aligned COA presentation and a compact facility preview.</p></div><div class="badges"><span class="badge">99% Purity Labels</span><span class="badge">10 Featured Products</span><span class="badge">Research Use Only</span></div></div></section>
<section id="products"><div class="wrap"><div class="section-head"><div><h2>Our Products</h2><p>Consistent Aurelius vial photography in a clean two-row gallery.</p></div></div><div class="product-grid">${cards}</div></div></section>
<section id="coa" class="coa"><div class="wrap"><div class="section-head"><div><h2>COA Display</h2><p>One COA presentation slot for each featured product.</p></div></div><div class="coa-grid">${coaCards}</div><div class="coa-note">Display placeholders only — replace with the corresponding third-party laboratory report when available.</div></div></section>
<section id="facility" class="facility"><div class="wrap facility-grid"><div class="video-shell"><video id="facilityVideo" autoplay muted loop playsinline preload="metadata" poster="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Capping_machine_in_action.webm/1280px--Capping_machine_in_action.webm.jpg"><source src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Capping_machine_in_action.webm" type="video/webm"></video><div class="video-label">Facility preview</div></div><div class="facility-copy"><div class="eyebrow">Facility</div><h2>Compact production showcase.</h2><p>A longer, smooth production-line preview with native controls removed, so the facility section stays clean and does not compete with the product gallery.</p><div class="feature-grid"><div class="feature"><strong>Clean Environment</strong><span>Professional production presentation</span></div><div class="feature"><strong>Quality Focus</strong><span>Consistent process standards</span></div><div class="feature"><strong>Research Focused</strong><span>Laboratory-oriented showcase</span></div></div><div class="credit">Facility video: Work With Sounds / La Fonderie, CC BY 3.0, via Wikimedia Commons.</div></div></div></section>
<section id="about" class="about"><div class="wrap"><div class="about-box"><div><h2>Aurelius Peptide</h2><p>Minimal, professional and product-focused. The site is intentionally simple so products, documentation and facility presentation remain easy to review.</p></div><span class="ruo">FOR RESEARCH USE ONLY</span></div></div></section>
</main>
<footer><div class="wrap foot"><div><strong>AURELIUS PEPTIDE</strong> · © 2026</div><div>Product imagery is illustrative.</div></div></footer>
<script>document.addEventListener('DOMContentLoaded',()=>{const v=document.getElementById('facilityVideo');if(v){v.muted=true;v.play().catch(()=>{});}});</script>
</body></html>`;

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log('Aurelius final site generated successfully.');
