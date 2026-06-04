import {getCliClient} from 'sanity/cli'

const execute = process.argv.includes('--execute')

const client = getCliClient({apiVersion: '2026-04-02'})

const featuredSlugs = ['seilturer', 'kajakkturer', 'teambuilding', 'foredrag']
const posterAssetId = 'image-49996abc2ac9e9859ac6c02e655a513f4e381922-1200x630-jpg'

async function main() {
  const services = await client.fetch(
    `*[_type == "service" && slug.current in $slugs]{
      _id,
      title,
      "slug": slug.current
    }`,
    {slugs: featuredSlugs},
  )

  const serviceBySlug = new Map(services.map((service) => [service.slug, service]))
  const missingSlugs = featuredSlugs.filter((slug) => !serviceBySlug.has(slug))

  if (missingSlugs.length > 0) {
    throw new Error(`Missing service documents for: ${missingSlugs.join(', ')}`)
  }

  const document = {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Forside',
    hero: {
      heading: 'Opplevelser i Arendals skjærgård',
      rotatingWords: ['ro i kroppen', 'eventyr på havet', 'gøy med fine folk'],
      intro:
        'Vi tar dere med innaskjærs i Arendals skjærgård, ut på sjøen med Havsul, i kajakk eller inn i gøye opplegg for grupper som vil gjøre noe sammen. Det skal være trygt, deilig og akkurat passe spennende.',
      primaryCtaLabel: 'Finn din opplevelse',
      primaryCtaHref: '#opplevelser',
      posterImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: posterAssetId,
        },
        alt: 'Listerskøyta Havsul under seil i Arendals skjærgård',
      },
    },
    featuredIntro: {
      eyebrow: 'Destinasjon Arendal',
      title: 'Hva har dere lyst til å gjøre?',
    },
    featuredServices: featuredSlugs.map((slug) => ({
      _type: 'reference',
      _ref: serviceBySlug.get(slug)._id,
      _key: slug,
    })),
    seo: {
      _type: 'seo',
      title: 'Wannado - Opplevelser i Arendals skjærgård',
      description:
        'Bli med på seiltur, kajakktur, kajakkurs, teambuilding og foredrag i Arendal. Vi lager gøye opplevelser for fine folk på Sørlandet.',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: posterAssetId,
        },
        alt: 'Listerskøyta Havsul under seil i Arendals skjærgård',
      },
      noIndex: false,
    },
  }

  if (!execute) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          id: document._id,
          featuredServices: featuredSlugs,
        },
        null,
        2,
      ),
    )
    return
  }

  await client.createOrReplace(document)

  console.log(
    JSON.stringify(
      {
        seeded: true,
        id: document._id,
        featuredServices: featuredSlugs,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
