const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const source = fs.readFileSync(sourcePath, 'utf8');

const spriteMatch = source.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (!spriteMatch) throw new Error('Embedded Aurelius product image sprite not found');
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
  ['SS-31', 'Research peptide']
];

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const productCards = products.map(([name, sub], i) => `
<article class="product-card">
  <div class="product-photo"><img class="sprite s${i}" src="${sprite}" alt="${name}"></div>
  <div class="product-meta"><h3>${name}</h3><span>${sub}</span></div>
</article>`).join('');

const coaCards = products.map(([name]) => `
<article class="coa-card" id="coa-${slug(name)}">
  <div class="coa-paper">
    <div class="coa-brand">AURELIUS PEPTIDE</div>
    <div class="coa-title">CERTIFICATE OF ANALYSIS</div>
    <div class="coa-name">${name}</div>
    <div class="coa-lines"><i></i><i></i><i></i><i></i></div>
    <div class="coa-seal">COA</div>
  </div>
  <strong>${name}</strong>
</article>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aurelius Peptide</title>
<meta name="description" content="Aurelius Peptide research product showcase, COA display and compact facility preview.">
<style>
:root{--navy:#071f46;--blue:#216fe8;--ink:#17385d;--muted:#7d90a9;--line:#dce7f4;--soft:#f4f8fd}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1120px,calc(100% - 28px));margin:auto}img{display:block}header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);border-bottom:1px solid #eaf0f7;backdrop-filter:blur(10px)}.nav{height:64px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:900;font-size:22px;color:var(--navy)}.brand span{color:var(--blue);font-weight:500}nav{display:flex;gap:26px;font-size:12px;font-weight:700;color:#345679}.hero{padding:30px 0 18px;background:linear-gradient(180deg,#f7fbff,#fff);text-align:center}.eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:900;color:var(--blue)}.hero h1{margin:7px 0 7px;font-size:36px;letter-spacing:-.03em;color:var(--navy)}.hero p{margin:auto;max-width:680px;color:var(--muted);font-size:12px;line-height:1.6}section{padding:40px 0}.section-head{text-align:center;margin-bottom:21px}.section-head h2{margin:6px 0 5px;color:var(--navy);font-size:28px}.section-head p{margin:0;color:var(--muted);font-size:12px}.product-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.product-card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 6px 18px rgba(14,51,94,.05);transition:.2s}.product-card:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(14,51,94,.10)}.product-photo{position:relative;aspect-ratio:1/1;overflow:hidden;background:#eef5fd}.sprite{position:absolute;max-width:none;width:500%;height:200%;object-fit:fill}.s0{left:0;top:0}.s1{left:-100%;top:0}.s2{left:-200%;top:0}.s3{left:-300%;top:0}.s4{left:-400%;top:0}.s5{left:0;top:-100%}.s6{left:-100%;top:-100%}.s7{left:-200%;top:-100%}.s8{left:-300%;top:-100%}.s9{left:-400%;top:-100%}.product-meta{padding:11px 12px 13px;border-top:1px solid #edf2f8}.product-meta h3{margin:0;font-size:14px;color:#0a356d}.product-meta span{display:block;margin-top:4px;font-size:10px;color:#8596aa}.coa-section{background:#081f43;color:#fff}.coa-section .section-head h2{color:#fff}.coa-section .section-head p{color:#abc0da}.coa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:13px}.coa-card{background:#0d2a56;border:1px solid rgba(255,255,255,.12);border-radius:13px;padding:10px}.coa-paper{position:relative;aspect-ratio:.78;background:#fff;border-radius:8px;padding:11px;color:#17385d;overflow:hidden}.coa-brand{font-size:7px;font-weight:900;color:#1a67d0}.coa-title{margin-top:8px;font-size:7px;font-weight:900;letter-spacing:.08em}.coa-name{margin-top:12px;font-size:12px;font-weight:900;color:#082f66}.coa-lines{display:grid;gap:5px;margin-top:13px}.coa-lines i{height:4px;background:#e6eef7;border-radius:10px}.coa-lines i:nth-child(2){width:86%}.coa-lines i:nth-child(3){width:72%}.coa-lines i:nth-child(4){width:91%}.coa-seal{position:absolute;right:10px;bottom:10px;width:34px;height:34px;border:2px solid #2e72c7;border-radius:50%;display:grid;place-items:center;font-size:8px;font-weight:900;color:#2e72c7}.coa-card>strong{display:block;margin-top:8px;font-size:10px;color:#dce9f8;text-align:center}.facility{background:#f5f9fe}.facility-box{display:grid;grid-template-columns:1.08fr .92fr;gap:30px;align-items:center}.video-frame{position:relative;overflow:hidden;border-radius:16px;border:1px solid #d3e0ef;background:linear-gradient(135deg,#dce8f5,#b9cee5);box-shadow:0 12px 34px rgba(14,51,94,.08);min-height:210px}.video-frame video{position:relative;z-index:2;display:block;width:100%;aspect-ratio:10/3;object-fit:cover;background:transparent}.video-fallback{position:absolute;inset:0;z-index:1;display:grid;place-items:center;background:linear-gradient(135deg,#dfe9f5,#adc5de);color:#25496f;font-size:12px;font-weight:800;letter-spacing:.08em}.facility-copy h2{margin:6px 0 10px;color:var(--navy);font-size:29px}.facility-copy p{margin:0;color:#68809a;font-size:12px;line-height:1.7}.chips{display:flex;gap:9px;flex-wrap:wrap;margin-top:16px}.chips span{padding:8px 10px;background:#fff;border:1px solid #d9e5f3;border-radius:10px;font-size:10px;color:#416186;font-weight:700}.about{padding:34px 0 44px}.about-box{border-top:1px solid var(--line);padding-top:25px;display:flex;justify-content:space-between;align-items:center;gap:20px}.about-box h3{margin:0 0 5px;font-size:22px;color:var(--navy)}.about-box p{margin:0;font-size:11px;color:var(--muted)}.ruo{background:var(--navy);color:#fff;padding:10px 13px;border-radius:999px;font-size:9px;font-weight:900;letter-spacing:.08em}footer{border-top:1px solid #e7eef7;padding:17px 0 24px;font-size:9px;color:#8997aa}.foot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}@media(max-width:900px){.product-grid,.coa-grid{grid-template-columns:repeat(3,1fr)}.facility-box{grid-template-columns:1fr}}@media(max-width:620px){nav{display:none}.product-grid,.coa-grid{grid-template-columns:repeat(2,1fr);gap:9px}.hero h1{font-size:31px}.about-box{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
<header><div class="wrap nav"><a class="brand" href="#top">AURELIUS <span>PEPTIDE</span></a><nav><a href="#products">PRODUCTS</a><a href="#coa">COA</a><a href="#facility">FACILITY</a><a href="#about">ABOUT</a></nav></div></header>
<main id="top">
<section class="hero"><div class="wrap"><div class="eyebrow">Research Peptides</div><h1>Premium Peptide Showcase</h1><p>Clean product presentation, matched COA display and a compact manufacturing preview.</p></div></section>
<section id="products"><div class="wrap"><div class="section-head"><div class="eyebrow">Featured Products</div><h2>Our Products</h2><p>Ten products presented in a consistent Aurelius Peptide visual style.</p></div><div class="product-grid">${productCards}</div></div></section>
<section id="coa" class="coa-section"><div class="wrap"><div class="section-head"><div class="eyebrow">Documentation</div><h2>COA Certificates</h2><p>One display slot for each featured product.</p></div><div class="coa-grid">${coaCards}</div></div></section>
<section id="facility" class="facility"><div class="wrap facility-box"><div class="video-frame"><div class="video-fallback">FACILITY PREVIEW</div><video autoplay muted loop playsinline preload="auto" onerror="this.style.display='none'"><source src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Capping_machine_in_action.webm" type="video/webm"></video></div><div class="facility-copy"><div class="eyebrow">Facility</div><h2>Compact manufacturing preview.</h2><p>The factory section stays deliberately compact so the product presentation remains the main focus.</p><div class="chips"><span>Controlled Environment</span><span>Quality Workflow</span><span>Production Overview</span></div></div></div></section>
<section id="about" class="about"><div class="wrap about-box"><div><h3>Aurelius Peptide</h3><p>Simple, professional and product-focused presentation.</p></div><span class="ruo">FOR RESEARCH USE ONLY</span></div></section>
</main>
<footer><div class="wrap foot"><span>© 2026 AURELIUS PEPTIDE</span><span>Product imagery is illustrative · Research use only</span></div></footer>
</body>
</html>`;

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log('Aurelius site generated with corrected product mapping.');
