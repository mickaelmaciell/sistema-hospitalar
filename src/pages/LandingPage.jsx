// src/pages/LandingPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Calendar,
  Phone,
  MapPin,
  Mail,
  User,
  X,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // detecta preferência de tema
  useEffect(() => {
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (e) =>
      document.documentElement.classList.toggle("dark", e.matches);
    apply(darkMq);
    darkMq.addEventListener("change", apply);
    return () => darkMq.removeEventListener("change", apply);
  }, []);

  // scroll suave
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Heart className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Hospital 24 horas
            </span>
          </div>

          {/* desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["inicio", "servicos", "sobre", "contato"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <User className="inline w-5 h-5 mr-2" />
              Login
            </button>

            {/* mobile menu btn */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {["inicio", "servicos", "sobre", "contato"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollTo(sec)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary-600"
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="inicio"
        className="pt-20 pb-16 gradient-bg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Cuidando da sua <span className="text-blue-500">saúde</span> com
            excelência
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-500 max-w-3xl mx-auto">
            Há mais de 30 anos oferecendo atendimento médico de qualidade com
            tecnologia de ponta e equipe altamente qualificada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Calendar className="inline w-5 h-5 mr-2" />
              Agendar Consulta
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300">
              <Phone className="inline w-5 h-5 mr-2" />
              Emergência 24h
            </button>
          </div>
        </div>
        {/* bolhas flutuantes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "-4s" }}
        />
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de especialidades médicas com
              equipamentos modernos e profissionais especializados.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-stethoscope",
                title: "Clínica Geral",
                text: "Atendimento médico completo para toda a família com profissionais experientes.",
              },
              {
                icon: "fa-heart",
                title: "Cardiologia",
                text: "Cuidados especializados para o coração com tecnologia avançada em diagnóstico.",
              },
              {
                icon: "fa-brain",
                title: "Neurologia",
                text: "Tratamento especializado para distúrbios do sistema nervoso.",
              },
              {
                icon: "fa-x-ray",
                title: "Radiologia",
                text: "Exames de imagem com equipamentos de última geração para diagnósticos precisos.",
              },
              {
                icon: "fa-user-md",
                title: "Cirurgia",
                text: "Centro cirúrgico moderno com equipe multidisciplinar especializada.",
              },
              {
                icon: "fa-ambulance",
                title: "Emergência 24h",
                text: "Pronto-socorro 24 horas com atendimento rápido e eficiente.",
              },
            ].map((svc, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`fas ${svc.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {svc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{svc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Tradição e Inovação em Saúde
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              O Hospital São Lucas é referência em atendimento médico,
              combinando tradição familiar com tecnologia de ponta. Nossa missão
              é proporcionar cuidados médicos excepcionais com humanização e
              respeito.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8 text-center">
              {[
                { num: "30+", label: "Anos de experiência" },
                { num: "50+", label: "Especialistas" },
                { num: "24/7", label: "Atendimento" },
                { num: "100k+", label: "Pacientes atendidos" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {item.num}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-primary-200 dark:bg-primary-800 rounded-2xl flex items-center justify-center">
              <i className="fas fa-hospital text-primary-600 text-8xl"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            {[
              {
                icon: <MapPin className="w-6 h-6 text-white" />,
                title: "Endereço",
                lines: [
                  "Rua da Saúde, 123",
                  "Centro, São Paulo - SP",
                  "CEP: 01234-567",
                ],
              },
              {
                icon: <Phone className="w-6 h-6 text-white" />,
                title: "Telefone",
                lines: ["(11) 1234-5678", "Emergência: (11) 9999-0000"],
              },
              {
                icon: <Mail className="w-6 h-6 text-white" />,
                title: "E-mail",
                lines: [
                  "contato@hospitals24horas.com.br",
                  "emergencia@hospital24horas.com.br",
                ],
              },
            ].map((info, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.lines.map((ln, j) => (
                    <p key={j} className="text-gray-600 dark:text-gray-400">
                      {ln}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Nome", type: "text" },
                { label: "E-mail", type: "email" },
                { label: "Telefone", type: "tel" },
              ].map((fld, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {fld.label}
                  </label>
                  <input
                    type={fld.type}
                    className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & social */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Heart className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold">Hospital 24 horas</span>
              </div>
              <p className="text-gray-400 mb-4">
                Cuidando da sua saúde com excelência há mais de 30 anos.
              </p>
              <div className="flex space-x-4">
                {["fab fa-facebook", "fab fa-instagram", "fab fa-linkedin"].map(
                  (cls, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                    >
                      <i className={`${cls} text-white`}></i>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                {["inicio", "servicos", "sobre", "contato"].map((sec, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollTo(sec)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Horários */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Horários</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Segunda a Sexta: 6h às 22h</li>
                <li>Sábado: 7h às 20h</li>
                <li>Domingo: 8h às 18h</li>
                <li className="text-red-400 font-semibold">
                  Emergência: 24 horas
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Hospital 24 horas. Todos os
            direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
