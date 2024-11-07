import { useContext, useEffect, useState } from "react";
import Oportunidade from "../../../models/Oportunidade";
import { listar } from "../../../services/Service";
import OportunidadeDataTable from "../oportunidadedatatable/OportunidadeDataTable";
import { DNA } from "react-loader-spinner";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

function ListaOportunidades() {

  const navigate = useNavigate();
  
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarOportunidades() {
    try {
      await listar("/oportunidades", setOportunidades, {
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
    buscarOportunidades();
  }, [oportunidades.length]);

  return (
    <>
      {oportunidades.length === 0 ? (
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
          <OportunidadeDataTable oportunidades={oportunidades} />
        </div>
      )}
    </>
  );
}

export default ListaOportunidades;
