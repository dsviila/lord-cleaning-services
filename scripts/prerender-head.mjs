// Runs after `vite build`. Writes one HTML file per page (out/booking.html,
// out/services/deep.html, ...) with that page's own <title>, description,
// canonical, Open Graph and Twitter tags. netlify.toml serves each file at its
// clean URL, so crawlers that don't run JavaScript still see the right tags.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const jiti = createJiti(import.meta.url);
const { seoRoutes, SITE_URL, DEFAULT_IMAGE } = await jiti.import("../src/seo/routes.ts");

const template = readFileSync(join(outDir, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceTag(html, regex, replacement, label, path) {
  if (!regex.test(html)) throw new Error(`prerender-head: ${label} not found in index.html (${path})`);
  return html.replace(regex, replacement);
}

function buildPage(route) {
  const url = SITE_URL + (route.path === "/" ? "/" : route.path);
  const image = SITE_URL + (route.image ?? DEFAULT_IMAGE);
  const t = esc(route.title);
  const d = esc(route.description);
  let html = template;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, "title", route.path);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`, "description", route.path);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, "canonical", route.path);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${t}" />`, "og:title", route.path);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`, "og:description", route.path);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, "og:url", route.path);
  html = replaceTag(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`, "og:image", route.path);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`, "twitter:title", route.path);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`, "twitter:description", route.path);
  html = replaceTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${image}" />`, "twitter:image", route.path);

  // The home hero image is only needed on the home page.
  if (route.path !== "/") {
    html = html.replace(/\s*<link rel="preload" as="image" href="\/images\/hero\/Hero-Living-Room[^>]*>/g, "");
  }
  return html;
}

let count = 0;
for (const route of seoRoutes) {
  const html = buildPage(route);
  const file = route.path === "/" ? join(outDir, "index.html") : join(outDir, `${route.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count++;
}
console.log(`prerender-head: wrote ${count} pages with their own <head>`);
