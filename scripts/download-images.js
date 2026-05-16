/**
 * Image Download Script
 * Downloads images from Ivory Thai website
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ivorythainorthryde.com.au';
const IMAGES_DIR = path.join(__dirname, '../public/assets/images');

// Ensure directories exist
const dirs = [
  'brand',
  'hero',
  'gallery/interior',
  'gallery/dishes'
];

dirs.forEach(dir => {
  const fullPath = path.join(IMAGES_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Images to download from the website
const imagesToDownload = [
  {
    url: `${BASE_URL}/wp-content/uploads/2024/06/logopng.webp`,
    output: 'brand/logo.webp'
  },
  {
    url: `${BASE_URL}/wp-content/uploads/2024/06/logotransparentlighter-1920w-1024x321.webp`,
    output: 'brand/logo-transparent.webp'
  },
  {
    url: `${BASE_URL}/wp-content/uploads/2024/06/download-2.webp`,
    output: 'hero/delivery-1.webp'
  },
  {
    url: `${BASE_URL}/wp-content/uploads/2024/06/download-1-1.webp`,
    output: 'hero/delivery-2.webp'
  },
];

/**
 * Download a single image
 */
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const fullOutputPath = path.join(IMAGES_DIR, outputPath);
    const file = fs.createWriteStream(fullOutputPath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${outputPath}`);
          resolve();
        });
      } else {
        fs.unlink(fullOutputPath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(fullOutputPath, () => {});
      reject(err);
    });
  });
}

/**
 * Download all images
 */
async function downloadAll() {
  console.log('🖼️  Downloading images from Ivory Thai website...\n');

  for (const img of imagesToDownload) {
    try {
      await downloadImage(img.url, img.output);
    } catch (err) {
      console.error(`✗ Error downloading ${img.output}:`, err.message);
    }
  }

  console.log('\n✅ Image download complete!');
  console.log(`📂 Images saved to: ${IMAGES_DIR}`);
}

// Run if executed directly
if (require.main === module) {
  downloadAll().catch(console.error);
}

module.exports = { downloadImage, downloadAll };
