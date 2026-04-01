#!/usr/bin/env node
/**
 * Scraper: Wannado Facebook-side
 * Bruker Apify facebook-posts-scraper for å hente alle poster de siste 3 årene.
 * Output: content/scraped/facebook/posts.json + README.md
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Les API-nøkkel fra .env
function loadEnv() {
  try {
    const env = readFileSync(join(ROOT, '.env'), 'utf8');
    for (const line of env.split('\n')) {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    }
  } catch {
    // Ignorer hvis .env ikke finnes
  }
}

loadEnv();

const API_KEY = process.env.APIFY_API_KEY;
if (!API_KEY) {
  console.error('Mangler APIFY_API_KEY i .env');
  process.exit(1);
}

const FACEBOOK_URL = 'https://www.facebook.com/wannado.no';
const OUTPUT_DIR = join(ROOT, 'content/scraped/facebook');
const ACTOR_ID = 'apify~facebook-posts-scraper';

// 3 år tilbake fra i dag
const THREE_YEARS_AGO = new Date();
THREE_YEARS_AGO.setFullYear(THREE_YEARS_AGO.getFullYear() - 3);
const FROM_DATE = THREE_YEARS_AGO.toISOString().split('T')[0]; // YYYY-MM-DD

async function startRun() {
  console.log(`Starter Apify-kjøring for ${FACEBOOK_URL}`);
  console.log(`Henter poster fra ${FROM_DATE} til i dag...`);

  const response = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        startUrls: [{ url: FACEBOOK_URL }],
        resultsLimit: 1000,
        commentsMode: 'NONE',
        maxComments: 0,
        maxReactions: 0,
        scrapeAbout: false,
        scrapeReviews: false,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Feil ved start av kjøring: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.data.id;
}

async function waitForRun(runId) {
  console.log(`Kjøring startet: ${runId}`);
  console.log('Venter på at Apify er ferdig (kan ta noen minutter)...');

  let attempts = 0;
  const maxAttempts = 360; // maks 30 min (5s intervall)

  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 5000));
    attempts++;

    const response = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    const data = await response.json();
    const status = data.data.status;

    if (attempts % 6 === 0) {
      console.log(`  Status etter ${attempts * 5}s: ${status}`);
    }

    if (status === 'SUCCEEDED') {
      console.log(`Ferdig! Kjøring fullført etter ${attempts * 5} sekunder.`);
      return data.data.defaultDatasetId;
    }

    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
      throw new Error(`Kjøring feilet med status: ${status}`);
    }
  }

  throw new Error('Timeout: kjøring tok for lang tid');
}

async function downloadResults(datasetId) {
  console.log(`Laster ned resultater fra dataset ${datasetId}...`);

  const response = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?format=json&clean=true`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }
  );

  if (!response.ok) {
    throw new Error(`Feil ved nedlasting: ${response.status}`);
  }

  return response.json();
}

function formatDate(dateStr) {
  if (!dateStr) return 'ukjent dato';
  try {
    return new Date(dateStr).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function generateReadme(posts) {
  if (!posts || posts.length === 0) {
    return '# Facebook-scraping\n\nIngen poster funnet.\n';
  }

  // Sorter etter dato (nyeste først)
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date || b.time || 0) - new Date(a.date || a.time || 0)
  );

  // Statistikk
  const totalLikes = posts.reduce(
    (sum, p) => sum + (p.likes || p.reactions?.like || 0),
    0
  );
  const totalComments = posts.reduce(
    (sum, p) => sum + (p.comments || p.commentsCount || 0),
    0
  );
  const totalShares = posts.reduce(
    (sum, p) => sum + (p.shares || p.sharesCount || 0),
    0
  );

  const dates = posts
    .map((p) => new Date(p.date || p.time || 0))
    .filter((d) => d.getFullYear() > 2000)
    .sort((a, b) => a - b);
  const oldest = dates[0];
  const newest = dates[dates.length - 1];

  // Topp 10 etter engasjement (likes + kommentarer + delinger)
  const topPosts = [...posts]
    .map((p) => ({
      ...p,
      engagement:
        (p.likes || p.reactions?.like || 0) +
        (p.comments || p.commentsCount || 0) * 2 +
        (p.shares || p.sharesCount || 0) * 3,
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 10);

  // Kategoriser innhold
  const themes = {
    kajakk: [],
    seiling: [],
    teambuilding: [],
    hest: [],
    kurs: [],
    annet: [],
  };

  for (const post of posts) {
    const text = (post.text || post.message || '').toLowerCase();
    if (text.match(/kajakk|kajak|padl/)) themes.kajakk.push(post);
    else if (text.match(/seil|båt|havsul|skøyte/)) themes.seiling.push(post);
    else if (text.match(/team|bedrift|selskap|lag|gruppe/))
      themes.teambuilding.push(post);
    else if (text.match(/hest|ridning|riding/)) themes.hest.push(post);
    else if (text.match(/kurs|opplæring|lær|sertifikat|våttkort/))
      themes.kurs.push(post);
    else themes.annet.push(post);
  }

  let md = `# Wannado Facebook-innhold

Scrapet: ${new Date().toLocaleDateString('nb-NO')}
Kilde: [facebook.com/wannado.no](https://www.facebook.com/wannado.no)

## Statistikk

- **Totalt antall poster:** ${posts.length}
- **Periode:** ${oldest ? formatDate(oldest) : 'ukjent'} til ${newest ? formatDate(newest) : 'ukjent'}
- **Totale likes/reaksjoner:** ${totalLikes.toLocaleString('nb-NO')}
- **Totale kommentarer:** ${totalComments.toLocaleString('nb-NO')}
- **Totale delinger:** ${totalShares.toLocaleString('nb-NO')}

## Innhold etter tema

| Tema | Antall poster |
|------|--------------|
| Kajakk/padling | ${themes.kajakk.length} |
| Seiling/båt | ${themes.seiling.length} |
| Teambuilding | ${themes.teambuilding.length} |
| Hest/ridning | ${themes.hest.length} |
| Kurs/opplæring | ${themes.kurs.length} |
| Annet | ${themes.annet.length} |

## Topp 10 poster etter engasjement

`;

  for (let i = 0; i < topPosts.length; i++) {
    const p = topPosts[i];
    const text = (p.text || p.message || '').trim();
    const preview = text.length > 200 ? text.slice(0, 200) + '...' : text;
    const likes = p.likes || p.reactions?.like || 0;
    const comments = p.comments || p.commentsCount || 0;
    const shares = p.shares || p.sharesCount || 0;
    const date = formatDate(p.date || p.time);
    const url = p.url || p.postUrl || '';

    md += `### ${i + 1}. ${date}\n`;
    if (url) md += `[Se post](${url})\n\n`;
    md += `> ${preview.replace(/\n/g, '\n> ')}\n\n`;
    md += `Likes: ${likes} | Kommentarer: ${comments} | Delinger: ${shares}\n\n`;
  }

  md += `## Innholdsideer basert på topp-poster\n\n`;

  if (themes.kajakk.length > 0) {
    md += `### Kajakk/padling (${themes.kajakk.length} poster)\n`;
    md += `Ideer til sider/blogg:\n`;
    md += `- Blogg: "De beste kajakk-turene i Skjærgården"\n`;
    md += `- Side: Ekspedisjonspadling for viderekomne\n`;
    md += `- Casestudie: Fyr-til-fyr-turen\n\n`;
  }

  if (themes.seiling.length > 0) {
    md += `### Seiling/båt (${themes.seiling.length} poster)\n`;
    md += `Ideer til sider/blogg:\n`;
    md += `- Blogg: "Seile langs Sørlandskysten med Havsul"\n`;
    md += `- Side: Listerskøyta - historikk og opplevelser\n\n`;
  }

  if (themes.teambuilding.length > 0) {
    md += `### Teambuilding (${themes.teambuilding.length} poster)\n`;
    md += `Ideer til sider/blogg:\n`;
    md += `- Casestudier: Bedriftsarrangement med navn og resultater\n`;
    md += `- Blogg: "Hvorfor utendørs teambuilding virker"\n\n`;
  }

  if (themes.hest.length > 0) {
    md += `### Hest/ridning (${themes.hest.length} poster)\n`;
    md += `Ideer til sider/blogg:\n`;
    md += `- Side: Hesteridning i Raet nasjonalpark\n`;
    md += `- Blogg: "Ridning for nybegynnere på Tromøy"\n\n`;
  }

  md += `## Alle poster (rådata)\n\n`;
  md += `Se [posts.json](./posts.json) for alle poster med full metadata.\n`;

  return md;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    const runId = await startRun();
    const datasetId = await waitForRun(runId);
    let posts = await downloadResults(datasetId);

    // Filtrer til siste 3 år
    const threeYearsAgo = new Date(FROM_DATE);
    const filtered = posts.filter((p) => {
      const d = new Date(p.date || p.time || p.createdAt || 0);
      return d >= threeYearsAgo;
    });
    console.log(`Hentet ${posts.length} poster totalt, ${filtered.length} innenfor siste 3 år.`);
    posts = filtered.length > 0 ? filtered : posts; // fallback til alle hvis filtrering gir 0

    // Lagre rå JSON
    const jsonPath = join(OUTPUT_DIR, 'posts.json');
    writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
    console.log(`Lagret: ${jsonPath}`);

    // Generer README
    const readme = generateReadme(posts);
    const readmePath = join(OUTPUT_DIR, 'README.md');
    writeFileSync(readmePath, readme, 'utf8');
    console.log(`Lagret: ${readmePath}`);

    console.log('\nFerdig!');
    console.log(`  Poster hentet: ${posts.length}`);
    console.log(`  Output: content/scraped/facebook/`);
  } catch (err) {
    console.error('Feil:', err.message);
    process.exit(1);
  }
}

main();
