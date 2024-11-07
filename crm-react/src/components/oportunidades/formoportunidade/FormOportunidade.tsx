import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

import { atualizar, cadastrar, listar } from "../../../services/Service";

import { AuthContext } from "../../../contexts/AuthContext";
import Cliente from "../../../models/Cliente";
import Oportunidade from "../../../models/Oportunidade";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormOportunidade() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    email: "",
    foto: "",
    historico: "string",
  });

  const [oportunidade, setOportunidade] = useState<Oportunidade>(
    {} as Oportunidade
  );

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarOportunidadePorId(id: string) {
    try {
      await listar(`/oportunidades/${id}`, setOportunidade, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Oportunidade não Encontrada!", "erro");
        retornar();
      }
    }
  }

  async function buscarClientePorId(id: string) {
    try {
      await listar(`/clientes/${id}`, setCliente, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Cliente não Encontrado!", "erro");
        retornar();
      }
    }
  }

  async function buscarClientes() {
    try {
      await listar(`/clientes`, setClientes, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarClientes();
    if (id !== undefined) {
      buscarOportunidadePorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (cliente.id !== 0) {
      setOportunidade((prevState) => ({
        ...prevState,
        cliente: cliente,
        usuario: usuario,
      }));
    }
  }, [cliente]);

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setOportunidade((prevState) => ({
      ...prevState,
      status: parseInt(e.target.value),
    }));
  }

  function handleClienteChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = e.target.value;
    if (selectedId) {
      buscarClientePorId(selectedId);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    
    const { type, value } = e.target;

    let valor: string | number = value;

    switch (type) {
      case "number":
      case "range":
        valor = value === "" ? "" : parseFloat(Number(value).toFixed(2));
        break;
      case "date":
        valor = value;
        break;
      default:
        // Se não for um dos tipos acima, verifica se é um número
        if (!isNaN(Number(value)) && value !== "") {
          valor = parseFloat(Number(value).toFixed(2));
        }
    }

    setOportunidade((prevState) => ({
      ...prevState,
      [e.target.name]: valor,
    }));
  }

  function retornar() {
    navigate("/oportunidades");
  }

  async function gerarNovaOportunidade(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/oportunidades`, oportunidade, setOportunidade, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Oportunidade atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Oportunidade!", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/oportunidades`, oportunidade, setOportunidade, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Oportunidade cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Oportunidade!", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const clienteSelecionado = oportunidade.cliente?.id > 0;

  return (
    <div className="container flex flex-col mx-auto mb-8 items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Oportunidade" : "Cadastrar Oportunidade"}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4"
        onSubmit={gerarNovaOportunidade}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Oportunidade</label>
          <input
            value={oportunidade.nome || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui o nome da Oportunidade"
            id="nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="valor">Valor da Oportunidade</label>
          <input
            value={oportunidade.valor || ""}
            onChange={atualizarEstado}
            type="number"
            step=".01"
            placeholder="Adicione aqui o valor do Oportunidade"
            id="valor"
            name="valor"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="dataFechamento">Data de Fechamento</label>
          <input
            type="date"
            id="dataFechamento"
            name="dataFechamento"
            placeholder="Data de Fechamento"
            className="border-2 border-slate-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onChange={atualizarEstado}
            value={oportunidade.dataFechamento || ""}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Status da Oportunidade</p>
          <select
            name="status"
            id="status"
            className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onChange={handleStatusChange}
            value={oportunidade.status || "1"}
          >
            <option value="1">Aberta</option>
            <option value="2">Fechada</option>
            <option value="3">Perdida</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>Cliente</p>
          <select
            name="cliente"
            id="cliente"
            className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onChange={handleClienteChange}
            value={oportunidade.cliente?.id || ""}
          >
            <option value="" disabled>
              Selecione um Cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!clienteSelecionado || isLoading}
          className="flex justify-center rounded disabled:bg-slate-200 bg-slate-400 
                    hover:bg-slate-800 text-white font-bold w-1/2 mx-auto py-2"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormOportunidade;
