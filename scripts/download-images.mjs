// Downloads every image the site used from the Readdy CDN, converts it to WebP
// and saves it under public/images/ using the paths in image-manifest.json.
// Run once on your computer:  npm run images
import { readFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const manifest = JSON.parse(await readFile(new URL("./image-manifest.json", import.meta.url), "utf8"));
const publicDir = join(process.cwd(), "public");

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

let ok = 0;
let skipped = 0;
const failed = [];

for (const { url, path } of manifest) {
  const target = join(publicDir, path);
  if (await exists(target)) {
    skipped++;
    continue;
  }
  try {
    const input = await download(url);
    await mkdir(dirname(target), { recursive: true });
    await sharp(input)
      .resize({ width: 2000, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    ok++;
    console.log(`OK   ${path}`);
  } catch (err) {
    failed.push(path);
    console.log(`FAIL ${path}  (${err.message})`);
  }
}

console.log(`\nDone: ${ok} downloaded, ${skipped} already existed, ${failed.length} failed.`);
if (failed.length) {
  console.log("Run `npm run images` again to retry the failed ones.");
  process.exitCode = 1;
}
