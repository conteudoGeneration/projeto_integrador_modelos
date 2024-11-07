import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Cliente from "../../../models/Cliente";
import { deletar, listar } from "../../../services/Service";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCliente() {
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

  async function deletarCliente() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Cliente apagado com sucesso", 'sucesso');
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao deletar o Cliente!', 'erro')
        }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center py-4">Deletar Cliente</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a cliente a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-zinc-600 text-white font-bold text-2xl">
          Cliente
        </header>
        <p className="p-8 text-3xl bg-white h-full">{cliente.nome}</p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-teal-400 hover:bg-teal-600
                         flex items-center justify-center"
            onClick={deletarCliente}
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
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarCliente;
