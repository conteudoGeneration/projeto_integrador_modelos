import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

import { atualizar, cadastrar, listar } from "../../../services/Service";

import { AuthContext } from "../../../contexts/AuthContext";
import Departamento from "../../../models/Departamento";
import Colaborador from "../../../models/Colaborador";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormColaborador() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const [departamento, setDepartamento] = useState<Departamento>({
    id: 0,
    descricao: "",
    icone: "",
  });

  const [colaborador, setColaborador] = useState<Colaborador>(
    {} as Colaborador
  );

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarColaboradorPorId(id: string) {
    try {
      await listar(`/colaboradores/${id}`, setColaborador, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Colaborador não Encontrada!", "erro");
        retornar();
      }
    }
  }

  async function buscarDepartamentoPorId(id: string) {
    try {
      await listar(`/departamentos/${id}`, setDepartamento, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Departamento não Encontrado!", "erro");
        retornar();
      }
    }
  }

  async function buscarDepartamentos() {
    try {
      await listar(`/departamentos`, setDepartamentos, {
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
    buscarDepartamentos();
    if (id !== undefined) {
      buscarColaboradorPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (departamento.id !== 0) {
      setColaborador((prevState) => ({
        ...prevState,
        departamento: departamento,
        usuario: usuario,
      }));
    }
  }, [departamento]);

  function handleDepartamentoChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = e.target.value;
    if (selectedId) {
      buscarDepartamentoPorId(selectedId);
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

    setColaborador((prevState) => ({
      ...prevState,
      [e.target.name]: valor,
    }));
  }

  function retornar() {
    navigate("/colaboradores");
  }

  async function gerarNovaColaborador(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/colaboradores`, colaborador, setColaborador, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Colaborador atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Colaborador!", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/colaboradores`, colaborador, setColaborador, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Colaborador cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Colaborador!", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const departamentoSelecionado = colaborador.departamento?.id > 0;

  return (
    <div className="container flex flex-col mx-auto mb-8 items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Colaborador" : "Cadastrar Colaborador"}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4"
        onSubmit={gerarNovaColaborador}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Colaborador</label>
          <input
            value={colaborador.nome || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui o nome do Colaborador"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail do Colaborador</label>
          <input
            value={colaborador.email || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui o e-mail do Colaborador"
            name="email"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto do Colaborador</label>
          <input
            value={colaborador.foto || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui a foto do Colaborador"
            name="foto"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cargo">Cargo</label>
          <input
            value={colaborador.cargo || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira aqui o cargo do Colaborador"
            name="cargo"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="salario">Salário do Colaborador</label>
          <input
            value={colaborador.salario || ""}
            onChange={atualizarEstado}
            type="number"
            step=".01"
            placeholder="Adicione aqui o salário do Colaborador"
            name="salario"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex justify-between w-full">
						<div className="flex flex-col gap-2 w-1/2 pr-1">
							<label htmlFor="horasMensais">
								Horas/Mês (h)
							</label>
							<input
								value={colaborador.horasMensais}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Horas por mês"
								name="horasMensais"
								required
								className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
						</div>

						<div className="flex flex-col gap-2 w-1/2 pl-1">
							<label htmlFor="dependentes">
								Número de Dependentes
							</label>
							<input
								value={colaborador.dependentes}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Dependentes"
								name="dependentes"
								required
								className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
						</div>
					</div>

        <div className="flex flex-col gap-2">
          <p>Departamento</p>
          <select
            name="departamento"
            id="departamento"
            className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onChange={handleDepartamentoChange}
            value={colaborador.departamento?.id || ""}
          >
            <option value="" disabled>
              Selecione um Departamento
            </option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!departamentoSelecionado || isLoading}
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

export default FormColaborador;
