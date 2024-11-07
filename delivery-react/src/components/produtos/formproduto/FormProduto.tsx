import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

import { atualizar, cadastrar, listar } from "../../../services/Services";

import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    descricao: "",
    icone: "",
  });

  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Produto não Encontrada!", "erro");
        retornar();
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Categoria não Encontrado!", "erro");
        retornar();
      }
    }
  }

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias, {
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
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (categoria.id !== 0) {
      setProduto((prevState) => ({
        ...prevState,
        categoria: categoria,
        usuario: usuario,
      }));
    }
  }, [categoria]);

  function handleCategoriaChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = e.target.value;
    if (selectedId) {
      buscarCategoriaPorId(selectedId);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, value } = e.target;

    let preco: string | number = value;

    switch (type) {
      case "number":
      case "range":
        preco = value === "" ? "" : parseFloat(Number(value).toFixed(2));
        break;
      case "date":
        preco = value;
        break;
      default:
        // Se não for um dos tipos acima, verifica se é um número
        if (!isNaN(Number(value)) && value !== "") {
          preco = parseFloat(Number(value).toFixed(2));
        }
    }

    setProduto((prevState) => ({
      ...prevState,
      [e.target.name]: preco,
    }));
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovaProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Produto!", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Produto!", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const categoriaSelecionado = produto.categoria?.id > 0;

  return (
    <div className="container flex flex-col mx-auto mb-8 items-center">
      <h1 className="text-4xl text-center my-4">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaProduto}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Produto</label>
          <input
            value={produto.nome || ""}
            onChange={atualizarEstado}
            type="text"
            placeholder="Insira o nome do Produto"
            id="nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço do Produto</label>
          <input
            value={produto.preco || ""}
            onChange={atualizarEstado}
            type="number"
            step=".01"
            placeholder="Adicione o preço do Produto"
            id="preco"
            name="preco"
            required
            className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex justify-between flex-nowrap">

          <div className="flex flex-col gap-2 w-1/2 px-1">
            <label htmlFor="calorias">Calorias do Produto</label>
            <input
              value={produto.calorias || ""}
              onChange={atualizarEstado}
              type="number"
              step=".01"
              placeholder="Calorias"
              id="calorias"
              name="calorias"
              required
              className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2 px-1">
            <label htmlFor="proteinas">Proteinas do Produto</label>
            <input
              value={produto.proteinas || ""}
              onChange={atualizarEstado}
              type="number"
              step=".01"
              placeholder="Proteínas"
              id="proteinas"
              name="proteinas"
              required
              className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="foto">foto</label>
          <input
            type="text"
            placeholder="Insira uma foto"
            id="foto"
            name="foto"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria</p>
          <select
            name="categoria"
            id="categoria"
            className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
            onChange={handleCategoriaChange}
            value={produto.categoria?.id || ""}
          >
            <option value="" disabled>
              Selecione um Categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!categoriaSelecionado || isLoading}
          className="flex justify-center rounded disabled:bg-slate-200 bg-red-400 
                    hover:bg-red-600 text-white font-bold w-1/2 mx-auto py-2"
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

export default FormProduto;
