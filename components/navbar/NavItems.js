// components/navbar/NavItems.js
// Rotas alinhadas ao projeto existente. Mantém navegação enxuta e sem links quebrados.

export const navItems = [
  { type: "link", label: "Início", href: "/" },
  { type: "link", label: "Diretoria", href: "/diretoria" },

  {
    type: "dropdown",
    label: "Centro de Referência",
    items: [
      { label: "Visão geral", href: "/acervo" },
      { label: "Acervo Fotográfico", href: "/acervo/fotos" },
      { label: "Documentos", href: "/acervo/documentos" },
      { label: "Boletins", href: "/acervo/boletins" },
      { label: "Entrevistas", href: "/acervo/entrevistas" },
      { label: "Cartazes", href: "/acervo/cartazes" },
      { label: "Produção Bibliográfica", href: "/producao-bibliografica" },
      { label: "Acervos Pessoais", href: "/acervo-pessoal/rubem-machado" },
      { label: "Jornais de Época", href: "/jornais-de-epoca" },
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
