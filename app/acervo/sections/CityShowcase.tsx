import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Info, Book, Newspaper, ImageIcon } from "lucide-react";

type CitySection = {
  title: string;
  description: string;
  href: string;
  thumb: string;
};

type CityCard = {
  name: string;
  description: string;
  coverage: string;
  focus: string[];
  image: string;
  sections: CitySection[];
};

const cities: CityCard[] = [
  {
    name: "Volta Redonda",
    description:
      "Eixo industrial com greves históricas, organização por seção e produção documental intensa ligada à construção civil e metalurgia.",
    coverage: "Anos 1940–2000 | Movimentos paredistas e cotidiano fabril",
    focus: ["Documentação sindical", "História oral", "Clippings e bibliografia", "Fotografia de mobilização"],
    image: "/hero.png",
    sections: [
      {
        title: "Documentos",
        description: "Atas, ofícios e relatórios das bases em VR.",
        href: "/acervo/volta-redonda/documentos",
        thumb: "/file.svg",
      },
      {
        title: "Depoimentos",
        description: "História oral com lideranças e chão de fábrica.",
        href: "/acervo/volta-redonda/depoimentos",
        thumb: "/hero.png",
      },
      {
        title: "Referência Bibliográfica",
        description: "Clippings, livros e artigos sobre VR.",
        href: "/acervo/volta-redonda/referencia-bibliografica",
        thumb: "/globe.svg",
      },
      {
        title: "Jornais de Época",
        description: "Capas e edições digitalizadas.",
        href: "/acervo/volta-redonda/jornais-de-epoca",
        thumb: "/window.svg",
      },
      {
        title: "Acervo Fotográfico",
        description: "Mobilização e cotidiano fabril em imagens.",
        href: "/acervo/volta-redonda/acervo-fotografico",
        thumb: "/hero.png",
      },
    ],
  },
  {
    name: "Barra Mansa",
    description:
      "Redes regionais de apoio, organização por bairros e memória operária conectada ao Vale do Paraíba.",
    coverage: "Anos 1930–2000 | Bases locais, assembleias e cultura sindical",
    focus: ["Atas e ofícios", "Relatos de trabalhadores", "Recortes de imprensa", "Fotografia do território"],
    image: "/CUT.png",
    sections: [
      {
        title: "Documentos",
        description: "Ofícios, atas e normativas locais.",
        href: "/acervo/barra-mansa/documentos",
        thumb: "/file.svg",
      },
      {
        title: "Depoimentos",
        description: "Vozes de trabalhadores e dirigentes.",
        href: "/acervo/barra-mansa/depoimentos",
        thumb: "/hero.png",
      },
      {
        title: "Referência Bibliográfica",
        description: "Bibliografia e catálogos sobre BM.",
        href: "/acervo/barra-mansa/referencia-bibliografica",
        thumb: "/globe.svg",
      },
      {
        title: "Jornais de Época",
        description: "Recortes e edições históricas.",
        href: "/acervo/barra-mansa/jornais-de-epoca",
        thumb: "/window.svg",
      },
      {
        title: "Acervo Fotográfico",
        description: "Imagens de mobilização e cotidiano.",
        href: "/acervo/barra-mansa/acervo-fotografico",
        thumb: "/hero.png",
      },
    ],
  },
  {
    name: "Fundos Temáticos",
    description:
      "Coleções organizadas por fundos institucionais e temáticos: construção civil, metalurgia, movimento operário e Dom Waldyr.",
    coverage: "Séries diversas | Documentos, imprensa, iconografia",
    focus: ["Const. Civil", "Metalúrgico", "Mov. Populares", "Dom Waldyr"],
    image: "/hero.png",
    sections: [
      {
        title: "Const. Civil",
        description: "Atas, memoriais e registros da categoria.",
        href: "/acervo/fundos/const-civil",
        thumb: "/file.svg",
      },
      {
        title: "Metalúrgico",
        description: "Documentação e mídia sindical da metalurgia.",
        href: "/acervo/fundos/metalurgico",
        thumb: "/file.svg",
      },
      {
        title: "Mov. Populares",
        description: "Cartazes, jornais e narrativas do movimento.",
        href: "/acervo/fundos/mov-operario",
        thumb: "/window.svg",
      },
      {
        title: "Dom Waldyr",
        description: "Acervo relacionado à atuação de Dom Waldyr.",
        href: "/acervo/fundos/dom-waldyr",
        thumb: "/globe.svg",
      },
    ],
  },
];

function CityMeta({ city }: { city: CityCard }) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60">
        <MapPin className="h-4 w-4" />
        {city.name}
      </div>
      <p className="text-sm text-white/75">{city.description}</p>
      <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
        <Info className="h-3.5 w-3.5" />
        {city.coverage}
      </div>
      <div className="flex flex-wrap gap-2">
        {city.focus.map((tag) => (
          <span key={tag} className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-white/75">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ section }: { section: CitySection }) {
  return (
    <Link
      href={section.href}
      className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <Image src={section.thumb} alt={section.title} fill className="object-contain p-2" sizes="48px" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{section.title}</p>
          <p className="text-xs text-white/65">{section.description}</p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-white/70 group-hover:text-white">
        Abrir <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export default function CityShowcase() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
            <Book className="h-4 w-4" />
            Acervo por cidade e fundos
          </div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Visão completa dos núcleos disponíveis
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Neste momento o acervo público reúne duas cidades (Volta Redonda e Barra Mansa) e fundos temáticos.
            Cada bloco abaixo detalha o recorte, cobertura e pré-visualizações das sessões principais.
          </p>
        </div>

        <div className="space-y-6">
          {cities.map((city) => (
            <article
              key={city.name}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.8)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.1fr_1.4fr]">
                <div className="relative h-60 w-full overflow-hidden lg:h-full">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 40vw, 100vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
                  <CityMeta city={city} />
                  <div className="grid gap-3 md:grid-cols-2">
                    {city.sections.map((section) => (
                      <SectionCard key={section.href} section={section} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
                      <Newspaper className="h-3.5 w-3.5" /> Jornais
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
                      <ImageIcon className="h-3.5 w-3.5" /> Fotos
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
                      <Book className="h-3.5 w-3.5" /> Documentos & Bibliografia
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
