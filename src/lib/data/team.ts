import type { SanityTeamMember } from "@/sanity/lib/content";

export type TeamProfile = {
  id: string;
  name: string;
  role: string;
  responsibility: string;
  bio: string;
  email: string;
  phone: string;
  img: string;
  imgWidth: number;
  imgHeight: number;
  imageObjectPosition: string;
  videoSrc: string;
  videoLabel: string;
  videoObjectPosition: string;
  videoStartTime: number;
  badges: string[];
};

export const FALLBACK_TEAM_PROFILES: TeamProfile[] = [
  {
    id: "tone-pernille-sivertsen",
    name: "Tone Pernille Sivertsen",
    role: "Teambuilding, foredrag og hest",
    responsibility: "Teambuilding, hesteopplevelser og coaching",
    bio: "Tone Pernille har siden 2005 skapt opplevelser som kombinerer energi, trygghet og tydelig ledelse. Med JTI, coaching og lang erfaring fra grupper og bedrifter bygger hun tillit og får folk med.",
    email: "tp@wannado.no",
    phone: "+47 99 46 99 57",
    img: "/images/tp-typeteori.jpg",
    imgWidth: 900,
    imgHeight: 1200,
    imageObjectPosition: "center 22%",
    videoSrc: "/videos/havsul-intervju-tone.mp4",
    videoLabel: "Tone Pernille om Wannado",
    videoObjectPosition: "72% center",
    videoStartTime: 2,
    badges: ["JTI-sertifisert", "NLP Master Coach", "Dyreassisterte intervensjoner"],
  },
  {
    id: "roar-laugerud",
    name: "Roar Laugerud",
    role: "Kajakk, seilturer og trygg ferdsel",
    responsibility: "Kajakkinstruktør, skipper og fotograf",
    bio: "Roar er Veileder Hav, skipper og fotograf. Han skaper rolige, trygge rammer for mennesker som vil utfordre seg i kajakk, på seiltur eller ute i skjærgården.",
    email: "roar@wannado.no",
    phone: "+47 94 82 67 10",
    img: "/images/roar-laugerud-havsul.jpg",
    imgWidth: 1920,
    imgHeight: 1080,
    imageObjectPosition: "43% center",
    videoSrc: "/videos/havsul-intervju-roar.mp4",
    videoLabel: "Roar om livet på sjøen",
    videoObjectPosition: "center 32%",
    videoStartTime: 2,
    badges: ["Veileder Hav", "BCU nest høyeste nivå", "Fritidsskipper", "Autorisert for 12 passasjerer"],
  },
];

function keyFor(member: Pick<TeamProfile, "email" | "name">) {
  return (member.email || member.name).toLowerCase();
}

export function mergeTeamProfiles(members: SanityTeamMember[] = []) {
  if (members.length === 0) {
    return FALLBACK_TEAM_PROFILES;
  }

  const fallbackByKey = new Map(
    FALLBACK_TEAM_PROFILES.map((profile) => [keyFor(profile), profile]),
  );

  return members.map((member) => {
    const fallback =
      fallbackByKey.get(keyFor({ email: member.email || "", name: member.name })) ??
      FALLBACK_TEAM_PROFILES.find((profile) => profile.name === member.name) ??
      FALLBACK_TEAM_PROFILES[0];

    return {
      ...fallback,
      id: member._id,
      name: member.name || fallback.name,
      role: member.role || fallback.role,
      responsibility: member.responsibility || fallback.responsibility,
      bio: member.bioText || fallback.bio,
      email: member.email || fallback.email,
      phone: member.phone || fallback.phone,
      img: member.imageUrl || fallback.img,
    };
  });
}
