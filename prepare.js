const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'dist');
const imgOut = path.join(out, 'images');
const coaOut = path.join(out, 'coa');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(imgOut, { recursive: true });
fs.mkdirSync(coaOut, { recursive: true });

const products = [
  {name:'Retatrutide', slug:'retatrutide', dose:'10MG', color:'#0b4aa2', cap:'#111820'},
  {name:'Tirzepatide', slug:'tirzepatide', dose:'10MG', color:'#6f19a7', cap:'#64219d'},
  {name:'Semaglutide', slug:'semaglutide', dose:'10MG', color:'#0668c9', cap:'#f7f7f7'},
  {name:'Tesamorelin', slug:'tesamorelin', dose:'5MG', color:'#0c8e49', cap:'#10a653'},
  {name:'Sermorelin', slug:'sermorelin', dose:'10MG', color:'#e7ac00', cap:'#e5b500'},
  {name:'BPC-157', slug:'bpc-157', dose:'10MG', color:'#e95b13', cap:'#e96615'},
  {name:'TB-500', slug:'tb-500', dose:'10MG', color:'#0755b8', cap:'#0755b8'},
  {name:'GHK-CU', slug:'ghk-cu', dose:'50MG', color:'#0b75d8', cap:'#075bbf', blue:true},
  {name:'MOTS-C', slug:'mots-c', dose:'10MG', color:'#c70a15', cap:'#bf111d'},
  {name:'CJC-1295', slug:'cjc-1295', dose:'5MG', color:'#3e4348', cap:'#a8abad'}
];

function svgProduct(p){
  const powder = p.blue ? '#0a78dc' : '#f7f7f4';
  const powder2 = p.blue ? '#064fa9' : '#d9dde0';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 720" role="img" aria-labelledby="t d">
<title id="t">${p.name} Aurelius Peptide vial</title><desc id="d">Research peptide vial and matching presentation box.</desc>
<defs>
 <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#f4f6f8"/></linearGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#b7c5d3" stop-opacity=".45"/><stop offset=".18" stop-color="#fff" stop-opacity=".95"/><stop offset=".52" stop-color="#eaf3fb" stop-opacity=".28"/><stop offset=".82" stop-color="#fff" stop-opacity=".82"/><stop offset="1" stop-color="#9eb0c2" stop-opacity=".48"/></linearGradient>
 <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f8fafb"/><stop offset=".22" stop-color="#8b9298"/><stop offset=".45" stop-color="#f7f8f9"/><stop offset=".72" stop-color="#90989f"/><stop offset="1" stop-color="#cfd4d8"/></linearGradient>
 <linearGradient id="pow" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${powder}"/><stop offset="1" stop-color="${powder2}"/></linearGradient>
</defs>
<rect width="900" height="720" fill="url(#bg)"/>
<ellipse cx="455" cy="652" rx="315" ry="34" fill="#2d557c" opacity=".09"/>
<g>
  <path d="M460 176 L776 176 L808 202 L808 574 L460 574 Z" fill="#fafafa" stroke="#d9dde2" stroke-width="3"/>
  <path d="M776 176 L808 202 L808 574 L776 548 Z" fill="#ebedf0"/>
  <rect x="460" y="510" width="348" height="64" fill="${p.color}"/>
  <text x="632" y="245" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="800" fill="#123969">AURELIUS</text>
  <text x="632" y="272" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" fill="#1e67c7">PEPTIDE</text>
  <text x="632" y="374" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="54" font-weight="900" fill="#14171b" textLength="290" lengthAdjust="spacingAndGlyphs">${p.name}</text>
  <rect x="588" y="405" width="88" height="42" rx="4" fill="${p.color}"/>
  <text x="632" y="434" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="900" fill="#fff">${p.dose}</text>
</g>
<g>
  <rect x="127" y="112" width="238" height="70" rx="28" fill="${p.cap}"/>
  <path d="M143 174 H349 V228 Q349 247 329 247 H163 Q143 247 143 228 Z" fill="url(#metal)" stroke="#7f878d" stroke-width="2"/>
  <rect x="178" y="219" width="136" height="64" rx="16" fill="#151d25"/>
  <path d="M158 252 Q148 319 134 355 L134 592 Q134 636 184 648 H308 Q358 636 358 592 L358 355 Q344 319 334 252 Z" fill="url(#glass)" stroke="#829bb2" stroke-width="5"/>
  <path d="M150 295 Q246 320 342 295" fill="none" stroke="#fff" stroke-width="12" opacity=".85"/>
  <rect x="151" y="350" width="190" height="234" rx="8" fill="#fbfbfb" stroke="#e2e5e8"/>
  <text x="246" y="394" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="17" font-weight="800" fill="#133765">AURELIUS PEPTIDE</text>
  <text x="246" y="475" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="40" font-weight="900" fill="#17191b" textLength="164" lengthAdjust="spacingAndGlyphs">${p.name}</text>
  <rect x="201" y="498" width="90" height="40" rx="4" fill="${p.color}"/>
  <text x="246" y="526" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="900" fill="#fff">${p.dose}</text>
  <text x="246" y="562" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="700" fill="#222">FOR RESEARCH ONLY</text>
  <ellipse cx="246" cy="614" rx="82" ry="19" fill="url(#pow)"/>
  ${p.blue ? '<circle cx="217" cy="610" r="4" fill="#5cb5ff"/><circle cx="255" cy="617" r="5" fill="#0370db"/><circle cx="281" cy="608" r="4" fill="#58b5ff"/>' : ''}
</g>
</svg>`;
}

for(const p of products){
  fs.writeFileSync(path.join(imgOut, `${p.slug}.svg`), svgProduct(p), 'utf8');
}

const sourceCoa = path.join(root, 'coa');
if (fs.existsSync(sourceCoa)) {
  for (const file of fs.readdirSync(sourceCoa)) {
    if (file.toLowerCase().endsWith('.pdf')) fs.copyFileSync(path.join(sourceCoa,file), path.join(coaOut,file));
  }
}

const productCards = products.map(p => `
<article class="product-card">
  <a class="product-img" href="#coa-${p.slug}"><img src="images/${p.slug}.svg" alt="${p.name} product vial and box" loading="lazy"></a>
  <div class="product-info"><strong>${p.name}</strong><span>${p.blue?'Blue copper peptide':'Research peptide'}</span><a href="#coa-${p.slug}">View COA →</a></div>
</article>`).join('');

const coaCards = products.map(p => {
  const has = fs.existsSync(path.join(sourceCoa, `${p.slug}.pdf`));
  return `<article class="coa-card" id="coa-${p.slug}">
    <div class="pdf-icon"><span>PDF</span></div>
    <strong>${p.name}</strong><small>Certificate of Analysis</small>
    ${has ? `<a class="pdf-btn" href="coa/${p.slug}.pdf" target="_blank" rel="noopener">View PDF</a><a class="download" href="coa/${p.slug}.pdf" download>Download</a>` : `<span class="pdf-btn pending">PDF Pending</span>`}
  </article>`;
}).join('');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AURELIUS PEPTIDE</title><style>
:root{--navy:#061b39;--blue:#0f6dec;--ink:#0a284d;--muted:#71859c;--line:#dbe6f2;--soft:#f3f8ff}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--ink);background:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}header{position:sticky;top:0;z-index:50;background:var(--navy);color:#fff}.nav{height:64px;display:flex;align-items:center;justify-content:space-between}.brand{font-size:21px;font-weight:900;letter-spacing:.08em}.brand span{color:#75afff}.links{display:flex;gap:26px;font-size:12px;font-weight:800;color:#d9e6f7}.hero{text-align:center;padding:30px 0 17px;background:linear-gradient(#f3f8ff,#fff)}.eyebrow{font-size:10px;font-weight:900;letter-spacing:.18em;color:var(--blue);text-transform:uppercase}.hero h1{margin:7px 0 6px;font-size:42px;color:var(--navy);letter-spacing:-.035em}.hero p,.head p{margin:0;color:var(--muted);font-size:12px}.section{padding:40px 0}.head{text-align:center;margin-bottom:20px}.head h2{margin:5px 0;font-size:29px;color:var(--navy)}.product-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.product-card{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 6px 18px rgba(9,48,95,.055)}.product-img{display:block;background:#f5f8fb;aspect-ratio:1.12/1;overflow:hidden}.product-img img{display:block;width:100%;height:100%;object-fit:cover}.product-info{padding:12px 13px}.product-info strong{display:block;font-size:14px}.product-info span{display:block;margin-top:3px;color:var(--muted);font-size:10px}.product-info a{display:inline-block;margin-top:8px;color:var(--blue);font-size:11px;font-weight:900}.coa{background:var(--soft);border-block:1px solid #e6eef8}.coa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.coa-card{background:#fff;border:1px solid var(--line);border-radius:14px;min-height:198px;padding:15px;text-align:center;display:flex;align-items:center;flex-direction:column;scroll-margin-top:80px}.pdf-icon{width:52px;height:65px;border:3px solid #e64343;border-radius:6px;position:relative;margin-bottom:10px}.pdf-icon:before{content:'';position:absolute;right:-3px;top:-3px;border-left:15px solid transparent;border-bottom:15px solid #e64343}.pdf-icon span{position:absolute;left:5px;right:5px;bottom:8px;background:#e64343;color:#fff;border-radius:3px;padding:3px;font-size:10px;font-weight:900}.coa-card strong{font-size:12px}.coa-card small{margin:4px 0 10px;color:#8396ad;font-size:9px}.pdf-btn{margin-top:auto;background:var(--blue);color:#fff;padding:8px 11px;border-radius:7px;font-size:10px;font-weight:900}.pending{background:#d9e3ed;color:#6d7d90}.download{font-size:9px;color:#4f6c8f;margin-top:7px}.factory{padding:36px 0}.factory-box{display:grid;grid-template-columns:1fr 360px;gap:25px;align-items:center;border:1px solid var(--line);border-radius:17px;padding:20px}.factory h2{margin:5px 0 7px;font-size:27px}.factory p{margin:0;color:var(--muted);font-size:12px;line-height:1.6}.video{height:190px;border-radius:13px;overflow:hidden;background:#dfe8f2;border:1px solid #d6e2ef}.video video{display:block;width:100%;height:100%;object-fit:cover}footer{background:var(--navy);color:#b7c8dd;padding:18px 0;font-size:10px}@media(max-width:920px){.product-grid,.coa-grid{grid-template-columns:repeat(3,1fr)}.factory-box{grid-template-columns:1fr}}@media(max-width:620px){.wrap{width:min(100% - 20px,1180px)}.links{display:none}.hero h1{font-size:34px}.product-grid,.coa-grid{grid-template-columns:repeat(2,1fr);gap:9px}}
</style></head><body><header><div class="wrap nav"><a class="brand" href="#top">AURELIUS <span>PEPTIDE</span></a><nav class="links"><a href="#products">PRODUCTS</a><a href="#coa">COA</a><a href="#factory">FACTORY</a></nav></div></header><main id="top"><section class="hero"><div class="wrap"><div class="eyebrow">Research Peptides</div><h1>Products, COA, Factory.</h1><p>A simple product-first page with ten research peptide presentations.</p></div></section><section id="products" class="section"><div class="wrap"><div class="head"><div class="eyebrow">Featured Products</div><h2>Product Showcase</h2><p>Each product uses its own real SVG image file generated during the website build.</p></div><div class="product-grid">${productCards}</div></div></section><section id="coa" class="section coa"><div class="wrap"><div class="head"><div class="eyebrow">Quality Documents</div><h2>COA PDF Library</h2><p>PDF-only document slots. When you provide a COA PDF, it can be opened and downloaded here.</p></div><div class="coa-grid">${coaCards}</div></div></section><section id="factory" class="factory"><div class="wrap"><div class="factory-box"><div><div class="eyebrow">Our Factory</div><h2>Compact facility preview</h2><p>The video area stays intentionally small so the product showcase remains the main focus.</p></div><div class="video"><video muted loop autoplay playsinline controls preload="metadata"><source src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Capping_machine_in_action.webm" type="video/webm"></video></div></div></div></section></main><footer><div class="wrap">© 2026 AURELIUS PEPTIDE · For research use only.</div></footer></body></html>`;

fs.writeFileSync(path.join(out, 'index.html'), html, 'utf8');
console.log('Built Aurelius with 10 standalone SVG product images and PDF-ready COA slots.');
