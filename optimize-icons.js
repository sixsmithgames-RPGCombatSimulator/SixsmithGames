const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const icons = [
  'contentcraft',
  'fourstargeneral',
  'gravity',
  'mastertyping',
  'vcs'
];

async function optimizeIcons() {
  for (const icon of icons) {
    const inputPath = path.join(__dirname, 'public', 'icons', `${icon}.png`);
    const optimizedPath = path.join(__dirname, 'public', 'icons', `${icon}-optimized.png`);
    const favicon32Path = path.join(__dirname, 'public', 'icons', `${icon}-favicon-32.png`);
    const favicon16Path = path.join(__dirname, 'public', 'icons', `${icon}-favicon-16.png`);

    console.log(`Processing ${icon}...`);

    // Create optimized version (512x512)
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(optimizedPath);

    const optimizedStats = fs.statSync(optimizedPath);
    console.log(`  Created optimized: ${(optimizedStats.size / 1024).toFixed(2)} KB`);

    // Create 32x32 favicon
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(favicon32Path);

    console.log(`  Created 32x32 favicon`);

    // Create 16x16 favicon
    await sharp(inputPath)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(favicon16Path);

    console.log(`  Created 16x16 favicon`);
  }

  console.log('\nAll icons optimized successfully!');
}

optimizeIcons().catch(console.error);
