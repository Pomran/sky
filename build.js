const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function scanDir(dir, extensions) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const files = fs.readdirSync(dir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return extensions.includes(ext);
  });
  files.sort((a, b) => a.localeCompare(b));
  files.forEach(f => results.push(f));
  return results;
}

// images
const imagesDir = path.join(dataDir, 'images');
ensureDir(imagesDir);
const images = scanDir(imagesDir, ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']);
fs.writeFileSync(path.join(imagesDir, 'index.json'), JSON.stringify(images, null, 2));

// text files
const textDir = path.join(dataDir, 'text');
ensureDir(textDir);
const textFiles = scanDir(textDir, ['.txt', '.md']);
const textContent = textFiles.map(f => {
  const content = fs.readFileSync(path.join(textDir, f), 'utf-8');
  return { filename: f, content };
});
fs.writeFileSync(path.join(textDir, 'index.json'), JSON.stringify(textContent, null, 2));

// video files
const videoDir = path.join(dataDir, 'video');
ensureDir(videoDir);
const videos = scanDir(videoDir, ['.mp4', '.webm', '.ogg', '.mov', '.avi']);
const videoData = videos.map(f => {
  const baseName = path.parse(f).name;
  const poster = ['.jpg', '.jpeg', '.png'].find(ext =>
    fs.existsSync(path.join(videoDir, baseName + ext))
  );
  return {
    filename: f,
    poster: poster ? baseName + poster : null
  };
});
fs.writeFileSync(path.join(videoDir, 'index.json'), JSON.stringify(videoData, null, 2));

console.log('Build complete!');
console.log(`  Images: ${images.length}`);
console.log(`  Text: ${textContent.length}`);
console.log(`  Videos: ${videos.length}`);
