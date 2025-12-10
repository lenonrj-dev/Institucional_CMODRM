import type { AboutContent } from "../../../../lib/content-types";

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: "Centro de Memória Operária Digitalizada",
    title: "Sobre o Projeto Rubem Machado",
    description:
      "Um repositório público para documentação, imagens, jornais e história oral do trabalho na região do Médio Paraíba Fluminense.",
    pills: ["Volta Redonda", "Barra Mansa", "Resende", "VRM e cidades vizinhas"],
    image: "https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763052010/1_de_janeiro_de_1959_2_jkdm71.png",
  },
  toc: [
    { href: "#escopo", label: "Escopo & Objetivos" },
    { href: "#metodologia", label: "Metodologia e Padrões" },
    { href: "#volta-redonda", label: "Cidade: Volta Redonda" },
    { href: "#barra-mansa", label: "Cidade: Barra Mansa" },
    { href: "#resende", label: "Cidade: Resende" },
    { href: "#acesso", label: "Acesso, Uso e Direitos" },
    { href: "#pesquisa", label: "Guia do Pesquisador" },
    { href: "#governanca", label: "Governança & Parcerias" },
    { href: "#faq", label: "Perguntas Frequentes" },
    { href: "#contato", label: "Contato" },
  ],
  escopo: {
    subtitle: "Missão do projeto",
    title: "Escopo e objetivos",
    paragraphs: [
      "O Centro de Memória Operária Digitalizada Rubem Machado (CMODRM) preserva e disponibiliza acervos relacionados ao mundo do trabalho, às organizações sindicais e à vida operária da região de Volta Redonda e entorno. O projeto integra documentos impressos, fotografias, jornais de época, cartazes, entrevistas e publicações, descrevendo-os com metadados consistentes e oferecendo leitura acessível em dispositivos variados.",
      "Nossos objetivos incluem: (1) preservar materiais em risco de degradação; (2) democratizar o acesso público; (3) apoiar ensino, pesquisa e extensão; (4) fortalecer a memória social do trabalho; (5) fomentar novas investigações históricas a partir de fontes primárias.",
    ],
    tiposDocumentais: [
      "Jornais de época e boletins",
      "Fotografias e negativos",
      "Cartazes, panfletos e ephemera",
      "Documentos administrativos",
      "História oral (áudio, transcrições)",
    ],
    publicos: [
      "Pesquisadores/as e estudantes",
      "Escolas e projetos educativos",
      "Jornalistas e produtores culturais",
      "Comunidade local e sindical",
    ],
  },
  metodologia: {
    subtitle: "Como colecionamos e descrevemos",
    title: "Metodologia e padrões",
    paragraphs: [
      "A digitalização segue parâmetros comuns de preservação (ex.: captura em alta resolução e arquivo-matriz sem perdas) e acesso (derivados otimizados para leitura em tela). A descrição prioriza campos inspirados em esquemas amplamente adotados (como Dublin Core), com normalização de nomes, datas e locais.",
      "Cada item recebe um identificador estável (slug), é associado a uma coleção (boletins, fotos, documentos, entrevistas, cartazes) e contém resumo, palavras-chave e, quando pertinente, indicação de direitos.",
    ],
    boasPraticas: [
      "Arquivo-matriz preservado e arquivos de acesso otimizados",
      "Metadados consistentes e vocabulário controlado",
      "Registro de proveniência e contexto de produção",
      "Citações e créditos padronizados",
    ],
    tip: "Use Ctrl/Cmd + K (ou a busca global do site) para localizar termos, pessoas e datas. Nas páginas de leitura, utilize o índice e o modo de visualização mais confortável.",
  },
  cities: [
    {
      id: "volta-redonda",
      name: "Volta Redonda",
      cover: "https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763052010/1_de_janeiro_de_1959_2_jkdm71.png",
      stats: [
        { label: "Itens descritos", value: "480+" },
        { label: "Séries", value: "12" },
        { label: "Períodos", value: "1930—1990" },
      ],
      paragraphs: [
        "Cidade-sede do projeto e referência nacional no mundo do trabalho, sobretudo pela indústria do aço. O acervo reúne jornais, fotografias e documentação associada a greves, assembleias e cotidiano fabril.",
        "As descrições priorizam datas, locais, entidades de classe e termos de assunto (ex.: greves, negociações, segurança do trabalho), facilitando a pesquisa temática e temporal.",
      ],
    },
    {
      id: "barra-mansa",
      name: "Barra Mansa",
      cover: "https://res.cloudinary.com/dwf2uc6ot/image/upload/v1763127052/Design_sem_nome_19_kiwxzz.svg",
      stats: [
        { label: "Itens descritos", value: "160+" },
        { label: "Séries", value: "6" },
        { label: "Períodos", value: "1940—1980" },
      ],
      paragraphs: [
        "Município vizinho histórico de circulação de trabalhadores e impressos sindicais. O acervo destaca a organização por locais de trabalho e a articulação regional com Volta Redonda.",
      ],
    },
    {
      id: "resende",
      name: "Resende",
      cover: "https://res.cloudinary.com/diwvlsgsw/image/upload/v1762965931/images_2_wysfnt.jpg",
      stats: [
        { label: "Itens descritos", value: "90+" },
        { label: "Séries", value: "4" },
        { label: "Períodos", value: "1950—1980" },
      ],
      paragraphs: [
        "Composição industrial e circulação regional de impressos de base. Fontes iconográficas e de história oral complementam o mapeamento documental.",
      ],
    },
  ],
  acesso: {
    subtitle: "Orientações e políticas",
    title: "Acesso, uso e direitos",
    paragraphs: [
      "O acesso é público e gratuito. Alguns itens podem ter restrições de uso (direitos autorais, imagem ou privacidade). Nesses casos, a página do item indica a licença e as condições de reprodução. Respeite sempre as credenciais e cite a fonte.",
      "Para materiais que envolvam dados pessoais, aplicamos medidas alinhadas à LGPD, com avaliação de risco, minimização de dados sensíveis e disponibilização de versões editadas quando necessário.",
      "Reproduções para fins acadêmicos e jornalísticos são bem-vindas, desde que acompanhadas de citação completa. Para usos comerciais, consulte previamente a coordenação do projeto.",
    ],
    comoCitar:
      "Modelo: Nome do item. Coleção, entidade custodiadora. Cidade, data. Centro de Memória Operária Digitalizada Rubem Machado — Sintracon. URL.",
    solicitacoes: [
      "Retirada/anonimização de dados sensíveis",
      "Liberação de reprodução em alta resolução",
      "Depósito de novos conjuntos documentais",
    ],
  },
  guia: {
    subtitle: "Dicas práticas",
    title: "Guia do pesquisador",
    tips: [
      {
        title: "Comece pelo sumário do Acervo",
        text: "Use as páginas de coleção (Boletins, Fotos, Documentos, Entrevistas, Cartazes) para ter visão geral e refinar sua busca.",
      },
      {
        title: "Aproveite filtros e busca",
        text: "Filtre por década, tema e tags; a busca localiza termos no título e no resumo dos itens.",
      },
      {
        title: "Navegação em leitura",
        text: "Nos jornais de época, utilize o índice e ative o modo de visualização mais confortável (ampliado ou normal).",
      },
      {
        title: "Cite corretamente",
        text: "Registre título, coleção, local, data e a referência ao Centro de Memória; inclua a URL do item.",
      },
    ],
  },
  governanca: {
    subtitle: "Equipe, processos e rede de apoio",
    title: "Governança e parcerias",
    paragraphs: [
      "A governança envolve coordenação geral, curadoria técnica, digitalização, descrição, desenvolvimento e atendimento ao público. Parcerias institucionais e comunitárias viabilizam a identificação de fundos, a conservação física e a difusão do acervo.",
      "O projeto prevê relatórios de transparência, calendário de atualizações e canais para doações de acervos e apoio financeiro.",
    ],
    frentes: ["Curadoria", "Digitalização", "Descrição", "TI/Desenvolvimento", "Jurídico", "Educação"],
    parcerias: "Sindicatos, universidades, arquivos públicos, bibliotecas, centros de documentação e iniciativas comunitárias.",
  },
  faq: [
    {
      q: "Posso enviar documentos para integrar o acervo?",
      a: "Sim. Entre em contato pela página de Contato para iniciar o processo de avaliação e doação/deposição.",
    },
    {
      q: "Há custos para acessar os materiais?",
      a: "Não. O acesso é público. Apenas reproduções especiais em alta resolução ou usos comerciais podem demandar autorização adicional.",
    },
    {
      q: "Posso usar imagens em trabalhos acadêmicos?",
      a: "Sim, com citação apropriada e observância das condições indicadas no item (licenças e direitos).",
    },
  ],
  contato: {
    subtitle: "Atendimento e suporte",
    title: "Fale com a equipe",
    text:
      "Para dúvidas, solicitações de reprodução e propostas de parceria, acesse a página Contato. Para pedidos de informação institucional, consulte também Acesso à Informação.",
    links: [
      { label: "Contato", href: "/contato" },
      { label: "Acesso à Informação", href: "/acesso-a-informacao" },
    ],
    asideLinks: [
      { label: "Visão geral do Acervo", href: "/acervo" },
      { label: "Jornais de Época", href: "/jornais-de-epoca" },
      { label: "Produção Bibliográfica", href: "/producao-bibliografica" },
    ],
  },
};
