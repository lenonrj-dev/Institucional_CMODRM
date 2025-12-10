import type { GlobalContent } from "../../../../lib/content-types";

export const globalContent: GlobalContent = {
  navbar: {
    items: [
      { type: "link", label: "Início", href: "/" },
      { type: "link", label: "Diretoria", href: "/diretoria" },
      { type: "link", label: "Sobre", href: "/sobre" },
      {
        type: "dropdown",
        label: "Acervo",
        items: [
          { label: "Visão geral", href: "/acervo" },
          {
            label: "Volta Redonda",
            href: "/acervo/volta-redonda",
            children: [
              { label: "Documentos", href: "/acervo/volta-redonda/documentos" },
              { label: "Depoimentos", href: "/acervo/volta-redonda/depoimentos" },
              { label: "Referência bibliográfica", href: "/acervo/volta-redonda/referencia-bibliografica" },
              { label: "Jornais de época", href: "/acervo/volta-redonda/jornais-de-epoca" },
              { label: "Acervo fotográfico", href: "/acervo/volta-redonda/acervo-fotografico" },
            ],
          },
          {
            label: "Barra Mansa",
            href: "/acervo/barra-mansa",
            children: [
              { label: "Documentos", href: "/acervo/barra-mansa/documentos" },
              { label: "Depoimentos", href: "/acervo/barra-mansa/depoimentos" },
              { label: "Referência bibliográfica", href: "/acervo/barra-mansa/referencia-bibliografica" },
              { label: "Jornais de época", href: "/acervo/barra-mansa/jornais-de-epoca" },
              { label: "Acervo fotográfico", href: "/acervo/barra-mansa/acervo-fotografico" },
            ],
          },
          {
            label: "Fundos",
            href: "/acervo/fundos",
            children: [
              { label: "Construção Civil", href: "/acervo/fundos/const-civil" },
              { label: "Metalúrgico", href: "/acervo/fundos/metalurgico" },
              { label: "Movimentos Populares", href: "/acervo/fundos/mov-operario" },
              { label: "Dom Waldyr", href: "/acervo/fundos/dom-waldyr" },
            ],
          },
        ],
      },
      {
        type: "dropdown",
        label: "Institucional",
        items: [
          { label: "Política Nacional", href: "/politica-nacional" },
          { label: "Equipe Técnica", href: "/equipe-tecnica" },
          { label: "Acesso à Informação", href: "/acesso-a-informacao" },
          { label: "Contato", href: "/contato" },
        ],
      },
    ],
    socials: [
      { platform: "instagram", href: "https://instagram.com" },
      { platform: "facebook", href: "https://facebook.com" },
      { platform: "youtube", href: "https://youtube.com" },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Sintracon. Todos os direitos reservados.`,
    links: [
      { label: "Privacidade", href: "/transparencia/privacidade" },
      { label: "Termos", href: "/transparencia/politica" },
      { label: "Contato", href: "/contato" },
    ],
  },
};
