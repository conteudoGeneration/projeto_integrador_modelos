import { useContext, useEffect, useState } from "react";
import Colaborador from "../../../models/Colaborador";
import { listar } from "../../../services/Service";
import ColaboradorDataTable from "../colaboradordatatable/ColaboradorDataTable";
import { DNA } from "react-loader-spinner";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function ListaColaboradores() {

  const navigate = useNavigate();
  
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarColaboradores() {
    try {
      await listar("/colaboradores", setColaboradores, {
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
    buscarColaboradores();
  }, [colaboradores.length]);

  return (
    <>
      {colaboradores.length === 0 ? (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      ) : (
        <div>
          <ColaboradorDataTable colaboradores={colaboradores} />
        </div>
      )}
    </>
  );
}

export default ListaColaboradores;
