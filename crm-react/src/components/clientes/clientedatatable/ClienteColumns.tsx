import { Pencil, Trash } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import Cliente from "../../../models/Cliente";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<Cliente>();

export function createClienteColumns() {
  const navigate = useNavigate();

  return [
    columnHelper.accessor("foto", {
      header: "Foto",
      cell: (info) => {
        const url = info.getValue();
        return url ? (
          <div className="w-10 h-10 relative">
            <img
              src={url}
              alt="Foto do cliente"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src =
                  "https://ik.imagekit.io/vzr6ryejm/profile/usuario.svg?updatedAt=1729485119852";
              }}
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xs">Sem foto</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("nome", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("historico", {
      header: "Histórico",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => {
        const id = info.row.original.id; // Obtém o ID do cliente
        return (
          <div className="flex items-center justify-center gap-2">
            {/* Botão de edição redireciona para a rota de edição */}
            <button onClick={() => navigate(`/atualizarcliente/${id}`)}>
              <Pencil size={32} className="h-4 w-4 text-blue-500" />
            </button>

            {/* Botão de exclusão pode manter o comportamento de ação */}
            <button onClick={() => navigate(`/deletarcliente/${id}`)}>
              <Trash size={32} className="h-4 w-4 text-red-500" />
            </button>
          </div>
        );
      },
    }),
  ];
}
