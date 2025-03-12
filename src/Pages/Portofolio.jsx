import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes } from "lucide-react";

// Projetos locais - você pode adicionar seus projetos aqui
const localProjects = [
  {
    id: "1",
    Title: "Universyteca",
    Description: "Biblioteca digital interativa desenvolvida para facilitar o acesso e gerenciamento de livros acadêmicos. Sistema completo com cadastro de livros, empréstimos, devoluções e recomendações personalizadas.",
    TechStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Material UI"
    ],
    Features: [
      "Sistema de autenticação de usuários",
      "Catálogo interativo de livros",
      "Sistema de empréstimo e devolução",
      "Recomendações baseadas em interesses",
      "Painel administrativo para gestão",
      "Sistema de busca avançada",
      "Notificações de prazos e devoluções"
    ]
  },
  {
    id: "2",
    Title: "Alexandria",
    Description: "Sistema de biblioteca digital com foco em experiência do usuário. Uma plataforma completa para gerenciamento de acervo, empréstimos e recomendações de livros, inspirada nas grandes bibliotecas da antiguidade.",
    TechStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Next.js",
      "Prisma",
      "TypeScript"
    ],
    Features: [
      "Interface moderna e intuitiva",
      "Sistema de recomendação baseado em IA",
      "Catálogo digital completo",
      "Gestão de empréstimos e reservas",
      "Perfil personalizado do leitor",
      "Sistema de avaliações e resenhas",
      "Integração com APIs de livros"
    ]
  },
  {
    id: "3",
    Title: "Galileu",
    Description: "Plataforma inovadora que combina biblioteca digital com mapeamento geográfico. Permite explorar livros e documentos históricos através de uma interface interativa baseada em mapas, conectando literatura e localização.",
    TechStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Leaflet",
      "MapBox",
      "Express",
      "Redux"
    ],
    Features: [
      "Visualização geográfica de acervos",
      "Mapeamento interativo de bibliotecas",
      "Integração com APIs de mapas",
      "Sistema de busca geolocalizada",
      "Roteiros literários personalizados",
      "Compartilhamento de descobertas",
      "Histórico de explorações"
    ]
  },
  {
    id: "4",
    Title: "D&D Companion",
    Description: "Aplicativo web para criação e gerenciamento de fichas de personagens de D&D. Uma ferramenta completa para jogadores e mestres, facilitando a organização de campanhas e o acompanhamento do desenvolvimento dos personagens.",
    TechStack: [
      "React",
      "Firebase",
      "Material UI",
      "Redux",
      "TypeScript",
      "Node.js",
      "Express"
    ],
    Features: [
      "Criação intuitiva de personagens",
      "Calculadora automática de atributos",
      "Biblioteca de itens e magias",
      "Sistema de dados virtual",
      "Gerenciamento de campanhas",
      "Compartilhamento de fichas",
      "Modo offline disponível"
    ]
  },
  {
    id: "5",
    Title: "TaskMaster Pro",
    Description: "Sistema avançado de gerenciamento de projetos e tarefas com foco em produtividade e colaboração em equipe. Oferece recursos modernos para organização, acompanhamento e análise de projetos.",
    TechStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Redux",
      "Material UI",
      "TypeScript"
    ],
    Features: [
      "Quadros Kanban personalizáveis",
      "Chat em tempo real entre equipes",
      "Sistema de sprints e marcos",
      "Relatórios e análises detalhadas",
      "Integração com calendário",
      "Automação de workflows",
      "Gestão de recursos e tempo"
    ]
  },
  {
    id: "6",
    Title: "HealthTrack",
    Description: "Plataforma de monitoramento de saúde e bem-estar que permite aos usuários acompanhar sua jornada fitness, nutrição e objetivos de saúde. Interface intuitiva com visualizações detalhadas de dados.",
    TechStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Chart.js",
      "Tailwind CSS",
      "Express",
      "JWT"
    ],
    Features: [
      "Dashboard personalizado de saúde",
      "Rastreamento de exercícios",
      "Planejamento de refeições",
      "Gráficos de progresso",
      "Integração com dispositivos fitness",
      "Lembretes personalizados",
      "Compartilhamento de conquistas"
    ]
  },
  {
    id: "7",
    Title: "EduQuest",
    Description: "Plataforma educacional gamificada que transforma o aprendizado em uma jornada interativa. Ideal para escolas e instituições que buscam engajar alunos através de elementos de jogos e recompensas.",
    TechStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Redux",
      "Tailwind CSS",
      "TypeScript"
    ],
    Features: [
      "Sistema de missões educativas",
      "Ranking e recompensas",
      "Trilhas de aprendizado",
      "Quiz interativos",
      "Conquistas desbloqueáveis",
      "Modo multiplayer",
      "Dashboard do professor"
    ]
  },
  {
    id: "8",
    Title: "DevFlow",
    Description: "Ambiente de desenvolvimento colaborativo que integra ferramentas essenciais para equipes de programação. Facilita o gerenciamento de código, revisões e documentação em um único lugar.",
    TechStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Redis",
      "GraphQL",
      "TypeScript"
    ],
    Features: [
      "Gerenciamento de repositórios",
      "Sistema de code review",
      "Documentação colaborativa",
      "CI/CD integrado",
      "Métricas de código",
      "Chat em tempo real",
      "Gestão de branches"
    ]
  },
  {
    id: "9",
    Title: "EventHub",
    Description: "Plataforma completa para gerenciamento e organização de eventos, desde pequenas reuniões até grandes conferências. Oferece ferramentas para planejamento, venda de ingressos e gestão de participantes.",
    TechStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redis",
      "Express",
      "Material UI"
    ],
    Features: [
      "Criação de eventos personalizados",
      "Sistema de vendas de ingressos",
      "Check-in digital",
      "Gestão de palestrantes",
      "Programação interativa",
      "Networking entre participantes",
      "Análise de dados do evento"
    ]
  }
];

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "Ver Menos" : "Ver Mais"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  useEffect(() => {
    // Salvar projetos no localStorage para manter a contagem no About
    localStorage.setItem("projects", JSON.stringify(localProjects));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = () => {
    setShowAllProjects(prev => !prev);
  };

  const displayedProjects = showAllProjects ? localProjects : localProjects.slice(0, initialItems);

  return (
    <div className="min-h-screen py-10 px-[5%] md:px-[10%]" id="Portofolio">
      <Box sx={{ bgcolor: "transparent", width: "100%" }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.7)",
                "&.Mui-selected": {
                  color: "white",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#6366f1",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              {localProjects.length === 0 ? (
                <div className="text-center text-gray-400 py-20">
                  <p className="text-xl">Nenhum projeto adicionado ainda.</p>
                  <p className="mt-2">Adicione seus projetos editando o array localProjects.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <CardProject
                        Title={project.Title}
                        Description={project.Description}
                        id={project.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {localProjects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={toggleShowMore}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-w-6xl mx-auto">
                {techStacks.slice(0, 5).map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
                {techStacks.slice(5, 10).map((stack, index) => (
                  <div
                    key={index + 5}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}