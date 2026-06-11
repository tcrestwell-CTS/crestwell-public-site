// One-off generator for /public/images/og-default.jpg (1200x630).
// Run: node scripts/generate-og-image.js
const sharp = require('sharp');
const path = require('path');

const W = 1200;
const H = 630;
const BASE_PHOTO = path.join(__dirname, '..', 'public', 'images', 'luxury-cruise-ship.jpg');
const OUT = path.join(__dirname, '..', 'public', 'images', 'og-default.jpg');

const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d1b2a" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#0d1b2a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1b2a" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#c9a84c"/>
  <line x1="100" y1="358" x2="148" y2="358" stroke="#c9a84c" stroke-width="2"/>
  <text x="160" y="365" font-family="Georgia, 'Times New Roman', serif" font-size="21"
        letter-spacing="6" fill="#c9a84c" text-transform="uppercase">BOUTIQUE TRAVEL AGENCY</text>
  <text x="98" y="448" font-family="Georgia, 'Times New Roman', serif" font-size="78"
        fill="#ffffff">Crestwell Travel Services</text>
  <text x="100" y="510" font-family="Georgia, 'Times New Roman', serif" font-size="34"
        font-style="italic" fill="rgba(255,255,255,0.85)">See the World One Port at a Time</text>
  <text x="100" y="566" font-family="Arial, sans-serif" font-size="19"
        letter-spacing="2" fill="rgba(255,255,255,0.55)">CRUISES · ALL-INCLUSIVE RESORTS · GROUP TRAVEL</text>
</svg>`;

async function main() {
  await sharp(BASE_PHOTO)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OUT);
  console.log('Wrote', OUT);
}

main().catch((err) => { console.error(err); process.exit(1); });
