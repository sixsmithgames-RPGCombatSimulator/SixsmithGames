/**
 * Upload screenshots to Cloudinary
 *
 * Usage:
 *   node scripts/upload-screenshots.js path/to/screenshots
 *
 * This script uploads all images from a directory to Cloudinary,
 * organizing them by app name and optimizing for web delivery.
 */

const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

/**
 * Upload a single image to Cloudinary
 */
async function uploadImage(filePath, appName) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const publicId = `sixsmith-games/${appName}/${fileName}`;

  try {
    console.log(`Uploading ${filePath}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: 'sixsmith-games',
      resource_type: 'image',
      overwrite: true,
      // Automatically optimize the image
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    console.log(`✓ Uploaded: ${result.secure_url}`);
    console.log(`  Public ID: ${result.public_id}`);
    console.log(`  Size: ${(result.bytes / 1024).toFixed(2)} KB`);
    console.log('');

    return result;
  } catch (error) {
    console.error(`✗ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Get app name from directory structure or filename
 */
function getAppName(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath);
  const parts = relativePath.split(path.sep);

  // If the file is in a subdirectory, use that as the app name
  if (parts.length > 1) {
    return parts[0].toLowerCase();
  }

  // Otherwise, try to extract from filename (e.g., "vcs-screenshot-1.png" -> "vcs")
  const fileName = path.basename(filePath);
  const match = fileName.match(/^([a-z]+)-/i);
  return match ? match[1].toLowerCase() : 'general';
}

/**
 * Find all image files in a directory
 */
function findImages(dir) {
  const images = [];

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  }

  scan(dir);
  return images;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node scripts/upload-screenshots.js <directory>');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/upload-screenshots.js ./screenshots');
    console.error('');
    console.error('Directory structure should be:');
    console.error('  screenshots/');
    console.error('    vcs/');
    console.error('      screenshot-1.png');
    console.error('      screenshot-2.png');
    console.error('    contentcraft/');
    console.error('      screenshot-1.png');
    process.exit(1);
  }

  const sourceDir = args[0];

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Directory not found: ${sourceDir}`);
    process.exit(1);
  }

  // Verify Cloudinary configuration
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET) {
    console.error('Error: Cloudinary credentials not found in .env.local');
    console.error('Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
    process.exit(1);
  }

  console.log('Cloudinary Screenshot Uploader');
  console.log('==============================');
  console.log(`Source directory: ${sourceDir}`);
  console.log(`Cloud name: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
  console.log('');

  // Find all images
  const images = findImages(sourceDir);

  if (images.length === 0) {
    console.log('No images found in the specified directory.');
    process.exit(0);
  }

  console.log(`Found ${images.length} image(s) to upload`);
  console.log('');

  // Upload all images
  const results = [];
  for (const imagePath of images) {
    const appName = getAppName(imagePath, sourceDir);
    const result = await uploadImage(imagePath, appName);
    if (result) {
      results.push({
        fileName: path.basename(imagePath),
        appName,
        url: result.secure_url,
        publicId: result.public_id
      });
    }
  }

  // Print summary
  console.log('');
  console.log('Upload Summary');
  console.log('==============');
  console.log(`Total: ${results.length}/${images.length} images uploaded successfully`);
  console.log('');

  if (results.length > 0) {
    console.log('URLs for your Next.js app:');
    console.log('');
    results.forEach(r => {
      console.log(`// ${r.fileName} (${r.appName})`);
      console.log(`"${r.url}"`);
      console.log('');
    });

    console.log('To use in Next.js with optimization:');
    console.log('');
    console.log('import { CldImage } from \'next-cloudinary\';');
    console.log('');
    console.log('<CldImage');
    console.log(`  src="${results[0].publicId}"`);
    console.log('  width="1200"');
    console.log('  height="800"');
    console.log('  alt="Screenshot"');
    console.log('  format="auto"');
    console.log('  quality="auto"');
    console.log('/>');
  }
}

main().catch(console.error);
