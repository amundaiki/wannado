import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-03" });
const root = process.cwd();
const execute = process.argv.includes("--execute");

const heroImages = [
  {
    slug: "seilturer",
    file: "public/images/havsul.jpg",
    alt: "Listerskøyta Havsul med seil oppe i Arendals skjærgård",
  },
  {
    slug: "kajakkturer",
    file: "public/images/kajakk-kurs-bilde.jpg",
    alt: "Kajakkurs med redningsøvelse i sjøen utenfor Arendal",
  },
  {
    slug: "teambuilding",
    file: "public/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
    alt: "Bedriftsgruppe løser samarbeidsoppgave ute ved sjøen",
  },
  {
    slug: "foredrag",
    file: "public/images/tp-typeteori.jpg",
    alt: "Tone Pernille Sivertsen holder bok om JTI og typeforståelse",
  },
  {
    slug: "gavekort",
    file: "public/images/scraped/sailing/baat-fb-havsul.jpg",
    alt: "Listerskøyta Havsul på sjøen, en opplevelse som kan gis bort som gavekort",
  },
  {
    slug: "hesteopplevelser",
    file: "public/images/scraped/horses/hesteopplevelser-bilde.jpg",
    alt: "Trygge islandshester på hesteopplevelse hos Wannado",
  },
  {
    slug: "utleie",
    file: "public/images/utleie-bilde.jpg",
    alt: "Kajakker klare for utleie ved Skarestrand i Kongshavn",
  },
];

function localFile(entry) {
  return path.join(root, entry.file);
}

async function getService(slug) {
  return client.fetch(
    '*[_type == "service" && slug.current == $slug][0]{_id, title, "hasHero": defined(heroImage.asset)}',
    { slug },
  );
}

async function getExistingAsset(filename) {
  return client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id, url}',
    { filename },
  );
}

async function getOrUploadAsset(entry) {
  const filePath = localFile(entry);
  const filename = path.basename(filePath);
  const existing = await getExistingAsset(filename);

  if (existing?._id) {
    return existing;
  }

  if (!execute) {
    return { _id: `dry-run:${filename}`, url: null };
  }

  return client.assets.upload("image", fs.createReadStream(filePath), { filename });
}

async function main() {
  const summary = [];

  for (const entry of heroImages) {
    const filePath = localFile(entry);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing local file for ${entry.slug}: ${entry.file}`);
    }

    const service = await getService(entry.slug);
    if (!service?._id) {
      throw new Error(`Missing service document for slug: ${entry.slug}`);
    }

    const asset = await getOrUploadAsset(entry);

    if (execute) {
      await client
        .patch(service._id)
        .set({
          heroImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
            alt: entry.alt,
          },
        })
        .commit({ autoGenerateArrayKeys: true });
    }

    summary.push({
      slug: entry.slug,
      serviceId: service._id,
      file: entry.file,
      assetId: asset._id,
      patched: execute,
    });
  }

  console.log(JSON.stringify({ execute, count: summary.length, summary }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
