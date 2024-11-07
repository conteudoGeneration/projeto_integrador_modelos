import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Categoria from "../../models/Categoria";
import Exercicio from "../../models/Exercicio";
import { listar } from "../../services/Services";
import { ToastAlerta } from "../../utils/ToastAlerta";
import CardExercicios from "../exercicios/cardexercicios/CardExercicios";

function CatalogoExercicios() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [todosExercicios, setTodosExercicios] = useState<Exercicio[]>([]); // Armazena todos os exercícios
  const [exerciciosFiltrados, setExerciciosFiltrados] = useState<Exercicio[]>([]); // Armazena exercícios filtrados
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function buscarCategorias() {
    try {
      await listar(`/categorias`, setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
        ToastAlerta("Sessão expirada, faça login novamente", "info");
      }
    }
  }

  async function buscarExercicios() {
    try {
      setIsLoading(true);
      setError(null);

      // Faz uma única requisição para buscar todos os exercícios
      await listar('/exercicios', setTodosExercicios, {
        headers: { Authorization: token },
      });

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
        ToastAlerta("Sessão expirada, faça login novamente", "info");
      } else {
        setError("Erro ao buscar exercícios");
        ToastAlerta("Erro ao buscar exercícios", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Efeito para filtrar exercícios localmente quando a categoria é alterada
  useEffect(() => {
    if (todosExercicios.length > 0) {
      if (categoriaSelecionada === null) {
        setExerciciosFiltrados(todosExercicios);
      } else {
        const exerciciosFiltrados = todosExercicios.filter(
          exercicio => exercicio.categoria?.id === categoriaSelecionada
        );
        setExerciciosFiltrados(exerciciosFiltrados);
      }
    }
  }, [categoriaSelecionada, todosExercicios]);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    } else {
      buscarCategorias();
      buscarExercicios();
    }
  }, [token]);

  const handleCategoriaClick = (categoriaId: number | null) => {
    setCategoriaSelecionada(categoriaId);
  };

  const renderExercicios = () => {
    if (!Array.isArray(exerciciosFiltrados)) {
      console.error('exercicios não é um array array:', exerciciosFiltrados);
      return (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            Erro ao carregar exercícios
          </p>
        </div>
      );
    }

    if (exerciciosFiltrados.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            Nenhum exercício foi encontrado{" "}
            {categoriaSelecionada !== null && "nesta categoria"}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exerciciosFiltrados.map((exercicio) => (
          <CardExercicios
            key={exercicio.id}
            exercicio={exercicio}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-emerald-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleCategoriaClick(null)}
              className={`px-6 py-2 w-24 h-24 rounded-lg transition-all duration-300 
                ${categoriaSelecionada === null
                  ? 'bg-emerald-200 text-emerald-700 shadow-lg scale-105'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
                }`}
            >
              Todos
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => handleCategoriaClick(categoria.id)}
                className={`py-3 w-24 h-24 flex flex-col justify-center items-center rounded-lg text-sm transition-all duration-300
                  ${categoriaSelecionada === categoria.id
                    ? 'bg-emerald-200 text-emerald-700 shadow-lg scale-105'
                    : 'bg-white text-emerald-700 hover:bg-emerald-50'
                  }`}
              >
                <img 
                  src={categoria.icone} 
                  alt={categoria.descricao} 
                  className="fill-emerald-100 w-16 h-16"
                />
                <p>{categoria.descricao}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <DNA
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper mx-auto"
            />
          </div>
        ) : (
          <div className="space-y-6">          
            {error ? (
              <div className="text-center py-10">
                <p className="text-xl text-red-600">{error}</p>
              </div>
            ) : (
              renderExercicios()
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogoExercicios;