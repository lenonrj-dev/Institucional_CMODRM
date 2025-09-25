// components/navbar/NavItems.js
export const navItems = [
  { type: "link", label: "Início", href: "/" },

  {
    type: "dropdown",
    label: "Acervo",
    items: [
      { label: "Visão geral", href: "/acervo" },
      { label: "Jornais de Época", href: "/jornais-de-epoca" },
      { label: "Produção Bibliográfica", href: "/producao-bibliografica" },
      { label: "Acervo Pessoal", href: "/acervo/pessoal" },
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
];
