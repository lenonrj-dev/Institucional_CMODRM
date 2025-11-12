// app/acervo-pessoal/[slug]/page.js

import PersonArchive from "./sections/PersonArchive";

// —————————————————————————————————————————————
// MOCK rápido: troque pelos dados reais ou busque de uma API/DB
const PEOPLE = {
  "rubem-machado": {
    name: "Rubem Machado",
    occupation: "Pesquisador e sindicalista",
    summary:
      "Trajetória dedicada à organização dos trabalhadores e à preservação da memória do trabalho. Produções em jornais, relatórios, entrevistas e fotografia.",
    portrait: "/hero.png",
    sameAs: ["https://example.com/rubem-machado"],
  },
};

// —————————————————————————————————————————————
// SEO dinâmico
export async function generateMetadata({ params }) {
  const person = PEOPLE[params.slug] || {
    name: params.slug.replace(/-/g, " "),
    summary: "Acervo pessoal com publicações, documentos e registros.",
  };

  const title = `${person.name} — Acervo Pessoal | Banco de Memória`;
  const description =
    person.summary ||
    "Navegue por publicações, documentos, imagens e registros deste acervo pessoal.";

  return {
    title,
    description,
    alternates: { canonical: `/acervo-pessoal/${params.slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/acervo-pessoal/${params.slug}`,
      siteName: "Sintracon",
      images: person.portrait ? [{ url: person.portrait }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }) {
  const person =
    PEOPLE[params.slug] ||
    PEOPLE["rubem-machado"]; // fallback gentil (troque como preferir)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: person.name,
        image: person.portrait || undefined,
        description: person.summary,
        sameAs: person.sameAs || [],
      },
      {
        "@type": "CollectionPage",
        name: `${person.name} — Acervo Pessoal`,
        about: { "@type": "Person", name: person.name },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PersonArchive person={person} />
    </>
  );
}
