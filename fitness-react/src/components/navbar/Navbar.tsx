import { MagnifyingGlass } from "@phosphor-icons/react";
import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="
            w-full 
            bg-gradient-to-b from-emerald-900 to-emerald-600
            text-white 
            flex 
            justify-center 
            py-4
        "
      >
        <div
          className="
                container 
                flex 
                justify-between 
                text-lg
            "
        >
          <Link to="/home">
            <img
              src="https://ik.imagekit.io/vzr6ryejm/fitness/logo_fitness.png?updatedAt=1729955274597"
              alt="Logo"
              className="w-60"
            />
          </Link>

          <div className="flex-1 flex justify-center items-center relative w-30 text-black">
            <form className="w-3/4 flex justify-center">
              <input
                className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
                type="search"
                placeholder="Pesquisar exercício"
                id="busca"
                name="busca"
                required
              />
              <button
                type="submit"
                className="bg-emerald-400 border-emerald-900 hover:bg-emerald-200  border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
              >
                <MagnifyingGlass
                  size={14}
                  weight="bold"
                  className="fill-emerald-900"
                />
              </button>
            </form>
          </div>

          <div className="flex gap-4 py-4">
            <Link to="/exercicios" className="hover:underline">
              Exercícios
            </Link>
            <Link to="/categorias" className="hover:underline">
              Categorias
            </Link>
            <Link to="/cadastrarcategoria" className="hover:underline">
              Cadastrar Categoria
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
            <Link to="/perfil">
              <img
                src={usuario.foto}
                alt={usuario.nome}
                className="border-transparent rounded-full w-8 h-8 object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
