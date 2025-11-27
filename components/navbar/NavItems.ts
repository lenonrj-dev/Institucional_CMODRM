// components/navbar/NavItems.ts
// Rotas alinhadas ao projeto existente; evita links quebrados.
//{ label: "Visao geral", href: "/acervo" },
//{ label: "Acervo Fotografico", href: "/acervo/fotos" },
//{ label: "Documentos", href: "/acervo/documentos" },
//{ label: "Boletins", href: "/acervo/boletins" },
//{ label: "Entrevistas", href: "/acervo/entrevistas" },
//{ label: "Cartazes", href: "/acervo/cartazes" },
//{ label: "Producao Bibliografica", href: "/producao-bibliografica" },
//{ label: "Acervos Pessoais", href: "/acervo-pessoal/rubem-machado" },
//{ label: "Jornais de epoca", href: "/jornais-de-epoca" },

type NavLink = {
  type: "link";
  label: string;
  href: string;
};

export type NavLeaf = {
  label: string;
  href: string;
};

export type NavSubItem = NavLeaf & {
  children?: NavLeaf[];
};

type NavDropdown = {
  type: "dropdown";
  label: string;
  items: NavSubItem[];
};

export type NavItem = NavLink | NavDropdown;

export const navItems: NavItem[] = [
  { type: "link", label: "Inicio", href: "/" },
  { type: "link", label: "Diretoria", href: "/diretoria" },
  { type: "link", label: "Sobre", href: "/sobre" },

  {
    type: "dropdown",
    label: "Acervo",
    items: [
      { label: "Visao geral", href: "/acervo" },
      {
        label: "Volta Redonda",
        href: "/acervo/volta-redonda",
        children: [
          { label: "Documentos", href: "/acervo/volta-redonda/documentos" },
          { label: "Depoimentos", href: "/acervo/volta-redonda/depoimentos" },
          { label: "Referência Bibliográfica", href: "/acervo/volta-redonda/referencia-bibliografica" },
          { label: "Jornais de Época", href: "/acervo/volta-redonda/jornais-de-epoca" },
          { label: "Acervo Fotográfico", href: "/acervo/volta-redonda/acervo-fotografico" },
        ],
      },
      {
        label: "Barra Mansa",
        href: "/acervo/barra-mansa",
        children: [
          { label: "Documentos", href: "/acervo/barra-mansa/documentos" },
          { label: "Depoimentos", href: "/acervo/barra-mansa/depoimentos" },
          { label: "Referência Bibliográfica", href: "/acervo/barra-mansa/referencia-bibliografica" },
          { label: "Jornais de Época", href: "/acervo/barra-mansa/jornais-de-epoca" },
          { label: "Acervo Fotográfico", href: "/acervo/barra-mansa/acervo-fotografico" },
        ],
      },
      {
        label: "Fundos",
        href: "/acervo/fundos",
        children: [
          { label: "Const. Civil", href: "/acervo/fundos/const-civil" },
          { label: "Metalúrgico", href: "/acervo/fundos/metalurgico" },
          { label: "Mov. Operário", href: "/acervo/fundos/mov-operario" },
          { label: "Dom Waldyr", href: "/acervo/fundos/dom-waldyr" },
        ],
      },
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
