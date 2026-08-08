import { assets } from "@/lib/images";

export type Chapter = {
  id: string;
  eyebrow: string;
  title: string;
  message: string;
  image: string;
  imageAlt: string;
  /** R2 key to upload a real photo for this chapter. */
  r2Key: string;
};

export const chapters: Chapter[] = [
  {
    id: "jasmine",
    eyebrow: "Chapter One",
    title: "Malli Poo Girl",
    message:
      "Some people wear perfume. You wear jasmine — and somehow the whole room turns softer. Every time I see malli poo in Mumbai, my brain says one word: Junior.",
    image: assets.jasmineBg,
    imageAlt: "Jasmine flowers on pink silk",
    r2Key: "ruth/jasmine.jpg",
  },
  {
    id: "chennai",
    eyebrow: "Chapter Two",
    title: "Chennai Ponnu",
    message:
      "Marina breeze, filter coffee, that unbeatable Chennai attitude. You carry your city with you everywhere — and you make everyone around you love it too.",
    image: assets.beach,
    imageAlt: "Sunrise over the beach with gentle waves",
    r2Key: "ruth/beach.jpg",
  },
  {
    id: "biryani",
    eyebrow: "Chapter Three",
    title: "Biryani > Everything",
    message:
      "There are two moods in this world: hungry, and biryani. Ask you anything at 1 PM and the answer is always the same. Today, extra raita and no sharing — birthday rules.",
    image: assets.biryani,
    imageAlt: "South Indian biryani served on a banana leaf",
    r2Key: "ruth/biryani.jpg",
  },
  {
    id: "kdrama",
    eyebrow: "Chapter Four",
    title: "K-Drama Queen",
    message:
      "Your Korean actors will never know you exist, and honestly that's their loss. Meanwhile you narrate every episode like it's breaking news — and I listen to all of it.",
    image: assets.kdrama,
    imageAlt: "Cozy k-drama night with fairy lights and popcorn",
    r2Key: "ruth/kdrama.jpg",
  },
  {
    id: "faith",
    eyebrow: "Chapter Five",
    title: "Blessed & Grace-Full",
    message:
      "Your faith is quiet but it's the strongest thing about you. May this new year be full of God's grace, peace, and answered prayers. Numbers 6:24 — 'The Lord bless you and keep you.'",
    image: assets.faith,
    imageAlt: "Church interior with lilies, candles and stained glass",
    r2Key: "ruth/faith.jpg",
  },
  {
    id: "devops",
    eyebrow: "Chapter Six",
    title: "Mumbai ↔ Chennai",
    message:
      "Same company, different pipelines, 1,300 km apart. Two DevOps engineers debugging life over chat. Zero downtime friendship — no rollback needed.",
    image: assets.devops,
    imageAlt: "Illustration of two engineers working from Mumbai and Chennai",
    r2Key: "ruth/devops.jpg",
  },
];
