import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Cliente from "../../../models/Cliente";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCliente() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/clientes/${id}`, setCliente, {
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
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaCliente(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/clientes`, cliente, setCliente, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Cliente atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao atualizar o Cliente!', 'erro')
        }
      }
    } else {
      try {
        await cadastrar(`/clientes`, cliente, setCliente, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Cliente cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao cadastrar o Cliente!', 'erro')
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mb-8">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCliente}>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            placeholder="Nome do Cliente"
            id="nome"
            name="nome"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={cliente.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            placeholder="E-mail do Cliente"
            id="email"
            name="email"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={cliente.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="foto">Foto</label>
          <input
            type="text"
            placeholder="Foto do Cliente"
            id="foto"
            name="foto"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={cliente.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="historico">Histórico</label>
          <input
            type="text"
            placeholder="Histórico do Cliente"
            id="historico"
            name="historico"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={cliente.historico}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-zinc-400 
          hover:bg-zinc-800 w-1/2 py-2 mx-auto flex justify-center"
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

export default FormCliente;
