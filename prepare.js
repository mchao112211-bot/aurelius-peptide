const fs = require('fs');
const path = require('path');

const base = 'https://aurelius-peptide.vercel.app';
const out = path.join(__dirname, 'dist');
const products = [
  'retatrutide.webp','tirzepatide.webp','semaglutide.webp','tesamorelin.webp','sermorelin.webp',
  'bpc157.webp','tb500.webp','ghkcu.webp','motsc.webp','igf1lr3.webp'
];

const coaNames = [
  'Retatrutide','Tirzepatide','Semaglutide','Tesamorelin','Sermorelin',
  'BPC-157','TB-500','GHK-Cu','MOTS-c','IGF-1 LR3'
];

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

function buildCoaSection() {
  const cards = coaNames.map(name => `<div class="coa-card"><div class="coa-sheet"><div class="coa-top"><div class="coa-mark">COA</div><span class="coa-pill">REPORT PREVIEW</span></div><div class="coa-product"><strong>${name}</strong><span>Certificate of Analysis</span></div><div class="coa-lines"><div class="coa-line"></div><div class="coa-line"></div><div class="coa-line"></div><div class="coa-line"></div></div><div class="coa-status">Actual laboratory report will be displayed here. No test values are shown in this placeholder.</div></div><div class="coa-info"><strong>${name}</strong><span>Awaiting report</span></div></div>`).join('\n');
  return `<section id="coa" class="coa-section"><div class="wrap"><div class="section-head"><h2>Certificate of Analysis</h2><p>COA display aligned one-to-one with the featured product list.</p></div><div class="coa-grid">\n${cards}\n</div><div class="coa-note"><b>10 products · 10 COA slots.</b> Replace each placeholder with the corresponding third-party report when available.</div></div></section>\n`;
}

(async () => {
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // Keep product titles as product names only. Correct dosage is shown visually inside the vial image area.
  html = html.replace('.pic{height:225px;', '.pic{position:relative;height:225px;');
  html = html.replace('.pic img{width:100%;height:100%;object-fit:cover}', '.pic img{width:100%;height:100%;object-fit:cover}.dose-fix{position:absolute;left:50%;top:63%;transform:translate(-50%,-50%);z-index:3;background:#f1f1f2;color:#15171b;font-size:14px;font-weight:700;line-height:1;padding:4px 9px;border-radius:2px;box-shadow:0 0 6px 5px rgba(241,241,242,.96);white-space:nowrap}');

  html = html.replace('<img src="products/semaglutide.webp" alt="Semaglutide">', '<img src="products/semaglutide.webp" alt="Semaglutide"><span class="dose-fix">10 mg</span>');
  html = html.replace('<img src="products/tesamorelin.webp" alt="Tesamorelin">', '<img src="products/tesamorelin.webp" alt="Tesamorelin"><span class="dose-fix">5 mg</span>');
  html = html.replace('<img src="products/sermorelin.webp" alt="Sermorelin">', '<img src="products/sermorelin.webp" alt="Sermorelin"><span class="dose-fix">10 mg</span>');
  html = html.replace('<img src="products/ghkcu.webp" alt="GHK-Cu">', '<img src="products/ghkcu.webp" alt="GHK-Cu"><span class="dose-fix">50 mg</span>');

  html = html.replace('.coa-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}', '.coa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}');
  html = html.replace('@media(max-width:950px){.products{grid-template-columns:repeat(3,1fr)}.coa-grid{grid-template-columns:repeat(2,1fr)}', '@media(max-width:950px){.products{grid-template-columns:repeat(3,1fr)}.coa-grid{grid-template-columns:repeat(3,1fr)}');
  html = html.replace('@media(max-width:650px){.wrap{width:min(100% - 22px,1120px)}.coa-grid{grid-template-columns:1fr}', '@media(max-width:650px){.wrap{width:min(100% - 22px,1120px)}.coa-grid{grid-template-columns:repeat(2,1fr)}');

  const coaStart = html.indexOf('<section id="coa"');
  const facilityStart = html.indexOf('<section id="facility"');
  if (coaStart === -1 || facilityStart === -1 || facilityStart <= coaStart) {
    throw new Error('Could not locate COA/facility sections in index.html');
  }
  html = html.slice(0, coaStart) + buildCoaSection() + html.slice(facilityStart);
  fs.writeFileSync(path.join(out, 'index.html'), html);

  for (const file of products) {
    await download(`${base}/products/${file}`, path.join(out, 'products', file));
  }
  await download(`${base}/facility-preview.mp4`, path.join(out, 'facility-preview.mp4'));

  console.log('Aurelius product image dosage overlays and plain COA names prepared successfully.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
