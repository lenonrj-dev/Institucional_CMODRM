import EditionReader from "./reader/EditionReader";

const FALLBACK_IMG = "https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg";

async function getEdition(slug: string) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  const res = await fetch(new URL(`/api/jornais/${slug}`, base).toString(), {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEdition(slug);
  const title = data?.title ? `${data.title} - Leitura` : "Leitura - Jornal de epoca";
  const description = data?.summary || "Leitura vertical de edicao historica digitalizada.";
  return {
    title,
    description,
    alternates: { canonical: `/jornais-de-epoca/${slug}` },
    openGraph: {
      title,
      description,
      url: `/jornais-de-epoca/${slug}`,
      images: data?.cover ? [{ url: data.cover }] : [{ url: FALLBACK_IMG }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEdition(slug);

  const edition =
    data ??
    {
      slug,
      title: (slug || "Edicao")
        .replaceAll("-", " ")
        .replace(/\b\w/g, (m) => m.toUpperCase()),
      date: "s/d",
      number: "s/n",
      summary: "Leitura provisoria com imagem em alta resolucao.",
      cover: FALLBACK_IMG,
      pdf: "#",
      pages: [{ index: 1, image: FALLBACK_IMG, caption: "Pagina 1" }],
    };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: edition.title,
    datePublished: edition.date,
    isPartOf: { "@type": "Periodical", name: "Jornais de epoca - Banco de Memoria" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EditionReader edition={edition} />
    </>
  );
}
