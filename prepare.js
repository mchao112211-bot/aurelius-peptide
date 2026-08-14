const fs = require('fs');
const path = require('path');

const base = 'https://aurelius-peptide.vercel.app';
const out = path.join(__dirname, 'dist');
const products = [
  'retatrutide.webp','tirzepatide.webp','semaglutide.webp','tesamorelin.webp','sermorelin.webp',
  'bpc157.webp','tb500.webp','ghkcu.webp','motsc.webp','igf1lr3.webp'
];

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

(async () => {
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(out, 'index.html'));

  for (const file of products) {
    await download(`${base}/products/${file}`, path.join(out, 'products', file));
  }
  await download(`${base}/facility-preview.mp4`, path.join(out, 'facility-preview.mp4'));

  console.log('Aurelius assets prepared successfully.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
