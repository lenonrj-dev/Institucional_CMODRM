import type { HomeContent } from "../../../../lib/content-types";

// =========================
// HOME – HERO SECTION
// =========================
const homeHero: HomeContent["hero"] = {
  imageSrc:
    "https://res.cloudinary.com/dc7u5spia/image/upload/v1764889980/1_de_janeiro_de_1959_1920_x_1080_px_sbykwi.png",
  alt: "Centro de Memória Operária Digitalizada Rubem Machado",
  logos: [
    {
      src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1764890044/Cut_uevy1s.svg",
      alt: "Logotipo CUT",
      wrapperClassName: "relative h-16 w-16 sm:h-20 sm:w-20",
      className: "object-contain drop-shadow-lg mt-10",
    },
    {
      src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1765284186/Cmodrm_n4bbul.svg",
      alt: "Identidade institucional",
      wrapperClassName: "relative h-14 w-auto sm:h-18 sm:w-auto md:h-20 lg:h-22",
      className: "mt-[-247] object-contain drop-shadow-lg",
    },
    {
      src: "https://res.cloudinary.com/dc7u5spia/image/upload/v1764962454/Design_sem_nome_jzkh9u.svg",
      alt: "Símbolo complementar",
      wrapperClassName: "relative h-16 w-16 sm:h-14 sm:w-14 md:h-16 md:w-30 mt-10",
      className: "object-contain drop-shadow-lg",
    },
  ],
};

// =========================
// HOME – SEARCH BAR SECTION
// =========================
const homeSearch: HomeContent["search"] = {
  title: "Centro de Memória Operária Digitalizada Rubem Machado",
  tagline: "Bem-vindos e bem-vindas ao nosso acervo virtual. Boa pesquisa!",
  description: "Busque por termos, nomes ou datas e siga para o acervo completo.",
  placeholder: "Busque por termos, nomes, datas…",
  buttonLabel: "Pesquisar",
  categoryLabel: "Categoria",
  categories: [
    { value: "all", label: "Todo o conteúdo" },
    { value: "imagens", label: "Imagens" },
    { value: "videos", label: "Vídeos" },
    { value: "documentos", label: "Documentos" },
    { value: "pessoas", label: "Pessoas" },
  ],
  socials: [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "youtube", href: "https://youtube.com" },
  ],
};

// =========================
// HOME – FEATURED COLLECTIONS (SecondSection)
// =========================
const homeFeaturedCollections: HomeContent["featuredCollections"] = {
  eyebrow: "Fundos de Acervo Pessoal",
  title: "Dom Waldyr Calheiros",
  description:
    "Documentação, relatos e publicações que registram a presença pastoral de Dom Waldyr junto aos trabalhadores de Volta Redonda e Barra Mansa. Um acervo para pesquisa, mediação e inspiração de novas leituras.",
  primaryCta: { label: "Ver produção bibliográfica", href: "/producao-bibliografica" },
  secondaryCta: { label: "Sobre o Fundo", href: "/acervo/fundos/dom-waldyr" },
  items: [
    {
      title: "Funcionários da Metalúrgica Barbará (1950)",
      description:
        "Registro histórico dos Trabalhadores Metalúrgicos da Barbará na decada de 1950",
      href: "/producao-bibliografica/ata-1964",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821839/Funcion%C3%A1rios_metal%C3%BArgicos_da_Barbar%C3%A1_vka9kq.jpg",
    },
    {
      title: "Funcionários da Siderurgica de Barra msansa (1950)",
      description:
        "Registro Histórico de Trabalhadores da Siderurgia de Barra Mansa na decada de 1950",
      href: "/producao-bibliografica/boletim-1978",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
    },
    {
      title: "Obelisco em Homenagem aos operários de Barra Mansa (1933)",
      description:
        "Obelisco em Homenagem aos operários de Barra Mansa inaugurado em 1 de Maio de 1933. Fonte: Academia Barramansense de História.",
      href: "/producao-bibliografica/cartaz-1985",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821814/Obelisco_em_Homenagem_aos_oper%C3%A1rios_de_Barra_Mansa_inaugurado_em_1_de_Maio_de_1933_doyk04.jpg",
    },
    {
      title: "Lançoamento da Pedra Fundamental da Siderúrgica Barra Mansa (1935)",
      description:
        "1935: Lançoamento da Pedra Fundamental da Siderúrgica Barra Mansa. Assinado o Dr. Dario Aragão",
      href: "/producao-bibliografica/memorial-fotografico",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821776/1935_Lan%C3%A7amento_da_pedra_fundamental_sbm_assinando_dr_dario_aragao_upoqze.jpg",
    },
    {
      title: "Construção da Companhia Néstle em (1936)",
      description: "Ano que caracteriza a construção de toda companhia da nèstle na decada de 1936",
      href: "/producao-bibliografica/relatorio-gestao",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821783/construcao_da_cia_nestle_1936_t6voez.jpg",
    },
    {
      title:
        "Tropas policiais de Barra Mansa, Nova Iguaçu e Niterói reprimem manifestação popular.",
      description:
        "ocasião do assassinato do líder sindical Rubem Machado, presidente do Sindicato dos Trabalhadores da Construção Civil de Volta Redonda-RJ e região",
      href: "/producao-bibliografica/entrevistas",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821799/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_2_fpkf7o.png",
    },
    {
      title: "O Movimento Operário no Sul Fluminense. (2025)",
      description:
        "Todo nosso agradecimento é pouco pela enorme ajuda até aqui. Os trabalhadores e o Sindicato dos trabalhadores da Construção Civil de Volta Redonda-RJ e região agradecem.",
      href: "/producao-bibliografica/clipping",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821745/Movimento_Oper%C3%A1rio_no_Sul_Fluminense_ksjauk.jpg",
    },
    {
      title:
        "Tropas policiais de Barra Mansa, Nova Iguaçu e Niterói reprimem manifestação popular",
      description:
        "ocasião do assassinato do líder sindical Rubem Machado, presidente do Sindicato dos Trabalhadores da Construção Civil de Volta Redonda-RJ e região",
      href: "/producao-bibliografica/linha-do-tempo",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    },
  ],
  footnote: "Conteúdos ilustrativos. A organização final seguirá o catálogo oficial do acervo.",
};

// =========================
// HOME – PERSONAL TIMELINE (ThirdSection)
// =========================
const homePersonalTimeline: HomeContent["personalTimeline"] = {
  eyebrow: "Acervo Pessoal",
  title: "História do Guardião do Acervo",
  description:
    "Uma trajetória dedicada à organização dos trabalhadores, à defesa de direitos e à preservação da memória. Cada rolagem mostra um tópico com resumo e um acesso direto para saber mais.",
  items: [
    {
      title: "Infância e Primeiros Passos",
      description:
        "Origens, família e os primeiros contatos com a realidade do trabalho e organização coletiva.",
      href: "/acervo-pessoal/infancia",
    },
    {
      title: "Entrada no Movimento",
      description:
        "O início da militância sindical e a construção de uma consciência de classe prática.",
      href: "/acervo-pessoal/entrada-no-movimento",
    },
    {
      title: "Campanhas Iniciais",
      description:
        "Mobilizações de base, panfletagem e as primeiras vitórias que consolidaram confiança.",
      href: "/acervo-pessoal/campanhas-iniciais",
    },
    {
      title: "Greves Históricas",
      description:
        "Articulações, bastidores e a estratégia por trás dos principais movimentos paredistas.",
      href: "/acervo-pessoal/greves-historicas",
    },
    {
      title: "Formação e Estudos",
      description:
        "Cursos, leituras e referências que formaram o repertório político e organizativo.",
      href: "/acervo-pessoal/formacao",
    },
    {
      title: "Gestão no Sindicato",
      description:
        "Projetos, prestação de contas e a busca por transparência e serviços ao trabalhador.",
      href: "/acervo-pessoal/gestao",
    },
    {
      title: "Relações e Parcerias",
      description: "Frentes com outras entidades, diálogo social e redes de apoio à categoria.",
      href: "/acervo-pessoal/parcerias",
    },
    {
      title: "Comunicação e Imagem",
      description:
        "Boletins, cartazes e mídia: como contar a história e fortalecer a memória coletiva.",
      href: "/acervo-pessoal/comunicacao",
    },
    {
      title: "Reconhecimentos",
      description: "Homenagens, prêmios e registros oficiais do legado construído.",
      href: "/acervo-pessoal/reconhecimentos",
    },
    {
      title: "Legado e Futuro",
      description: "O que permanece, o que inspira e como a próxima geração pode avançar.",
      href: "/acervo-pessoal/legado",
    },
  ],
  aside: {
    label: "Guardião do Acervo",
    name: "Rubem Machado",
    role: "Curadoria, pesquisa e preservação",
    avatar: "/hero.png",
    highlights: ["30+ anos de atuação", "Projetos premiados", "Pesquisa histórica", "Acesso público"],
  },
  footnote: "Role dentro desta caixa para navegar entre os tópicos.",
};

// =========================
// HOME – JOURNALS (FourthSection)
// =========================
const homeJournals: HomeContent["journals"] = {
  eyebrow: "Jornais de Época",
  title: "Uma janela para o passado",
  description:
    "Explore edições históricas digitalizadas com leitura agradável em qualquer dispositivo. Veja capas, chamadas e contexto e continue para a leitura completa na página dedicada.",
  cta: { label: "Ver todos os jornais", href: "/jornais-de-epoca" },
  filters: ["Todos", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s"],
  items: [
    {
      title: "O Operário",
      date: "12/05/1913",
      decade: "1910s",
      description: "Edição dedicada à organização de base e às primeiras pautas salariais.",
      href: "/jornais-de-epoca/o-operario-1913-05-12",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821799/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_2_fpkf7o.png",
    },
    {
      title: "Folha do Trabalhador",
      date: "03/09/1921",
      decade: "1920s",
      description: "Relatos de mobilizações em bairros fabris e formação de comissões.",
      href: "/jornais-de-epoca/folha-trabalhador-1921-09-03",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821791/Tropas_policiais_de_Barra_Mansa_Nova_Igua%C3%A7u_e_Niter%C3%B3i_reprimem_manifesta%C3%A7%C3%A3o_popular_em_ocasi%C3%A3o_do_assassinato_do_l%C3%ADder_sindical_Rubem_Machado_em_Volta_Redonda-RJ_1_iuqf4r.png",
    },
    {
      title: "Gazeta Sindical",
      date: "28/02/1932",
      decade: "1930s",
      description: "Análise das greves históricas e estratégias de negociação coletiva.",
      href: "/jornais-de-epoca/gazeta-sindical-1932-02-28",
      cover: "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821783/construcao_da_cia_nestle_1936_t6voez.jpg",
    },
    {
      title: "O Dia do Povo",
      date: "17/07/1937",
      decade: "1930s",
      description: "Cobertura de marchas, assembleias e da vida cotidiana nos galpões.",
      href: "/jornais-de-epoca/o-dia-do-povo-1937-07-17",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg",
    },
    {
      title: "Tribuna Operária",
      date: "22/10/1944",
      decade: "1940s",
      description: "Edição especial sobre segurança, saúde e reformas dos locais de trabalho.",
      href: "/jornais-de-epoca/tribuna-operaria-1944-10-22",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
    },
    {
      title: "Voz da Fábrica",
      date: "09/01/1949",
      decade: "1940s",
      description: "Crônicas de turno, refeitórios e as novas demandas do pós-guerra.",
      href: "/jornais-de-epoca/voz-da-fabrica-1949-01-09",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821751/O_papel_importante_do_Partido_Comunista_Brasileiro_PCB_na_organiza%C3%A7%C3%A3o_k9culm.jpg",
    },
    {
      title: "Correio Popular",
      date: "11/06/1953",
      decade: "1950s",
      description: "Editorial sobre custo de vida e tabelas comparativas de preços.",
      href: "/jornais-de-epoca/correio-popular-1953-06-11",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821733/A_industrializa%C3%A7%C3%A3o_no_Sul_Fluminense_juqrcc.jpg",
    },
    {
      title: "Jornal do Metal",
      date: "30/11/1957",
      decade: "1950s",
      description: "Reportagens fotográficas das linhas de montagem e novas tecnologias.",
      href: "/jornais-de-epoca/jornal-do-metal-1957-11-30",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821738/Manchete_6_de_fevereiro_de_1960_fh5bkv.jpg",
    },
    {
      title: "A Voz do Sindicato",
      date: "04/04/1962",
      decade: "1960s",
      description: "Plano de lutas, calendário de assembleias e entrevistas com lideranças.",
      href: "/jornais-de-epoca/voz-do-sindicato-1962-04-04",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821733/A_industrializa%C3%A7%C3%A3o_no_Sul_Fluminense_juqrcc.jpg",
    },
    {
      title: "Boletim do Trabalhador",
      date: "18/09/1968",
      decade: "1960s",
      description: "Cartazes, notas rápidas e uma linha do tempo de conquistas.",
      href: "/jornais-de-epoca/boletim-trabalhador-1968-09-18",
      cover:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821814/Obelisco_em_Homenagem_aos_oper%C3%A1rios_de_Barra_Mansa_inaugurado_em_1_de_Maio_de_1933_doyk04.jpg",
    },
  ],
};

// =========================
// HOME – TEAM (FifthSection)
// =========================
const homeTeam: HomeContent["team"] = {
  eyebrow: "Equipe Técnica",
  title: "Quem faz o Centro de Memória Operária acontecer",
  description:
    "Um time multidisciplinar dedicado à preservação, pesquisa e acesso público. Conheça as funções, competências e frentes de atuação.",
  cta: { label: "Ver equipe completa", href: "/equipe-tecnica" },
  people: [
    {
      name: "Rubem Machado",
      role: "Coordenação Geral & Curadoria",
      bio: "Estratégia do acervo, diretrizes de preservação e validação histórica.",
      photo: "/hero.png",
      tags: ["Curadoria", "Gestão", "Memória"],
      href: "/equipe-tecnica/rubem-machado",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Ana Bezerra",
      role: "Arquivista Chefe",
      bio: "Classificação, descrição e políticas de acesso ao acervo.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821829/Funcionarios_da_Siderurgica_BM_dec._de_1950_esytij.jpg",
      tags: ["Arquivística", "Catalogação", "Acesso"],
      href: "/equipe-tecnica/ana-bezerra",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Carlos Figueiredo",
      role: "Historiador",
      bio: "Contextualização, recorte temporal e verificação de fontes.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["Pesquisa", "Contexto", "Fontes"],
      href: "/equipe-tecnica/carlos-figueiredo",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Marina Lopes",
      role: "Líder de Digitalização",
      bio: "Fluxo de captura, restauração e padrões de imagem.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["Digitalização", "Restauração", "Metadados"],
      href: "/equipe-tecnica/marina-lopes",
      email: "#",
      linkedin: "#",
    },
    {
      name: "João Nascimento",
      role: "Eng. de Software",
      bio: "Aplicação, pesquisa e interface com o banco de memória.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["Full-stack", "Next.js", "UX"],
      href: "/equipe-tecnica/joao-nascimento",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Lívia Rocha",
      role: "Infra & DevOps",
      bio: "Escalabilidade, backups e observabilidade do ambiente.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["Infra", "S3/KVM", "Segurança"],
      href: "/equipe-tecnica/livia-rocha",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Paulo Tavares",
      role: "Design & Acessibilidade",
      bio: "Identidade visual e leitura confortável em todas as telas.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["UI", "A11y", "Sistemas"],
      href: "/equipe-tecnica/paulo-tavares",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Sofia Mendes",
      role: "Gestão de Conteúdo",
      bio: "Padronização editorial, revisão e publicação de coleções.",
      photo:
        "https://res.cloudinary.com/dc7u5spia/image/upload/v1758821766/504057774_122115082838853401_3435107802977189504_n_pheezs.jpg",
      tags: ["Editorial", "Padrões", "Publicação"],
      href: "/equipe-tecnica/sofia-mendes",
      email: "#",
      linkedin: "#",
    },
  ],
};

// =========================
// HOME – ACCESS / TRANSPARÊNCIA (SixthSection)
// =========================
const homeAccess: HomeContent["access"] = {
  eyebrow: "Acesso à Informação",
  title: "Transparência ativa e busca em um só lugar",
  description:
    "Consulte documentos, políticas e registros do banco de memória. Filtre por tema e avance para páginas com o conteúdo completo.",
  filters: [
    { key: "todas", label: "Todas" },
    { key: "atas", label: "Atas" },
    { key: "relatorios", label: "Relatórios" },
    { key: "contratos", label: "Contratos" },
    { key: "despesas", label: "Despesas" },
    { key: "convenios", label: "Convênios" },
    { key: "boletins", label: "Boletins" },
    { key: "imagens", label: "Imagens" },
  ],
  items: [
    {
      title: "Atas de Assembleia — 1950–1980",
      description: "Deliberações, presença e pautas debatidas em encontros gerais e extraordinários.",
      href: "/acesso-a-informacao/atas-assembleia",
      tags: ["atas"],
    },
    {
      title: "Relatórios de Gestão",
      description: "Síntese anual de ações, indicadores e prestação de contas das frentes do sindicato.",
      href: "/acesso-a-informacao/relatorios-gestao",
      tags: ["relatorios", "despesas"],
    },
    {
      title: "Contratos e Parcerias",
      description: "Instrumentos firmados com fornecedores e instituições, com objetos e vigências.",
      href: "/acesso-a-informacao/contratos",
      tags: ["contratos", "convenios"],
    },
    {
      title: "Despesas e Custos Operacionais",
      description: "Notas, empenhos e categorias de gasto com critérios de classificação.",
      href: "/acesso-a-informacao/despesas",
      tags: ["despesas", "relatorios"],
    },
    {
      title: "Convênios e Termos de Cooperação",
      description: "Bases de colaboração, responsabilidades e resultados esperados.",
      href: "/acesso-a-informacao/convenios",
      tags: ["convenios"],
    },
    {
      title: "Boletins e Comunicados Oficiais",
      description: "Publicações periódicas com decisões, avisos e orientações à categoria.",
      href: "/acesso-a-informacao/boletins",
      tags: ["boletins"],
    },
    {
      title: "Acervo Fotográfico — Acesso Público",
      description: "Conjunto de imagens com termos de uso, créditos e contexto.",
      href: "/acesso-a-informacao/imagens-publicas",
      tags: ["imagens"],
    },
    {
      title: "Política de Transparência e Acesso",
      description: "Diretrizes gerais de disponibilização, prazos e canais de atendimento.",
      href: "/acesso-a-informacao/politica",
      tags: ["relatorios", "contratos", "boletins", "atas", "despesas", "convenios", "imagens"],
    },
  ],
};

// =========================
// HOME – POLÍTICA NACIONAL (SeventhSection)
// =========================
const homePolitics: HomeContent["politics"] = {
  eyebrow: "Política Nacional",
  title: "Diretrizes, instrumentos e histórico da atuação sindical",
  description:
    "Seleção editorial com marcos legais, reformas e eixos temáticos para leitura rápida. Acesse cada análise completa nas páginas dedicadas.",
  featured: {
    title: "Constituição de 1988 — direitos e garantias",
    description:
      "Marco legal que redefine cidadania, relações de trabalho e acesso a políticas públicas. Entenda impactos no mundo do trabalho e na organização sindical.",
    href: "/politica-nacional/constituicao-1988",
    cover: "/hero.png",
    date: "05/10/1988",
  },
  axes: [
    { key: "todos", label: "Todos" },
    { key: "trabalho", label: "Trabalho" },
    { key: "previdencia", label: "Previdência" },
    { key: "educacao", label: "Educação" },
    { key: "saude", label: "Saúde" },
    { key: "direitos", label: "Direitos" },
  ],
  events: [
    {
      title: "Reforma Trabalhista — Contexto e Efeitos",
      date: "2017",
      summary: "Mudanças em contratos, negociação coletiva e representação sindical — linhas gerais e debates.",
      href: "/politica-nacional/reforma-trabalhista-2017",
      axis: ["trabalho", "direitos"],
    },
    {
      title: "Política de Valorização do Salário Mínimo",
      date: "2008—Atualizações",
      summary: "Indexadores e fórmulas que influenciam renda, consumo e negociações setoriais.",
      href: "/politica-nacional/salario-minimo",
      axis: ["trabalho"],
    },
    {
      title: "Reforma da Previdência — Regras Gerais",
      date: "2019",
      summary: "Idade mínima, tempo de contribuição e transições: o que muda para diferentes categorias.",
      href: "/politica-nacional/previdencia-2019",
      axis: ["previdencia", "direitos"],
    },
    {
      title: "Pisos Salariais Profissionais",
      date: "Diversas Leis",
      summary: "Estruturas de piso por ocupação e seus reflexos em carreiras e negociações.",
      href: "/politica-nacional/pisos-salariais",
      axis: ["trabalho"],
    },
    {
      title: "Diretrizes Nacionais de Educação Profissional",
      date: "Atualizações",
      summary: "Qualificação e certificação para o mundo do trabalho: histórico e políticas.",
      href: "/politica-nacional/educacao-profissional",
      axis: ["educacao", "trabalho"],
    },
    {
      title: "SUS — Estrutura e Participação Social",
      date: "1988—",
      summary: "Conselhos, conferências e acesso universal: como a saúde pública se organiza.",
      href: "/politica-nacional/sus-participacao",
      axis: ["saude", "direitos"],
    },
    {
      title: "Segurança e Saúde no Trabalho",
      date: "NRs e Atualizações",
      summary: "Normas Regulamentadoras, prevenção e condições de trabalho ao longo das décadas.",
      href: "/politica-nacional/seguranca-saude-trabalho",
      axis: ["trabalho", "saude"],
    },
    {
      title: "Conselhos e Mesas de Negociação",
      date: "Histórico",
      summary: "Mecanismos de diálogo social entre governo, trabalhadores e empregadores.",
      href: "/politica-nacional/dialogo-social",
      axis: ["direitos", "trabalho"],
    },
    {
      title: "Programas de Habitação de Interesse Social",
      date: "Várias Fases",
      summary: "Acesso à moradia e impactos socioeconômicos para a classe trabalhadora.",
      href: "/politica-nacional/habitacao",
      axis: ["direitos"],
    },
    {
      title: "Política de Transparência e Acesso",
      date: "Lei e Decretos",
      summary: "Bases legais de transparência ativa, prazos de resposta e controle social.",
      href: "/politica-nacional/transparencia",
      axis: ["direitos"],
    },
    {
      title: "Carta de Princípios",
      date: "Documento",
      summary: "Valores e compromissos que orientam a atuação institucional.",
      href: "/politica-nacional/carta-principios",
      axis: ["direitos", "trabalho"],
    },
    {
      title: "Pactos Regionais",
      date: "Acordos",
      summary: "Implementação regional de metas e prioridades da política nacional.",
      href: "/politica-nacional/pactos-regionais",
      axis: ["direitos", "trabalho"],
    },
  ],
  notes: [
    "Seleções curadas com fontes verificadas.",
    "Resumos objetivos para leitura rápida.",
    "Aprofunde-se nas páginas das análises.",
  ],
  methodologyLink: { label: "Metodologia", href: "/politica-nacional/metodologia" },
  searchPlaceholder: "Buscar marcos…",
};

export const homeContent: HomeContent = {
  hero: homeHero,
  search: homeSearch,
  featuredCollections: homeFeaturedCollections,
  personalTimeline: homePersonalTimeline,
  journals: homeJournals,
  team: homeTeam,
  access: homeAccess,
  politics: homePolitics,
};
