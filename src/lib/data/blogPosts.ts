import type { SanityPost } from "@/sanity/lib/content";

// Cover-bilder for bloggposter som ikke har eget mainImage i Sanity.
// Holdes synkronisert med slugene til de publiserte artiklene.
const postImageFallbacks: Record<string, string> = {
  "listerskoyta-havsul-historie-1933": "/images/scraped/sailing/hav-1-2.jpg",
  "jti-personlighetsanalyse-bedrift": "/images/tp-typeteori.jpg",
  "gronlandsekspedisjon-kajakk-isfjell": "/images/gronland-kajakk-3.jpg",
  "bedrager-teambuilding-forraeder":
    "/images/scraped/teambuilding/DaVinchi-pa-Strand-8579.jpg",
  "mordgate-teambuilding-mysterium":
    "/images/scraped/teambuilding/Personale-pa-Strand-Hotell-2830.jpg",
  "padlesikkerhet-pa-sjoen": "/images/kajakk-kurs-bilde.jpg",
  "introvert-ekstrovert-kommunikasjon-jobb":
    "/images/scraped/teambuilding/Volum-liter-pa-Strand-Hotell-8538.jpg",
  "kystkultur-arendal-merdo-brattekleiv":
    "/images/scraped/landscape/20100727-Strandhugg-pa-Maerdo.jpg",
  "kajakktur-fyr-til-fyr-blindleia": "/images/scraped/kayak/53G0259-scaled.jpg",
  "utdrikkingslag-arendal-aktiviteter": "/images/scraped/kayak/53G0108-scaled.jpg",
  "teambuilding-strand-hotel-fevik-bjellandstrand":
    "/images/scraped/teambuilding/Bungeerunning-7607.jpg",
  "wannado-historie-klatrepark-til-kystkultur":
    "/images/scraped/activities/klatreparkinngang.jpg",
  "havkajakk-host-morke-arstiden": "/images/scraped/kayak/53G0070-scaled.jpg",
  "hesteopplevelser-ungdom-mestring-arendal":
    "/images/scraped/horses/hesteopplevelser-bilde.jpg",
  "baattur-arendal-skjaergard-innseiling":
    "/images/scraped/sailing/baat-fb-havsul.jpg",
};

// Beskrivende alt-tekst per artikkel for bedre tilgjengelighet og SEO.
const postImageAltFallbacks: Record<string, string> = {
  "listerskoyta-havsul-historie-1933":
    "Listerskøyta Havsul under seil i Arendals skjærgård",
  "jti-personlighetsanalyse-bedrift":
    "Tone Pernille presenterer JTI-typeteori for en gruppe",
  "gronlandsekspedisjon-kajakk-isfjell":
    "Kajakkpadling blant isfjell på Øst-Grønland",
  "bedrager-teambuilding-forraeder":
    "Bedriftsgruppe samarbeider under et teambuilding-opplegg",
  "mordgate-teambuilding-mysterium":
    "Kollegaer løser en mordgåte sammen som teambuilding",
  "padlesikkerhet-pa-sjoen":
    "Kajakkpadlere med redningsvest under sikkerhetsøvelse på sjøen",
  "introvert-ekstrovert-kommunikasjon-jobb":
    "Kollegaer i dialog under en teamøkt",
  "kystkultur-arendal-merdo-brattekleiv":
    "Strandhugg på Merdø uthavn i Arendals skjærgård",
  "kajakktur-fyr-til-fyr-blindleia":
    "Havkajakk på tur langs kysten på Sørlandet",
  "utdrikkingslag-arendal-aktiviteter":
    "Gruppe på kajakktur under en feiring i Arendal",
  "teambuilding-strand-hotel-fevik-bjellandstrand":
    "Bedriftsgruppe i aktivitet på Strand Hotel Fevik",
  "wannado-historie-klatrepark-til-kystkultur":
    "Inngangen til Hove klatrepark, en del av Wannados historie",
  "havkajakk-host-morke-arstiden":
    "Havkajakk i rolig sjø om høsten ved Arendal",
  "hesteopplevelser-ungdom-mestring-arendal":
    "Islandshester på hesteopplevelse hos Wannado",
  "baattur-arendal-skjaergard-innseiling":
    "Båttur med Listerskøyta Havsul i Arendals skjærgård",
};

export function blogPostImage(post: Pick<SanityPost, "imageUrl" | "slug">) {
  return post.imageUrl || postImageFallbacks[post.slug || ""] || "/images/havsul.jpg";
}

export function blogPostImageAlt(
  post: Pick<SanityPost, "imageAlt" | "title" | "slug">,
) {
  return post.imageAlt || postImageAltFallbacks[post.slug || ""] || post.title;
}
