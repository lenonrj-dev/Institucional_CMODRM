import EditionReader from "./reader/EditionReader";

const FALLBACK_IMG = "https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg";

async function getEdition(slug) {
  // Quando ligar sua API real, troque esta URL:
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jornais/${slug}`, {
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
      images: data?.cover ? [{ url: data.cover }] : [{ url: FALLBACK_IMG }],
    },
  };
}

export default async function Page({ params }) {
  const data = await getEdition(params.slug);

  const edition = data ?? {
    slug: params.slug,
    title: (params.slug || "Edição")
      .replaceAll("-", " ")
      .replace(/\b\w/g, (m) => m.toUpperCase()),
    date: "—",
    number: "—",
    summary: "Leitura provisória com imagem em alta resolução.",
    cover: FALLBACK_IMG,
    pdf: "#",
    pages: [
      { index: 1, image: FALLBACK_IMG, caption: "Página 1" },
    ],
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
