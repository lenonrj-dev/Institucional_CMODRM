// components/navbar/NavItems.js
// Rotas alinhadas ao projeto existente; evita links quebrados.

export const navItems = [
  { type: "link", label: "Inicio", href: "/" },
  { type: "link", label: "Diretoria", href: "/diretoria" },
  { type: "link", label: "Sobre", href: "/sobre" },

  {
    type: "dropdown",
    label: "Centro de Referencia",
    items: [
      { label: "Visao geral", href: "/acervo" },
      { label: "Acervo Fotografico", href: "/acervo/fotos" },
      { label: "Documentos", href: "/acervo/documentos" },
      { label: "Boletins", href: "/acervo/boletins" },
      { label: "Entrevistas", href: "/acervo/entrevistas" },
      { label: "Cartazes", href: "/acervo/cartazes" },
      { label: "Producao Bibliografica", href: "/producao-bibliografica" },
      { label: "Acervos Pessoais", href: "/acervo-pessoal/rubem-machado" },
      { label: "Jornais de epoca", href: "/jornais-de-epoca" },
    ],
  },

  {
    type: "dropdown",
    label: "Institucional",
    items: [
      { label: "Politica Nacional", href: "/politica-nacional" },
      { label: "Equipe Tecnica", href: "/equipe-tecnica" },
      { label: "Acesso a Informacao", href: "/acesso-a-informacao" },
      { label: "Contato", href: "/contato" },
    ],
  },
];
