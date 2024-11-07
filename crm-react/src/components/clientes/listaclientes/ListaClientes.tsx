import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Cliente from "../../../models/Cliente";
import { listar } from "../../../services/Service";
import ClienteDataTable from "../clientedatatable/ClienteDataTable";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaClientes() {

  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarClientes() {
    try {
      await listar("/clientes", setClientes, {
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
    buscarClientes();
  }, [clientes.length]);

  return (
    <>
      {clientes.length === 0 ? (
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
          <ClienteDataTable clientes={clientes} />
        </div>
      )}
    </>
  );
}

export default ListaClientes;
