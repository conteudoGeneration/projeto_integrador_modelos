import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import Departamento from "../../../models/Departamento";
import { listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import DepartamentoDataTable from "../departamentodatatable/DepartamentoDataTable";


function ListaDepartamentos() {

  const navigate = useNavigate();
  
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarDepartamentoes() {
    try {
      await listar("/departamentos", setDepartamentos, {
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
    buscarDepartamentoes();
  }, [departamentos.length]);

  return (
    <>
      {departamentos.length === 0 ? (
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
          <DepartamentoDataTable departamentos={departamentos} />
        </div>
      )}
    </>
  );
}

export default ListaDepartamentos;
