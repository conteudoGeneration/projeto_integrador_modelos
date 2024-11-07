import { SignOut } from "@phosphor-icons/react";
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
      <div className="flex justify-center bg-zinc-900 py-4 w-full text-white">
        <div className="flex justify-between text-lg container">
          <Link to="/home">
            <img
              src="https://ik.imagekit.io/vzr6ryejm/crm/logo_crm.png?updatedAt=1729365177919"
              alt="Logo"
              className="w-36"
            />
          </Link>

          <div className="flex gap-4 py-4">
            <Link to="/clientes" className="hover:underline">
              Clientes
            </Link>
            <Link to="/oportunidades" className="hover:underline">
              Oportunidades
            </Link>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/Perfil">
              <img
                src={usuario.foto}
                alt={usuario.nome}
                className="border-transparent rounded-full w-8 h-8"
              />
            </Link>
            <Link to="" onClick={logout}>
              <SignOut size={32} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
        {component}
    </>
  )
}

export default Navbar;
