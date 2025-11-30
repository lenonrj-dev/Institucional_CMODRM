import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  ContentContainer,
  DepoimentoCard,
  DocumentCard,
  HeroBanner,
  PhotoMasonryGrid,
  ReferenciaCard,
  Section,
  SectionTitle,
} from "../../_components/ui";

const heroImage =
  "https://res.cloudinary.com/dc7u5spia/image/upload/v1764469350/Pres%C3%A9pio_Igreja_Santa_Cec%C3%ADlia_-_dezembro_de_1968_nwjnrn.jpg";

const documents = [
  {
    title: "Carta Pastoral sobre Justiça Social",
    summary:
      "Enfatiza a defesa dos direitos trabalhistas, a mediação de conflitos na CSN e o apelo por dignidade nas comunidades operárias.",
    date: "1978-06-12",
    location: "Volta Redonda",
    tags: ["Justiça social", "Greves", "Negociação"],
  },
  {
    title: "Relatório das Visitas às Vilas Operárias",
    summary:
      "Registros das condições de moradia, saúde e educação recolhidos durante as visitas pastorais em bairros fabris.",
    date: "1981-03-04",
    location: "Barra Mansa",
    tags: ["Assistência", "Moradia", "Comunidade"],
  },
  {
    title: "Notas sobre Mediação nos Acordos de 1985",
    summary:
      "Síntese das reuniões entre sindicato, empresa e Diocese para mitigar repressões e garantir liberdade de expressão.",
    date: "1985-09-18",
    location: "Volta Redonda",
    tags: ["Mediação", "Direitos humanos"],
  },
];

const depoimentos = [
  {
    author: "Pe. Antônio Ribeiro",
    role: "Assessoria Pastoral",
    excerpt:
      "“Dom Waldyr caminhava conosco nas portarias, escutando cada grupo. Ele insistia que fé e justiça eram inseparáveis das pautas salariais.”",
    date: "1984",
    theme: "Mediação e escuta",
    avatar: "/hero.png",
  },
  {
    author: "Lúcia Fernandes",
    role: "Agente de Pastoral Operária",
    excerpt:
      "“Nos círculos bíblicos, ele nos pedia para registrar memórias. Esses cadernos hoje são parte do acervo e contam o cotidiano invisível.”",
    date: "1982",
    theme: "Memória e registros",
    avatar: "/hero.png",
  },
];

const referencias = [
  {
    title: "Dom Waldyr e a Pastoral Operária",
    authors: "Moura, C.; Ferreira, J.",
    year: "1998",
    type: "Livro" as const,
    source: "Editora Arquidiocesana",
    citation: "Moura, C.; Ferreira, J. Dom Waldyr e a Pastoral Operária. Editora Arquidiocesana, 1998.",
  },
  {
    title: "Mediação de Conflitos Trabalhistas na Diocese de Barra do Piraí-Volta Redonda",
    authors: "Almeida, P.; Silva, R.",
    year: "2004",
    type: "Artigo" as const,
    source: "Revista Estudos Sociais, v.12",
    citation:
      "Almeida, P.; Silva, R. Mediação de Conflitos Trabalhistas na Diocese de Barra do Piraí-Volta Redonda. Estudos Sociais, 12, 2004.",
  },
];

const jornais = [
  {
    title: "Boletim Solidário",
    summary: "Publicação da Diocese com notas de apoio às greves e convites para assembleias de base.",
    date: "1979-04-10",
    location: "Volta Redonda",
    tags: ["Solidariedade", "Greves"],
  },
  {
    title: "Circular Pastoral: Direitos Humanos",
    summary: "Edição especial destacando denúncias e chamadas para vigília em defesa dos perseguidos.",
    date: "1983-11-22",
    location: "Barra Mansa",
    tags: ["Direitos humanos", "Pastoral"],
  },
];

const fotos = [
  {
    src: heroImage,
    alt: "Dom Waldyr em assembleia com trabalhadores",
    caption: "Mediação durante assembleia em 1983",
    year: "1983",
    location: "Volta Redonda",
    description: "Dom Waldyr acompanha assembleia e media pautas trabalhistas ao lado de lideranças locais.",
  },
  {
    src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    alt: "Reunião comunitária na paróquia",
    caption: "Círculo de leitura e organização de cadernos de memória",
    year: "1981",
    location: "Barra Mansa",
    description: "Grupo de agentes discutindo relatos para organizar o acervo e registrar memórias comunitárias.",
  },
  {
    src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    alt: "Visita pastoral em vila operária",
    caption: "Registro das condições de moradia e saúde",
    year: "1980",
    location: "Volta Redonda",
    description: "Visita pastoral às vilas operárias para observar condições de moradia e demandas sociais.",
  },
];

export const metadata = {
  title: "Acervo • Fundos Dom Waldyr",
  description:
    "Coleção dedicada à atuação pastoral e mediação social de Dom Waldyr, com documentos, depoimentos, referências, jornais e acervo fotográfico.",
  keywords: [
    "Dom Waldyr",
    "Fundos",
    "Pastoral Operária",
    "Jornais de época",
    "Documentos históricos",
    "Volta Redonda",
    "Barra Mansa",
  ],
};

export default function DomWaldyrFundPage() {
  return (
    <div className="bg-gradient-to-b from-[#0b0c10] via-[#0b0c10] to-[#090909] text-white">
      <ContentContainer>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Acervo", href: "/acervo" },
            { label: "Fundos", href: "/acervo#fundos" },
            { label: "Dom Waldyr" },
          ]}
        />
      </ContentContainer>

      <Section className="pt-4 pb-12">
        <ContentContainer>
          <HeroBanner
            eyebrow="Fundos"
            badge="Dom Waldyr"
            title="Acervo de Dom Waldyr – justiça social e memória operária"
            description="Documentação, relatos e publicações que registram a presença pastoral de Dom Waldyr junto aos trabalhadores de Volta Redonda e Barra Mansa. Um acervo para pesquisa, mediação e inspiração de novas leituras."
            image={heroImage}
            actions={
              <>
                <Link
                  href="#documentos"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                >
                  Ver documentos
                </Link>
                <Link
                  href="#depoimentos"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-black/60"
                >
                  História oral
                </Link>
              </>
            }
          />
        </ContentContainer>
      </Section>

      <Section id="documentos">
        <SectionTitle
          eyebrow="Documentos"
          title="Cartas, relatórios e notas pastorais"
          description="Seleção de peças que mostram a atuação direta de Dom Waldyr em mediação de conflitos, escuta comunitária e defesa de direitos."
          actions={
            <Link
              href="/acervo/documentos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Abrir todos
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc.title} {...doc} href="/acervo/documentos" />
          ))}
        </div>
      </Section>

      <Section id="depoimentos" className="bg-gradient-to-r from-white/5 via-white/0 to-white/5">
        <SectionTitle
          eyebrow="História oral"
          title="Depoimentos e memórias pastorais"
          description="Relatos de agentes, padres e lideranças que conviveram com Dom Waldyr nas portarias, assembleias e círculos de leitura."
          actions={
            <Link
              href="/acervo/entrevistas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Ver entrevistas
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {depoimentos.map((d) => (
            <DepoimentoCard key={d.author} {...d} href="/acervo/entrevistas" />
          ))}
        </div>
      </Section>

      <Section id="referencias">
        <SectionTitle
          eyebrow="Referência bibliográfica"
          title="Obras sobre a atuação de Dom Waldyr"
          description="Bibliografia comentada para aprofundar estudos sobre mediação social, pastoral operária e documentação do período."
          actions={
            <Link
              href="/acervo/referencia-bibliografica"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Acessar referências
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {referencias.map((ref) => (
            <ReferenciaCard key={ref.title} {...ref} />
          ))}
        </div>
      </Section>

      <Section id="jornais">
        <SectionTitle
          eyebrow="Jornais de época"
          title="Publicações solidárias e circulares pastorais"
          description="Edições que registram posicionamentos públicos, apoio aos trabalhadores e alertas de direitos humanos durante os conflitos."
          actions={
            <Link
              href="/acervo/boletins"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Ler boletins
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jornais.map((j) => (
            <DocumentCard key={j.title} {...j} href="/acervo/boletins" />
          ))}
        </div>
      </Section>

      <Section id="acervo-fotografico" className="bg-gradient-to-r from-white/5 via-white/0 to-white/5">
        <SectionTitle
          eyebrow="Acervo fotográfico"
          title="Imagens da presença pastoral"
          description="Pré-visualização de fotografias com metadados básicos para orientar a consulta completa."
          actions={
            <Link
              href="/acervo/fotos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Ver acervo fotográfico
            </Link>
          }
        />
        <PhotoMasonryGrid photos={fotos} />
      </Section>

      <Section className="pt-4 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
            Explore o fundo Dom Waldyr com profundidade
          </h3>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Navegue pelos documentos, relatos, referências e publicações para compreender a trajetória pastoral e seu
            diálogo com os trabalhadores da região.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/acervo/documentos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Documentos
            </Link>
            <Link
              href="/acervo/entrevistas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Depoimentos
            </Link>
            <Link
              href="/acervo/referencia-bibliografica"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Referências
            </Link>
            <Link
              href="/acervo/boletins"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Jornais de época
            </Link>
            <Link
              href="/acervo/fotos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Acervo fotográfico
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
