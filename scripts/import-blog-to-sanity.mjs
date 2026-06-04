// Importerer bloggartikler (markdown) fra content/blog-drafts/ til Sanity.
// Konverterer markdown -> Portable Text. Idempotent: deterministiske _id med
// createOrReplace, sa re-kjoring oppdaterer i stedet for a duplisere.
// Token leses fra Sanity CLI-config og skrives aldri til logg.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT_ID = "1eakesum";
const DATASET = "production";
const API_VERSION = "2026-04-02";

const cfgPath = path.join(os.homedir(), ".config", "sanity", "config.json");
const token = JSON.parse(fs.readFileSync(cfgPath, "utf8")).authToken;
if (!token) {
  console.error("Fant ingen Sanity authToken i", cfgPath);
  process.exit(1);
}

const DRAFTS_DIR = path.join(process.cwd(), "content", "blog-drafts");

// --- Forfattere (byline for E-E-A-T) ---
const AUTHORS = {
  wannado: { _id: "author-wannado", name: "Wannado" },
  tone: { _id: "author-tone-pernille", name: "Tone Pernille Sivertsen" },
  roar: { _id: "author-roar-laugerud", name: "Roar Laugerud" },
};
function authorIdFor(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("tone")) return AUTHORS.tone._id;
  if (n.includes("roar")) return AUTHORS.roar._id;
  return AUTHORS.wannado._id;
}

// --- Noekkelgenerator (deterministisk, stabil mellom kjoringer) ---
function keyer(prefix) {
  let i = 0;
  return () => `${prefix}${(i++).toString(36).padStart(4, "0")}`;
}

// --- Frontmatter-parser (enkel, vare felt er enkle) ---
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (!mm) continue;
    let [, k, v] = mm;
    v = v.trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      data[k] = v
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[k] = v.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body: m[2].trim() };
}

// --- Inline-parser: tekst -> {spans, markDefs} ---
// Handterer [tekst](url), **fet**, *kursiv* / _kursiv_, `kode`. Ikke nostet.
function parseInline(text, spanKey, defKey) {
  const spans = [];
  const markDefs = [];
  const re =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(?<![*\w])[*_]([^*_]+)[*_](?![*\w])|`([^`]+)`/g;
  let last = 0;
  let m;
  const push = (t, marks) => {
    if (!t) return;
    spans.push({ _type: "span", _key: spanKey(), text: t, marks: marks || [] });
  };
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) push(text.slice(last, m.index), []);
    if (m[1] !== undefined) {
      const k = defKey();
      markDefs.push({ _type: "link", _key: k, href: m[2] });
      push(m[1], [k]);
    } else if (m[3] !== undefined) {
      push(m[3], ["strong"]);
    } else if (m[4] !== undefined) {
      push(m[4], ["em"]);
    } else if (m[5] !== undefined) {
      push(m[5], ["code"]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) push(text.slice(last), []);
  if (spans.length === 0) push(text, []);
  return { spans, markDefs };
}

// --- Markdown body -> Portable Text blokker ---
function markdownToPortableText(body) {
  const blockKey = keyer("b");
  const spanKey = keyer("s");
  const defKey = keyer("d");
  const lines = body.replace(/\r/g, "").split("\n");
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    const { spans, markDefs } = parseInline(text, spanKey, defKey);
    blocks.push({
      _type: "block",
      _key: blockKey(),
      style: "normal",
      markDefs,
      children: spans,
    });
  };

  const pushHeading = (style, text) => {
    const { spans, markDefs } = parseInline(text.trim(), spanKey, defKey);
    blocks.push({
      _type: "block",
      _key: blockKey(),
      style,
      markDefs,
      children: spans,
    });
  };

  const pushListItem = (listItem, text) => {
    const { spans, markDefs } = parseInline(text.trim(), spanKey, defKey);
    blocks.push({
      _type: "block",
      _key: blockKey(),
      style: "normal",
      level: 1,
      listItem,
      markDefs,
      children: spans,
    });
  };

  for (const line of lines) {
    const t = line.trim();
    if (t === "") {
      flushParagraph();
      continue;
    }
    let mm;
    if ((mm = t.match(/^####\s+(.*)$/))) {
      flushParagraph();
      pushHeading("h4", mm[1]);
    } else if ((mm = t.match(/^###\s+(.*)$/))) {
      flushParagraph();
      pushHeading("h3", mm[1]);
    } else if ((mm = t.match(/^##\s+(.*)$/))) {
      flushParagraph();
      pushHeading("h2", mm[1]);
    } else if ((mm = t.match(/^#\s+(.*)$/))) {
      flushParagraph();
      pushHeading("h2", mm[1]); // degrader H1 til H2 (tittel er H1)
    } else if ((mm = t.match(/^>\s+(.*)$/))) {
      flushParagraph();
      pushHeading("blockquote", mm[1]);
    } else if ((mm = t.match(/^[-*]\s+(.*)$/))) {
      flushParagraph();
      pushListItem("bullet", mm[1]);
    } else if ((mm = t.match(/^\d+\.\s+(.*)$/))) {
      flushParagraph();
      pushListItem("number", mm[1]);
    } else {
      paragraph.push(t);
    }
  }
  flushParagraph();
  return blocks;
}

// --- Bygg dokumenter ---
const files = fs
  .readdirSync(DRAFTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort();

const mutations = [];

// Forfatter-dokumenter
for (const a of Object.values(AUTHORS)) {
  mutations.push({ createOrReplace: { _id: a._id, _type: "author", name: a.name } });
}

const summary = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(DRAFTS_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const slug = data.slug || file.replace(/\.md$/, "");
  const ptBody = markdownToPortableText(body);
  const publishedAt = /T/.test(data.publishedAt || "")
    ? data.publishedAt
    : `${data.publishedAt || "2026-01-01"}T09:00:00.000Z`;

  const doc = {
    _id: `post-${slug}`,
    _type: "post",
    title: data.title,
    slug: { _type: "slug", current: slug },
    excerpt: data.excerpt || "",
    publishedAt,
    author: { _type: "reference", _ref: authorIdFor(data.author) },
    body: ptBody,
    seo: {
      _type: "seo",
      title: data.metaTitle || data.title,
      description: data.metaDescription || data.excerpt || "",
      noIndex: false,
    },
  };
  mutations.push({ createOrReplace: doc });
  summary.push({ slug, title: data.title, blocks: ptBody.length });
}

// --- Dry-run: inspiser konvertering uten a skrive ---
if (process.env.DRY) {
  console.log(`DRY: ${summary.length} poster klare. Eksempel (forste post):`);
  const sample = mutations.find((m) => m.createOrReplace?._type === "post")
    .createOrReplace;
  console.log("slug:", sample.slug.current, "| blokker:", sample.body.length);
  console.log(JSON.stringify(sample.body.slice(0, 8), null, 2));
  for (const s of summary) console.log(`  - ${s.slug} (${s.blocks} blokker)`);
  process.exit(0);
}

// --- Push til Sanity ---
const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});
const json = await res.json();
if (!res.ok) {
  console.error("Mutasjon feilet:", res.status, JSON.stringify(json).slice(0, 600));
  process.exit(1);
}
console.log(`OK: ${summary.length} poster + ${Object.keys(AUTHORS).length} forfattere skrevet.`);
for (const s of summary) console.log(`  - ${s.slug} (${s.blocks} blokker) "${s.title}"`);
