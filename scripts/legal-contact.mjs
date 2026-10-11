// Renders the contact details for the legal notice and privacy policy from CONTACT_EMAIL and
// ADDRESS in .env into SVGs made of glyph outlines only. They stay out of git, and the published
// images contain no machine-readable text for scrapers. ADDRESS is comma separated, one part per line.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import opentype from "opentype.js";

const OUT_DIR = "static/legal";
const FONT_FILE = "node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff";
const FONT_SIZE = 16;
const LINE_HEIGHT = 1.5;
const FILL = "#868e96";

function readEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split("\n")
      .map((line) => line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, "")]),
  );
}

function renderOutlinedText(font, lines) {
  const lineHeight = FONT_SIZE * LINE_HEIGHT;
  const ascent = (font.ascender / font.unitsPerEm) * FONT_SIZE;
  const paths = lines.map((line, index) =>
    font.getPath(line, 0, ascent + index * lineHeight, FONT_SIZE).toPathData(2),
  );
  const width = Math.ceil(Math.max(...lines.map((line) => font.getAdvanceWidth(line, FONT_SIZE))));
  const height = Math.ceil(lineHeight * (lines.length - 1) + FONT_SIZE * 1.4);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<path fill="${FILL}" d="${paths.join("")}"/></svg>\n`
  );
}

const env = { ...readEnv(".env"), ...process.env };
const email = env.CONTACT_EMAIL?.trim();
const addressLines = (env.ADDRESS ?? "").split(",").map((part) => part.trim()).filter(Boolean);
if (!email || !addressLines.length) {
  if (process.argv.includes("--strict")) {
    console.error("CONTACT_EMAIL or ADDRESS is not set, see .env.example.");
    process.exit(1);
  }
  console.warn("CONTACT_EMAIL or ADDRESS is not set; the legal pages will show placeholders.");
}

const fontFile = readFileSync(FONT_FILE);
const font = opentype.parse(fontFile.buffer.slice(fontFile.byteOffset, fontFile.byteOffset + fontFile.byteLength));
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/address.svg`, renderOutlinedText(font, addressLines.length ? addressLines : ["Address not configured"]));
writeFileSync(`${OUT_DIR}/email.svg`, renderOutlinedText(font, [email || "Email not configured"]));
console.log(`Wrote ${OUT_DIR}/address.svg and ${OUT_DIR}/email.svg`);
