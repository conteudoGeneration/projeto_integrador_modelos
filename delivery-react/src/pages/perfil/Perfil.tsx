import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="m-4 mx-auto rounded-2xl overflow-hidden container">
      <img
        className="border-white border-b-8 w-full h-72 object-cover object-top"
        src="https://ik.imagekit.io/vzr6ryejm/food/fundo_15_2.jpeg?updatedAt=1729751091333"
        alt="Capa do Perfil"
      />

      <img
        className="relative z-10 border-8 border-white mx-auto mt-[-8rem] rounded-full w-56"
        src={usuario.foto}
        alt={`Foto de perfil de ${usuario.nome}`}
      />

      <div className="relative flex flex-col justify-center items-center bg-yellow-300 mt-[-6rem] h-72 text-2xl text-black">
        <p>Nome: {usuario.nome} </p>
        <p>Email: {usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;
