// src/pages/Atendimento.jsx
import { useEffect, useState } from "react";
import ConsultaRemedios from "../components/ConsultaRemedios";
import "../styles/Atendimento.css";

export default function Atendimento() {
  const [fila, setFila] = useState([]);
  const [atual, setAtual] = useState(null);
  const [showConsulta, setShowConsulta] = useState(false);

  const [exameAtual, setExameAtual] = useState("");
  const [examesSelecionados, setExamesSelecionados] = useState([]);

  const [encaminhamentoAtual, setEncaminhamentoAtual] = useState("");
  const [encaminhamentosSelecionados, setEncaminhamentosSelecionados] = useState([]);

  const [medicamentoAtual, setMedicamentoAtual] = useState("");
  const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);

  const [tratamentoAtual, setTratamentoAtual] = useState("");
  const [tratamentosSelecionados, setTratamentosSelecionados] = useState([]);

  const [diagnostico, setDiagnostico] = useState("");

  useEffect(() => {
    const dadosPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const triados = dadosPacientes.filter((p) => p.status === "Atendido");
    setFila(ordenarPorHoraEntrada(triados));

    const salvo = JSON.parse(localStorage.getItem("pacienteAtual"));
    if (salvo) setAtual(salvo);
  }, []);

  const ordenarPorHoraEntrada = (lista) =>
    [...lista].sort((a, b) => new Date(a.horaEntrada) - new Date(b.horaEntrada));

  const chamarProximo = () => {
    if (fila.length === 0) {
      setAtual(null);
      alert("Fila vazia!");
      return;
    }
    const proximo = fila[0];
    setAtual(proximo);
    localStorage.setItem("pacienteAtual", JSON.stringify(proximo));

    const todos = JSON.parse(localStorage.getItem("pacientes")) || [];
    const restantes = todos.filter((p) => p.id !== proximo.id);
    localStorage.setItem("pacientes", JSON.stringify(restantes));

    setFila(fila.slice(1));
    limparCampos();
  };

  const salvarAtendimento = () => {
    if (!atual) return;
    const registro = {
      ...atual,
      exames: examesSelecionados,
      encaminhamentos: encaminhamentosSelecionados,
      medicamentos: medicamentosSelecionados,
      tratamentos: tratamentosSelecionados,
      diagnostico,
      dataAtendimento: new Date().toISOString(),
    };
    const prontuarios = JSON.parse(localStorage.getItem("prontuarios")) || [];
    prontuarios.push(registro);
    localStorage.setItem("prontuarios", JSON.stringify(prontuarios));

    alert("Atendimento salvo com sucesso!");
    setAtual(null);
    localStorage.removeItem("pacienteAtual");
    limparCampos();
  };

  const limparCampos = () => {
    setExamesSelecionados([]);
    setExameAtual("");
    setEncaminhamentosSelecionados([]);
    setEncaminhamentoAtual("");
    setMedicamentosSelecionados([]);
    setMedicamentoAtual("");
    setTratamentosSelecionados([]);
    setTratamentoAtual("");
    setDiagnostico("");
  };

  const adicionarItem = (item, setItem, lista, setLista) => {
    if (item.trim() && !lista.includes(item)) {
      setLista([...lista, item]);
      setItem("");
    }
  };

  const removerItem = (item, lista, setLista) => {
    setLista(lista.filter((e) => e !== item));
  };

  const sugestoes = {
    exames: [ /* ... */ ],
    medicamentos: [ /* ... */ ],
    encaminhamentos: [ /* ... */ ],
    tratamentos: [ /* ... */ ],
  };

  const renderCampoMultiplo = (
    titulo, item, setItem, lista, setLista, idSugestoes, opcoes
  ) => (
    <div className="bloco">
      <label>{titulo}</label>
      <input
        list={idSugestoes}
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          adicionarItem(item, setItem, lista, setLista)
        }
      />
      <datalist id={idSugestoes}>
        {opcoes.map((op, i) => <option key={i} value={op} />)}
      </datalist>
      <div className="lista-itens">
        {lista.map((it, i) => (
          <div key={i} className="item-selecionado">
            {it} <button onClick={() => removerItem(it, lista, setLista)}>✕</button>
          </div>
        ))}
      </div>
      {lista.length > 1 && (
        <button className="botao-limpar" onClick={() => setLista([])}>
          Limpar todos
        </button>
      )}
    </div>
  );

  return (
    <div className="container-atendimento">
      <h2 className="titulo-atendimento">Atendimento Médico</h2>

      {/* Botão de Consulta abaixo do título */}
      <div className="botoes-container" style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={() => setShowConsulta(true)}
          className="botao-chamar"
        >
          Consulta de Medicamentos
        </button>
      </div>

      {atual ? (
        <div className="card-paciente">
          <h3>Paciente em Atendimento</h3>
          <p><strong>Nome:</strong> {atual.nomeReal}</p>
          <p><strong>Motivo:</strong> {atual.motivo}</p>
          <p>
            <strong>Prioridade:</strong>{" "}
            <span className={`prioridade prioridade-${String(atual.cor).toLowerCase()}`}>
              {String(atual.cor).charAt(0).toUpperCase() + String(atual.cor).slice(1)}
            </span>
          </p>

          {renderCampoMultiplo(
            "📄 Solicitação de Exames:",
            exameAtual,
            setExameAtual,
            examesSelecionados,
            setExamesSelecionados,
            "sugestoes-exames",
            sugestoes.exames
          )}

          {renderCampoMultiplo(
            "📤 Encaminhamentos:",
            encaminhamentoAtual,
            setEncaminhamentoAtual,
            encaminhamentosSelecionados,
            setEncaminhamentosSelecionados,
            "sugestoes-encaminhamentos",
            sugestoes.encaminhamentos
          )}

          {renderCampoMultiplo(
            "💊 Medicamentos:",
            medicamentoAtual,
            setMedicamentoAtual,
            medicamentosSelecionados,
            setMedicamentosSelecionados,
            "sugestoes-medicamentos",
            sugestoes.medicamentos
          )}

          {renderCampoMultiplo(
            "🏥 Tratamentos:",
            tratamentoAtual,
            setTratamentoAtual,
            tratamentosSelecionados,
            setTratamentosSelecionados,
            "sugestoes-tratamentos",
            sugestoes.tratamentos
          )}

          <div className="bloco">
            <label>📝 Diagnóstico / Observações:</label>
            <textarea
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </div>

          <div className="botoes-container">
            <button onClick={salvarAtendimento} className="botao-salvar">
              Salvar Atendimento
            </button>
          </div>
        </div>
      ) : (
        <p className="texto-nenhum">Nenhum paciente em atendimento.</p>
      )}

      <div className="botoes-container">
        <button onClick={chamarProximo} className="botao-chamar">
          Chamar Próximo
        </button>
      </div>

      {showConsulta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl max-h-[80vh] overflow-y-auto p-6 rounded-lg relative shadow-lg">
            {/* Botão de fechar */}
            <button
              onClick={() => setShowConsulta(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              aria-label="Fechar"
            >
              &times;
            </button>
            <ConsultaRemedios />
          </div>
        </div>
      )}
    </div>
  );
}
