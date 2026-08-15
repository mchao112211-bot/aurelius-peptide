const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const source = fs.readFileSync(sourcePath, 'utf8');

// Keep the product photography inside the generated HTML so Vercel can never lose image files.
const spriteMatch = source.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (!spriteMatch) throw new Error('Embedded Aurelius product image sprite not found in index.html');
const sprite = `data:image/webp;base64,${spriteMatch[1]}`;

const products = [
  ['Retatrutide', 'Research peptide'],
  ['Tirzepatide', 'Research peptide'],
  ['Semaglutide', 'Research peptide'],
  ['Tesamorelin', 'Research peptide'],
  ['Sermorelin', 'Research peptide'],
  ['BPC-157', 'Research peptide'],
  ['TB-500', 'Research peptide'],
  ['GHK-CU', 'Blue copper peptide'],
  ['MOTS-C', 'Research peptide'],
  ['CJC-1295', 'Research peptide']
];

function slug(name){return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}

const productCards = products.map(([name, sub], i) => `
  <article class="product-card">
    <a class="product-photo" href="#coa-${slug(name)}" aria-label="${name}">
      <img class="sprite s${i}" src="${sprite}" alt="${name} product vial">
      <span class="photo-name">${name}</span>
    </a>
    <div class="product-meta"><h3>${name}</h3><span>${sub}</span><a class="view-coa" href="#coa-${slug(name)}">View COA →</a></div>
  </article>`).join('');

const coaCards = products.map(([name], i) => `
  <article class="coa-card" id="coa-${slug(name)}">
    <div class="coa-photo"><img class="sprite s${i}" src="${sprite}" alt="${name} product image"><span>${name}</span></div>
    <div class="coa-body"><strong>${name}</strong><small>Corresponding COA display slot</small><button type="button" class="coa-button" data-product="${name}">View COA</button></div>
  </article>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AURELIUS PEPTIDE</title>
<meta name="description" content="Aurelius Peptide research product showcase, COA display and manufacturing overview.">
<style>
:root{--navy:#071d3b;--navy2:#0b3470;--blue:#1a70ee;--ink:#173453;--muted:#71859d;--line:#dce7f3;--soft:#f5f9ff;--white:#fff}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:var(--ink);background:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1180px,calc(100% - 34px));margin:auto}img{display:block}
header{position:sticky;top:0;z-index:50;background:rgba(5,20,43,.97);border-bottom:1px solid rgba(255,255,255,.08)}.nav{height:66px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{color:#fff;font-size:20px;font-weight:950;letter-spacing:.055em}.brand span{color:#73aefb;font-weight:650}.nav nav{display:flex;gap:24px;color:#d8e5f7;font-size:12px;font-weight:800}.nav nav a:hover{color:#fff}
.hero{padding:42px 0 25px;text-align:center;background:linear-gradient(180deg,#f3f8ff,#fff)}.eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.16em;color:var(--blue);font-weight:900}.hero h1{margin:8px 0 8px;color:var(--navy);font-size:clamp(34px,5vw,50px);letter-spacing:-.04em}.hero p{margin:0 auto;max-width:680px;color:var(--muted);font-size:13px;line-height:1.7}
section{padding:48px 0}.section-head{text-align:center;margin-bottom:23px}.section-head h2{margin:6px 0 6px;color:var(--navy);font-size:29px;letter-spacing:-.03em}.section-head p{margin:0;color:var(--muted);font-size:12px}
.product-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}.product-card{background:#fff;border:1px solid var(--line);border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(17,52,94,.045);transition:.18s ease}.product-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(17,52,94,.10)}.product-photo,.coa-photo{position:relative;display:block;overflow:hidden;background:#eef5fd}.product-photo{aspect-ratio:1/1;border-bottom:1px solid #e8eef7}.product-photo .sprite,.coa-photo .sprite{position:absolute;max-width:none;width:500%;height:200%;object-fit:fill}.s0{left:0;top:0}.s1{left:-100%;top:0}.s2{left:-200%;top:0}.s3{left:-300%;top:0}.s4{left:-400%;top:0}.s5{left:0;top:-100%}.s6{left:-100%;top:-100%}.s7{left:-200%;top:-100%}.s8{left:-300%;top:-100%}.s9{left:-400%;top:-100%}.photo-name{position:absolute;left:10px;right:10px;bottom:9px;background:rgba(255,255,255,.94);border:1px solid rgba(210,224,241,.95);border-radius:8px;padding:7px 5px;text-align:center;color:#0b3269;font-size:11px;font-weight:950;box-shadow:0 3px 12px rgba(0,0,0,.05)}.product-meta{padding:11px 12px 13px}.product-meta h3{margin:0;color:#0b376f;font-size:14px}.product-meta span{display:block;margin-top:3px;color:#8394aa;font-size:10px}.view-coa{display:inline-flex;margin-top:8px;color:var(--blue);font-size:10px;font-weight:900}
.coa-section{background:var(--soft)}.coa-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px}.coa-card{scroll-margin-top:82px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}.coa-photo{height:125px;border-bottom:1px solid var(--line)}.coa-photo span{position:absolute;left:8px;bottom:7px;background:rgba(255,255,255,.94);border-radius:6px;padding:5px 7px;color:#0b376f;font-size:9px;font-weight:900}.coa-body{padding:10px}.coa-body strong{display:block;color:#0a376f;font-size:12px}.coa-body small{display:block;margin-top:3px;color:#8595a8;font-size:9px;line-height:1.4}.coa-button{width:100%;margin-top:8px;padding:8px;border:0;border-radius:7px;background:var(--navy2);color:#fff;font-size:9px;font-weight:900;cursor:pointer}.coa-button:hover{background:var(--blue)}
.factory{background:#fff}.factory-box{display:grid;grid-template-columns:1fr 350px;gap:30px;align-items:center;border:1px solid var(--line);border-radius:18px;background:#071c3a;color:#fff;padding:22px}.factory-copy h2{margin:6px 0 9px;font-size:27px}.factory-copy p{margin:0;color:#b7c8dd;font-size:12px;line-height:1.7;max-width:590px}.points{display:flex;gap:15px;flex-wrap:wrap;margin-top:15px;color:#d6e4f3;font-size:10px}.points span:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#55a3ff;margin-right:6px}.video-shell{border:1px solid #294665;background:#0c2a4c;border-radius:12px;padding:6px}.video-shell video{display:block;width:100%;max-height:180px;aspect-ratio:16/9;object-fit:cover;border-radius:8px;background:#09182d}.video-caption{padding:5px 2px 0;color:#92a8c2;font-size:8px}
.about{padding:38px 0 54px}.about-box{display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid var(--line);padding-top:28px}.about-box h3{margin:0 0 5px;color:var(--navy);font-size:23px}.about-box p{margin:0;color:var(--muted);font-size:11px}.ruo{background:var(--navy);color:#fff;border-radius:999px;padding:10px 13px;font-size:9px;font-weight:900;letter-spacing:.08em}footer{border-top:1px solid #e8eef6;padding:18px 0 25px;color:#8796a9;font-size:9px}.foot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.modal{display:none;position:fixed;inset:0;z-index:100;align-items:center;justify-content:center;padding:18px;background:rgba(3,13,27,.72)}.modal.open{display:flex}.modal-card{width:min(620px,100%);background:#fff;border-radius:15px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.28)}.modal-head{display:flex;justify-content:space-between;align-items:center;padding:13px 15px;border-bottom:1px solid var(--line)}.modal-head strong{color:var(--navy)}.close{width:30px;height:30px;border:0;border-radius:50%;background:#edf4fc;font-size:17px;cursor:pointer}.modal-body{padding:18px}.doc{border:1px solid var(--line);border-radius:11px;padding:16px;background:#fbfdff}.doc-kicker{font-size:9px;color:var(--blue);font-weight:900;letter-spacing:.12em;text-transform:uppercase}.doc h3{margin:6px 0 13px;color:var(--navy);font-size:22px}.row{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid var(--line);font-size:10px}.row span{color:var(--muted)}.notice{margin-top:13px;padding:9px;border-radius:8px;background:#f0f6ff;color:#5c7595;font-size:9px;line-height:1.5}
@media(max-width:950px){.product-grid,.coa-grid{grid-template-columns:repeat(3,1fr)}.factory-box{grid-template-columns:1fr}.video-shell{max-width:520px}}
@media(max-width:620px){.wrap{width:min(100% - 22px,1180px)}.nav nav{display:none}.hero{padding-top:32px}.product-grid,.coa-grid{grid-template-columns:repeat(2,1fr);gap:9px}.factory-box{padding:15px}.about-box{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
<header><div class="wrap nav"><a class="brand" href="#top">AURELIUS <span>PEPTIDE</span></a><nav><a href="#products">PRODUCTS</a><a href="#coa">COA</a><a href="#factory">FACTORY</a><a href="#about">ABOUT</a></nav></div></header>
<main id="top">
<section class="hero"><div class="wrap"><div class="eyebrow">Research Peptides</div><h1>Product-first. Clean and clear.</h1><p>Ten featured Aurelius products with visible product photography, matching COA display slots and a compact factory preview.</p></div></section>
<section id="products"><div class="wrap"><div class="section-head"><div class="eyebrow">Featured Products</div><h2>Product Showcase</h2><p>High-visibility vial images with a simple two-row layout.</p></div><div class="product-grid">${productCards}</div></div></section>
<section id="coa" class="coa-section"><div class="wrap"><div class="section-head"><div class="eyebrow">Certificate of Analysis</div><h2>COA Gallery</h2><p>Each product image is paired with its corresponding COA display position.</p></div><div class="coa-grid">${coaCards}</div></div></section>
<section id="factory" class="factory"><div class="wrap"><div class="factory-box"><div class="factory-copy"><div class="eyebrow" style="color:#61aaff">Manufacturing</div><h2>Inside the facility.</h2><p>The factory video remains intentionally compact, keeping the product gallery as the primary focus of the site.</p><div class="points"><span>Controlled environment</span><span>Production overview</span><span>Quality workflow</span></div></div><div class="video-shell"><video autoplay muted loop playsinline preload="metadata"><source src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Capping_machine_in_action.webm" type="video/webm"></video><div class="video-caption">Facility preview · compact video</div></div></div></div></section>
<section id="about" class="about"><div class="wrap about-box"><div><h3>Aurelius Peptide</h3><p>Simple presentation for product, documentation and manufacturing review.</p></div><span class="ruo">FOR RESEARCH USE ONLY</span></div></section>
</main>
<footer><div class="wrap foot"><span>© 2026 AURELIUS PEPTIDE.</span><span>Product imagery is illustrative. Not for human consumption.</span></div></footer>
<div class="modal" id="coaModal"><div class="modal-card"><div class="modal-head"><strong id="modalTitle">COA</strong><button class="close" type="button">×</button></div><div class="modal-body"><div class="doc"><div class="doc-kicker">Certificate of Analysis</div><h3 id="modalProduct">Product</h3><div class="row"><span>Document</span><strong>COA / Lab Report</strong></div><div class="row"><span>Product</span><strong id="modalProduct2">Product</strong></div><div class="row"><span>Format</span><strong>PDF / Image</strong></div><div class="notice">Verified laboratory report placeholder. Replace this slot with the actual COA before publishing laboratory results.</div></div></div></div></div>
<script>
const modal=document.getElementById('coaModal');
document.addEventListener('click',e=>{const b=e.target.closest('.coa-button');if(b){document.getElementById('modalTitle').textContent=b.dataset.product+' COA';document.getElementById('modalProduct').textContent=b.dataset.product;document.getElementById('modalProduct2').textContent=b.dataset.product;modal.classList.add('open')}});
document.querySelector('.close').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
</script>
</body>
</html>`;

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log('Aurelius site generated with embedded product imagery.');
