import { ArrowsClockwise, Pencil, Trash } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import Oportunidade from "../../../models/Oportunidade";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utils/FormatarData";
import { formatarMoeda } from "../../../utils/FormatarMoeda";

const columnHelper = createColumnHelper<Oportunidade>();

interface CreateOportunidadeColumnsProps {
  onStatus: (oportunidade: Oportunidade) => void;
}

export function createOportunidadeColumns({
  onStatus,
}: CreateOportunidadeColumnsProps) {
  const navigate = useNavigate();

  return [
    columnHelper.accessor("nome", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("valor", {
      header: "Valor",
      cell: (info) => {
        const valor = info.getValue();
        return formatarMoeda(valor);
      },
    }),
    columnHelper.accessor("dataAbertura", {
      header: "Abertura",
      cell: (info) => {
        const data = info.getValue();
        return data ? new Date(data).toLocaleDateString("pt-BR") : "";
      },
    }),
    columnHelper.accessor("dataFechamento", {
      header: "Término",
      cell: (info) => {
        const data = info.getValue();
        return data ? formatarData(data) : "";
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        switch (status) {
          case 1:
            return (
              <div className="bg-yellow-100 text-zinc-800 font-bold rounded-full px-4 py-1 max-w-[60] flex justify-center">
                Aberta
              </div>
            );
          case 2:
            return (
              <div className="bg-green-100 text-green-700 font-bold rounded-full px-4 py-1 w-[90] flex justify-center">
                Fechada
              </div>
            );
          case 3:
            return (
              <div className="bg-red-100 text-red-700 font-bold rounded-full px-4 py-1 w-[60] flex justify-center">
                Perdida
              </div>
            );
          default:
            return (
              <span className="bg-gray-100 text-gray-700 font-bold rounded-full px-4 py-1 w-[60] flex justify-center">
                Desconhecida
              </span>
            );
        }
      },
    }),
    columnHelper.accessor("cliente.nome", {
      header: "Cliente",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("usuario.nome", {
      header: "Contato",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => {
        const id = info.row.original.id;
        return (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => navigate(`/atualizaroportunidade/${id}`)}>
              <Pencil size={32} className="h-4 w-4 text-blue-500" />
            </button>
            <button onClick={() => navigate(`/deletaroportunidade/${id}`)}>
              <Trash size={32} className="h-4 w-4 text-red-500" />
            </button>
            <button onClick={() => onStatus(info.row.original)}>
              <ArrowsClockwise size={32} className="h-4 w-4 text-green-600" />
            </button>
          </div>
        );
      },
    }),
  ];
}
