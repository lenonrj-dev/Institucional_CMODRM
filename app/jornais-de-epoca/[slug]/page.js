// app/jornais-de-epoca/[slug]/page.js
import EditionReader from "./reader/EditionReader";

async function getEdition(slug) {
  // Quando ligar sua API real, troque esta URL:
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jornais/${slug}`, {
    // para SSR revalidado, adicione: next: { revalidate: 60 }
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await getEdition(params.slug);
  const title = data?.title ? `${data.title} — Leitura` : "Leitura — Jornal de Época";
  const description = data?.summary || "Leitura vertical de edição histórica digitalizada.";
  return {
    title,
    description,
    alternates: { canonical: `/jornais-de-epoca/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `/jornais-de-epoca/${params.slug}`,
      images: data?.cover ? [{ url: data.cover }] : [],
    },
  };
}

export default async function Page({ params }) {
  const data = await getEdition(params.slug);

  // mock de fallback para dev
  const edition = data ?? {
    slug: params.slug,
    title: "O Operário — 12/05/1913",
    date: "1913-05-12",
    number: "Edição 42",
    summary:
      "Edição dedicada à organização de base e às primeiras pautas salariais.",
    cover: "/file.svg",
    pdf: "#",
    pages: Array.from({ length: 12 }).map((_, i) => ({
      index: i + 1,
      image: "/hero.png", // troque para suas imagens digitalizadas
      caption: `Página ${i + 1}`,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: edition.title,
    datePublished: edition.date,
    isPartOf: { "@type": "Periodical", name: "Jornais de Época — Banco de Memória" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EditionReader edition={edition} />
    </>
  );
}
