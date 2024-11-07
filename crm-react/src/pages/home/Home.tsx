import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className="min-h-[80vh] bg-gray-300 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-zinc-900 text-5xl font-bold subpixel-antialiased">
              Seja Bem Vinde!
            </h2>
            <p className="text-zinc-900 text-xl text-center subpixel-antialiased">
              Conecte, Simplifique, Cresça! <br /> Tudo o que você precisa em um
              único CRM.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/vzr6ryejm/crm/home_02.png?updatedAt=1729405554760"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
