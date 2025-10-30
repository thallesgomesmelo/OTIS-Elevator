// Mock data for Elevatos Manager

// Countries data
export const countries = [
  {
    code: "BR",
    name: "Brasil",
    flag: "🇧🇷",
    coordinates: { lat: -14.235, lng: -51.925 },
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    coordinates: { lat: -38.416, lng: -63.617 },
  },
  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    coordinates: { lat: -35.675, lng: -71.543 },
  },
  {
    code: "CO",
    name: "Colômbia",
    flag: "🇨🇴",
    coordinates: { lat: 4.571, lng: -74.297 },
  },
  {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    coordinates: { lat: 23.635, lng: -102.553 },
  },
];

// Project statuses
export const projectStatuses = [
  { id: "venda", label: "Venda", color: "orange-600", stage: 1 },
  { id: "fabricacao", label: "Fabricação", color: "blue-600", stage: 2 },
  { id: "instalacao", label: "Instalação", color: "purple-600", stage: 3 },
  { id: "pos-venda", label: "Pós-Venda", color: "green-600", stage: 4 },
];

// Generate projects
const generateProjects = () => {
  const projects = [];
  const managers = [
    "Carlos Silva",
    "Ana Costa",
    "João Santos",
    "Maria Oliveira",
    "Pedro Alves",
    "Lucia Ferreira",
  ];
  const cities = {
    BR: [
      "São Paulo",
      "Rio de Janeiro",
      "Brasília",
      "Salvador",
      "Belo Horizonte",
    ],
    AR: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
    CL: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"],
    CO: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    MX: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
  };

  const statusIds = projectStatuses.map((s) => s.id);
  const counts = { BR: 45, AR: 32, CL: 28, CO: 21, MX: 18 };

  let id = 1;
  Object.entries(counts).forEach(([countryCode, count]) => {
    for (let i = 0; i < count; i++) {
      const country = countries.find((c) => c.code === countryCode);
      const statusIndex = Math.floor(Math.random() * statusIds.length);
      const status = statusIds[statusIndex];
      const progress = Math.floor(Math.random() * 100);
      const budget = Math.floor(Math.random() * 900000) + 100000;
      const city =
        cities[countryCode][
          Math.floor(Math.random() * cities[countryCode].length)
        ];

      projects.push({
        id: `PROJ-${String(id).padStart(4, "0")}`,
        name: `Torre ${city} ${i + 1}`,
        country: countryCode,
        countryName: country.name,
        flag: country.flag,
        status,
        progress,
        budget,
        manager: managers[Math.floor(Math.random() * managers.length)],
        startDate: new Date(
          2024,
          Math.floor(Math.random() * 6),
          Math.floor(Math.random() * 28) + 1
        )
          .toISOString()
          .split("T")[0],
        endDate: new Date(
          2025,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        )
          .toISOString()
          .split("T")[0],
        city,
        coordinates: {
          lat: country.coordinates.lat + (Math.random() - 0.5) * 10,
          lng: country.coordinates.lng + (Math.random() - 0.5) * 10,
        },
        stages: {
          venda: {
            complete: status === "venda" ? progress : 100,
            notes: "Contrato assinado e aprovado",
          },
          fabricacao: {
            complete:
              status === "fabricacao" ? progress : status === "venda" ? 0 : 100,
            notes: "Peças em produção na fábrica",
          },
          instalacao: {
            complete:
              status === "instalacao"
                ? progress
                : ["venda", "fabricacao"].includes(status)
                ? 0
                : 100,
            notes: "Equipe de instalação designada",
          },
          "pos-venda": {
            complete:
              status === "pos-venda"
                ? progress
                : status === "pos-venda"
                ? 100
                : 0,
            notes: "Suporte técnico ativo",
          },
        },
        attachments: [
          { name: "Contrato.pdf", size: "2.3 MB", type: "pdf" },
          { name: "Planta_Baixa.dwg", size: "5.1 MB", type: "dwg" },
          { name: "Especificacoes.xlsx", size: "1.2 MB", type: "xlsx" },
        ],
      });
      id++;
    }
  });

  return projects;
};

export const projects = generateProjects();

// Feedback data
export const feedbackData = [
  {
    id: 1,
    projectId: projects[0].id,
    projectName: projects[0].name,
    name: "João Silva",
    rating: 5,
    comment:
      "Excelente trabalho! A equipe foi muito profissional e entregou dentro do prazo.",
    suggestions: "Melhorar a comunicação durante a fase de instalação.",
    date: "2024-03-15",
  },
  {
    id: 2,
    projectId: projects[1].id,
    projectName: projects[1].name,
    name: "Maria Santos",
    rating: 4,
    comment: "Bom serviço, mas houve alguns atrasos na fabricação.",
    suggestions: "Fornecer atualizações mais frequentes sobre o progresso.",
    date: "2024-03-10",
  },
  {
    id: 3,
    projectId: projects[2].id,
    projectName: projects[2].name,
    name: "Pedro Costa",
    rating: 5,
    comment: "Projeto impecável do início ao fim. Recomendo!",
    suggestions: "",
    date: "2024-03-08",
  },
  {
    id: 4,
    projectId: projects[3].id,
    projectName: projects[3].name,
    name: "Ana Oliveira",
    rating: 5,
    comment: "Qualidade excepcional dos elevadores instalados.",
    suggestions: "Expandir o suporte pós-venda para finais de semana.",
    date: "2024-03-05",
  },
  {
    id: 5,
    projectId: projects[4].id,
    projectName: projects[4].name,
    name: "Carlos Ferreira",
    rating: 4,
    comment:
      "Satisfeito com o resultado final, apesar de pequenos contratempos.",
    suggestions: "Melhorar o processo de aprovação de mudanças.",
    date: "2024-03-01",
  },
  {
    id: 6,
    projectId: projects[5].id,
    projectName: projects[5].name,
    name: "Lucia Almeida",
    rating: 5,
    comment: "Profissionais altamente qualificados. Trabalho excelente!",
    suggestions: "Continuar com o mesmo padrão de qualidade.",
    date: "2024-02-28",
  },
];

// Monthly data for charts
export const monthlyData = [
  { month: "Out", projects: 18, revenue: 2100000, costs: 1400000 },
  { month: "Nov", projects: 22, revenue: 2600000, costs: 1700000 },
  { month: "Dez", projects: 25, revenue: 3100000, costs: 2000000 },
  { month: "Jan", projects: 28, revenue: 3500000, costs: 2300000 },
  { month: "Fev", projects: 24, revenue: 3200000, costs: 2100000 },
  { month: "Mar", projects: 27, revenue: 3800000, costs: 2500000 },
];

// Country statistics
export const countryStats = [
  {
    country: "Brasil",
    flag: "🇧🇷",
    projects: 45,
    revenue: 4200000,
    satisfaction: 4.8,
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    projects: 32,
    revenue: 2800000,
    satisfaction: 4.7,
  },
  {
    country: "Chile",
    flag: "🇨🇱",
    projects: 28,
    revenue: 2400000,
    satisfaction: 4.9,
  },
  {
    country: "Colômbia",
    flag: "🇨🇴",
    projects: 21,
    revenue: 1900000,
    satisfaction: 4.6,
  },
  {
    country: "México",
    flag: "🇲🇽",
    projects: 18,
    revenue: 1700000,
    satisfaction: 4.7,
  },
];

// User data
export const currentUser = {
  name: "Roberto Silva",
  email: "roberto.silva@elevatos.com",
  role: "Gerente de Projetos",
  department: "Operações",
  avatar: "RS",
  permissions: "Administrador",
  stats: {
    totalProjects: 28,
    concluded: 22,
    rating: 4.8,
  },
};

// Recent activities
export const recentActivities = [
  {
    id: 1,
    type: "update",
    project: projects[0].name,
    action: "Status atualizado para Fabricação",
    time: "2 horas atrás",
    user: "Carlos Silva",
  },
  {
    id: 2,
    type: "new",
    project: projects[1].name,
    action: "Novo projeto criado",
    time: "5 horas atrás",
    user: "Ana Costa",
  },
  {
    id: 3,
    type: "complete",
    project: projects[2].name,
    action: "Instalação concluída",
    time: "1 dia atrás",
    user: "João Santos",
  },
  {
    id: 4,
    type: "feedback",
    project: projects[3].name,
    action: "Nova avaliação recebida (5★)",
    time: "2 dias atrás",
    user: "Pedro Costa",
  },
  {
    id: 5,
    type: "update",
    project: projects[4].name,
    action: "Orçamento atualizado",
    time: "3 dias atrás",
    user: "Maria Oliveira",
  },
];

// Initial feedback stats
export const initialFeedbackStats = {
  totalReviews: 234,
  averageRating: 4.8,
};
