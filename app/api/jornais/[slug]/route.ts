// app/api/jornais/[slug]/route.ts
import { NextRequest } from "next/server";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  // MOCK: mapa simples (substitua por DB, CMS, S3, etc.)
  const map: Record<
    string,
    {
      slug: string;
      title: string;
      date: string;
      number: string;
      summary: string;
      cover: string;
      pdf: string;
      pages: Array<{ index: number; image: string; caption: string }>;
    }
  > = {
    "o-operario-1913-05-12": {
      slug,
      title: "O Operário – 12/05/1913",
      date: "1913-05-12",
      number: "Edição 42",
      summary: "Edição dedicada à organização de base e às primeiras pautas salariais.",
      cover: "/file.svg",
      pdf: "#",
      pages: Array.from({ length: 10 }).map((_, i) => ({
        index: i + 1,
        image: "/hero.png",
        caption: `Página ${i + 1}`,
      })),
    },
  };

  const data = map[slug];
  if (!data) {
    return new Response(JSON.stringify({ error: "not_found" }), { status: 404 });
  }
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
