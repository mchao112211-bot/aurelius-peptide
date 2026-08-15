const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'dist');
const imgDir = path.join(outDir, 'images');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(imgDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'images', 'products.webp'), path.join(imgDir, 'products.webp'));

const products = [
  ['Retatrutide','Research peptide'],
  ['Tirzepatide','Research peptide'],
  ['Semaglutide','Research peptide'],
  ['Tesamorelin','Research peptide'],
  ['Sermorelin','Research peptide'],
  ['BPC-157','Research peptide'],
  ['TB-500','Research peptide'],
  ['GHK-CU','Blue copper peptide'],
  ['MOTS-C','Research peptide'],
  ['CJC-1295','Research peptide']
];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const productCards = products.map(([name, sub], i) => `
<article class="card">
  <a href="#coa-${slug(name)}" class="photo p${i}" aria-label="${name} product image"></a>
  <div class="meta"><strong>${name}</strong><span>${sub}</span><a href="#coa-${slug(name)}">View COA →</a></div>
</article>`).join('');

const coaCards = products.map(([name], i) => `
<article class="coa-card" id="coa-${slug(name)}">
  <div class="coa-photo p${i}"></div>
  <div class="coa-meta"><strong>${name}</strong><span>Corresponding COA</span><button type="button" onclick="alert('COA file slot: ${name}')">View COA</button></div>
</article>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AURELIUS PEPTIDE</title>
<meta name="description" content="Aurelius Peptide research product showcase and COA gallery.">
<style>
:root{--navy:#071d3b;--blue:#1268e8;--ink:#102b50;--muted:#6e829b;--line:#d9e5f2;--soft:#f4f8fd}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);background:#fff}a{text-decoration:none;color:inherit}.wrap{width:min(1180px,calc(100% - 34px));margin:auto}
header{position:sticky;top:0;z-index:20;background:#071d3b;color:#fff}.nav{height:66px;display:flex;align-items:center;justify-content:space-between}.brand{font-size:20px;font-weight:900;letter-spacing:.04em}.brand span{color:#72abf7}.links{display:flex;gap:26px;font-size:12px;font-weight:800;color:#dce9f8}
.hero{text-align:center;padding:34px 0 20px;background:linear-gradient(#f3f8ff,#fff)}.hero small{color:var(--blue);font-weight:900;letter-spacing:.17em}.hero h1{font-size:44px;line-height:1;margin:8px 0 10px;color:var(--navy)}.hero p{margin:0;color:var(--muted);font-size:13px}
section{padding:42px 0}.head{text-align:center;margin-bottom:22px}.head small{color:var(--blue);font-weight:900;letter-spacing:.14em}.head h2{margin:6px 0;font-size:29px;color:var(--navy)}.head p{margin:0;color:var(--muted);font-size:12px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.card{border:1px solid var(--line);border-radius:15px;overflow:hidden;background:#fff;box-shadow:0 6px 18px rgba(12,48,91,.05)}.photo,.coa-photo{background-image:url('/images/products.webp');background-size:500% 200%;background-repeat:no-repeat;background-color:#edf4fc}.photo{display:block;aspect-ratio:1/1;border-bottom:1px solid #e5edf6}.meta{padding:12px}.meta strong{display:block;font-size:14px}.meta span{display:block;font-size:10px;color:var(--muted);margin:3px 0 8px}.meta a{font-size:11px;color:var(--blue);font-weight:900}
.p0{background-position:0 0}.p1{background-position:25% 0}.p2{background-position:50% 0}.p3{background-position:75% 0}.p4{background-position:100% 0}.p5{background-position:0 100%}.p6{background-position:25% 100%}.p7{background-position:50% 100%}.p8{background-position:75% 100%}.p9{background-position:100% 100%}
.coa{background:#f3f8ff}.coa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.coa-card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;scroll-margin-top:85px}.coa-photo{height:128px}.coa-meta{padding:10px}.coa-meta strong,.coa-meta span{display:block}.coa-meta strong{font-size:12px}.coa-meta span{font-size:9px;color:var(--muted);margin:3px 0 8px}.coa-meta button{border:0;border-radius:7px;background:var(--blue);color:#fff;padding:7px 9px;font-size:10px;font-weight:800;cursor:pointer}
.factory{background:#fff}.factory-box{display:grid;grid-template-columns:1fr 390px;gap:28px;align-items:center;border:1px solid var(--line);border-radius:18px;padding:20px}.factory h2{margin:0 0 8px;color:var(--navy)}.factory p{margin:0;color:var(--muted);font-size:12px;line-height:1.6}.video{border-radius:12px;overflow:hidden;background:#0d1d31}.video video{display:block;width:100%;aspect-ratio:16/9;max-height:210px;object-fit:cover}
footer{padding:22px 0;background:#071d3b;color:#9fb6d2;font-size:10px}
@media(max-width:900px){.grid,.coa-grid{grid-template-columns:repeat(3,1fr)}.factory-box{grid-template-columns:1fr}.links{gap:13px}}
@media(max-width:600px){.wrap{width:min(100% - 20px,1180px)}.hero h1{font-size:34px}.grid,.coa-grid{grid-template-columns:repeat(2,1fr);gap:9px}.links{display:none}.coa-photo{height:110px}}
</style>
</head>
<body>
<header><div class="wrap nav"><a class="brand" href="#">AURELIUS <span>PEPTIDE</span></a><nav class="links"><a href="#products">PRODUCTS</a><a href="#coa">COA</a><a href="#factory">FACTORY</a></nav></div></header>
<main>
<section class="hero"><div class="wrap"><small>RESEARCH PEPTIDES</small><h1>Product first. Clean and clear.</h1><p>Ten featured products with matching COA display and a compact factory preview.</p></div></section>
<section id="products"><div class="wrap"><div class="head"><small>FEATURED PRODUCTS</small><h2>Product Showcase</h2><p>Clear product photography in a simple two-row layout.</p></div><div class="grid">${productCards}</div></div></section>
<section id="coa" class="coa"><div class="wrap"><div class="head"><small>QUALITY DOCUMENTS</small><h2>COA Display</h2><p>Each COA slot is paired with the corresponding product image.</p></div><div class="coa-grid">${coaCards}</div></div></section>
<section id="factory" class="factory"><div class="wrap"><div class="factory-box"><div><small style="color:#1268e8;font-weight:900;letter-spacing:.12em">OUR FACTORY</small><h2>Manufacturing overview</h2><p>A compact factory video area keeps manufacturing visible without taking over the page.</p></div><div class="video"><video controls preload="metadata"><source src="https://videos.pexels.com/video-files/32386615/13814893_3840_2160_30fps.mp4" type="video/mp4"></video></div></div></div></section>
</main>
<footer><div class="wrap">© 2026 AURELIUS PEPTIDE · For laboratory research use only.</div></footer>
</body></html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log('Built Aurelius site with real image asset.');
