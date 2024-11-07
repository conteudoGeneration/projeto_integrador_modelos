import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";
import { atualizar, cadastrar, listar } from "../../../services/Services";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormVeiculo() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/veiculos/${id}`, setVeiculo, {
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
    setVeiculo({
      ...veiculo,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoVeiculo(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/veiculos`, veiculo, setVeiculo, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Veículo atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao atualizar o Veículo!', 'erro')
        }
      }
    } else {
      try {
        await cadastrar(`/veiculos`, veiculo, setVeiculo, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Veículo cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao cadastrar o Veículo!', 'erro')
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/veiculos");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto mb-8">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Veículo" : "Editar Veículo"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoVeiculo}>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="modelo">Modelo do veículo</label>
          <input
            type="text"
            placeholder="Adicione o modelo do veiculo"
            name="modelo"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.modelo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="placa">Placa do veículo</label>
          <input
            type="text"
            placeholder="Adicione a placa do Veículo"
            name="placa"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.placa}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label htmlFor="foto">Foto do veículo</label>
          <input
            type="text"
            placeholder="Adicione a foto do Veiculo"
            name="foto"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-cyan-600 
          hover:bg-cyan-900 w-1/2 py-2 mx-auto flex justify-center"
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

export default FormVeiculo;
