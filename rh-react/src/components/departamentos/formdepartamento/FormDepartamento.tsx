import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Departamento from "../../../models/Departamento";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormDepartamento() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departamento, setDepartamento] = useState<Departamento>({} as Departamento);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/departamentos/${id}`, setDepartamento, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setDepartamento({
      ...departamento,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaDepartamento(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/departamentos`, departamento, setDepartamento, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Departamento atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao atualizar o Departamento!', 'erro')
        }
      }
    } else {
      try {
        await cadastrar(`/departamentos`, departamento, setDepartamento, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Departamento cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao cadastrar o Departamento!', 'erro')
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/departamentos");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mb-8">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Departamento" : "Editar Departamento"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaDepartamento}>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            placeholder="Descrição do Departamento"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={departamento.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="icone">Foto</label>
          <input
            type="text"
            placeholder="Ícone do Departamento"
            name="icone"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            value={departamento.icone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
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
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormDepartamento;
