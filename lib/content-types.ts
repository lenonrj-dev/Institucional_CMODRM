export type GlobalContent = {
  navbar: {
    items: {
      type: "link" | "dropdown";
      label: string;
      href?: string;
      items?: { label: string; href: string; children?: { label: string; href: string }[] }[];
    }[];
    socials: { platform: "instagram" | "facebook" | "youtube"; href: string }[];
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
};

export type HomeContent = {
  hero: {
    imageSrc: string;
    alt: string;
    logos: { src: string; alt: string; wrapperClassName?: string; className?: string }[];
  };
  search: {
    title: string;
    tagline: string;
    description?: string;
    placeholder: string;
    buttonLabel: string;
    categoryLabel: string;
    categories: { value: string; label: string }[];
    socials: { platform: "facebook" | "instagram" | "youtube"; href: string }[];
  };
  featuredCollections: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    items: { title: string; description: string; href: string; cover: string }[];
    footnote: string;
  };
  personalTimeline: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string; href: string }[];
    aside: {
      label: string;
      name: string;
      role: string;
      avatar: string;
      highlights: string[];
    };
    footnote: string;
  };
  journals: {
    eyebrow: string;
    title: string;
    description: string;
    cta: { label: string; href: string };
    filters: string[];
    items: { title: string; date: string; decade: string; description: string; href: string; cover: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    cta: { label: string; href: string };
    people: {
      name: string;
      role: string;
      bio: string;
      photo: string;
      tags: string[];
      href: string;
      email: string;
      linkedin: string;
    }[];
  };
  access: {
    eyebrow: string;
    title: string;
    description: string;
    filters: { key: string; label: string }[];
    items: { title: string; description: string; href: string; tags: string[] }[];
  };
  politics: PoliticsContent;
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    pills: string[];
    image: string;
  };
  toc: { href: string; label: string }[];
  escopo: {
    subtitle: string;
    title: string;
    paragraphs: string[];
    tiposDocumentais: string[];
    publicos: string[];
  };
  metodologia: {
    subtitle: string;
    title: string;
    paragraphs: string[];
    boasPraticas: string[];
    tip: string;
  };
  cities: {
    id: string;
    name: string;
    cover: string;
    stats: { label: string; value: string }[];
    paragraphs: string[];
  }[];
  acesso: {
    subtitle: string;
    title: string;
    paragraphs: string[];
    comoCitar: string;
    solicitacoes: string[];
  };
  guia: {
    subtitle: string;
    title: string;
    tips: { title: string; text: string }[];
  };
  governanca: {
    subtitle: string;
    title: string;
    paragraphs: string[];
    frentes: string[];
    parcerias: string;
  };
  faq: { q: string; a: string }[];
  contato: {
    subtitle: string;
    title: string;
    text: string;
    links: { label: string; href: string; text?: string }[];
    asideLinks: { label: string; href: string }[];
  };
};

export type PoliticsContent = {
  eyebrow: string;
  title: string;
  description: string;
  featured: { title: string; description: string; href: string; cover: string; date: string };
  axes: { key: string; label: string }[];
  events: { title: string; date: string; summary: string; href: string; axis: string[] }[];
  notes: string[];
  methodologyLink: { label: string; href: string };
  searchPlaceholder: string;
};

export type SiteContent = {
  home: HomeContent;
  about: AboutContent;
  global: GlobalContent;
  politics: PoliticsContent;
};
