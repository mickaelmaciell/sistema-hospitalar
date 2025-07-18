import { useEffect, useState } from "react";
import {
  Hospital,
  Clock,
  Info,
  ListOrdered,
  Heart,
  Trash2,
  CheckCircle,
  Clock4,
} from "lucide-react";

function Painel() {
  const [pacientesAguardando, setPacientesAguardando] = useState([]);
  const [pacientesTriados, setPacientesTriados] = useState([]);

  const atualizarPainel = () => {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];

    const aguardando = dados
      .filter((p) => p.status === "Aguardando")
      .sort((a, b) => {
        const prioridadeMap = { Vermelho: 1, Amarelo: 2, Verde: 3 };
        return prioridadeMap[a.cor] - prioridadeMap[b.cor];
      });

    const triados = dados
      .filter((p) => p.status === "Atendido")
      .sort((a, b) => new Date(a.horaEntrada) - new Date(b.horaEntrada));

    setPacientesAguardando(aguardando);
    setPacientesTriados(triados);
  };

  useEffect(() => {
    atualizarPainel();

    const intervalo = setInterval(atualizarPainel, 5000);

    const onStorage = (e) => {
      if (e.key === "pacientes") atualizarPainel();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const removerPaciente = (id) => {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    const novos = dados.filter((p) => p.id !== id);
    localStorage.setItem("pacientes", JSON.stringify(novos));
    atualizarPainel();
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="flex flex-col items-center mb-12">
        <Hospital className="w-16 h-16 text-blue-700 mb-4" />
        <h2 className="text-5xl font-bold text-blue-700">Painel de Atendimento</h2>
        <div className="flex items-center text-2xl text-blue-600 mt-4">
          <Clock className="w-6 h-6 mr-2" />
          Acompanhamento em tempo real das filas
        </div>
      </div>

      {/* Seção 1 - Aguardando triagem */}
      <section className="mb-12">
        <h3 className="text-3xl font-semibold text-red-600 mb-6 flex items-center justify-center gap-2">
          <Clock4 className="w-6 h-6" /> Aguardando Triagem
        </h3>

        {pacientesAguardando.length === 0 ? (
          <div className="flex flex-col items-center text-center text-blue-600 mb-8">
            <Info className="w-10 h-10 mb-2" />
            <p className="text-xl">Nenhum paciente aguardando triagem no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pacientesAguardando.map((paciente, index) => (
              <div
                key={paciente.id || index}
                className="relative bg-white border-l-8 border-yellow-400 p-6 rounded shadow text-center transform hover:scale-105 transition"
              >
                <button
                  onClick={() => removerPaciente(paciente.id)}
                  className="absolute top-2 right-2 p-1 bg-red-50 rounded-full hover:bg-red-100 transition"
                  title="Remover paciente"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                <h3 className="text-2xl font-bold mb-2">{paciente.nomeReal}</h3>
                <p className="text-blue-500 text-sm mt-2">
                  <ListOrdered className="inline w-4 h-4 mr-1" />
                  Fila: {index + 1}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção 2 - Triagem finalizada */}
      <section>
        <h3 className="text-3xl font-semibold text-green-600 mb-6 flex items-center justify-center gap-2">
          <CheckCircle className="w-6 h-6" /> Aguardando Médico
        </h3>

        {Array.isArray(pacientesTriados) && pacientesTriados.length === 0 ? (
          <div className="flex flex-col items-center text-center text-green-700">
            <Info className="w-10 h-10 mb-2" />
            <p className="text-xl">Nenhum paciente triado aguardando o médico.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(pacientesTriados) &&
              pacientesTriados.map((paciente, index) => (
                <div
                  key={paciente.id || index}
                  className="relative bg-white border-l-8 border-green-500 p-6 rounded shadow text-center transform hover:scale-105 transition"
                >
                  <button
                    onClick={() => removerPaciente(paciente.id)}
                    className="absolute top-2 right-2 p-1 bg-red-50 rounded-full hover:bg-red-100 transition"
                    title="Remover paciente"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <h3 className="text-2xl font-bold mb-2">{paciente.nomeReal}</h3>
                  <p className="text-green-600 text-sm mt-2">
                    <Heart className="inline w-4 h-4 mr-1" />
                    Aguardando o médico
                  </p>
                  <p className="text-blue-500 text-sm mt-1">
                    <ListOrdered className="inline w-4 h-4 mr-1" />
                    Fila: {index + 1}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Painel;
