import {
  MagnifyingGlass,
  Plus,
  SkipBack,
  SkipForward,
} from "@phosphor-icons/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Colaborador from "../../../models/Colaborador";
import CalcularSalarioModal from "../../calcularsalario/modal/CalcularSalarioModal";
import { createColaboradorColumns } from "./ColaboradorColumns";

interface ColaboradorDataProps {
  colaboradores: Colaborador[];
}

function ColaboradorData({ colaboradores }: ColaboradorDataProps) {
  
  const navigate = useNavigate();

  // Estado responsável pela ordenação dos dados
  const [sorting, setSorting] = useState<SortingState>([]);

  // Estado responsável pela filtragem dos dados
  const [globalFilter, setGlobalFilter] = useState("");

  // Estado responsável por selecionar a Colaborador que terá o status modificado
  const [selectedColaborador, setSelectedColaborador] =
    useState<Colaborador | null>(null);
  
  // Estado responsável por controlar o carregamento do Modal
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Função responsável por selecionar a oportunidade e abrir o Modal
  const handleSalario = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setIsPopupOpen(true);
  };

  // Carrega o modelo de colunas do Data Table
  const columns = createColaboradorColumns({
    onSalario: handleSalario,
  });

  // Cria o Data Table com as respectivas propriedades
  const table = useReactTable({
    data: colaboradores, // Dados
    columns, // Colunas
    state: {
      sorting, // Estado atual da Ordenação
      globalFilter, // Estado atual do Filtro
    },
    onSortingChange: setSorting, // Atualiza o estado Ordenação
    onGlobalFilterChange: setGlobalFilter, // Atualiza o estado Filtro
    getCoreRowModel: getCoreRowModel(), // Processa os dados básicos da tabela
    getSortedRowModel: getSortedRowModel(), // Adiciona a Ordenação
    getPaginationRowModel: getPaginationRowModel(), // Adiciona Paginação
    getFilteredRowModel: getFilteredRowModel(), // Adiciona a Filtragem de dados
    initialState: {
      pagination: {
        pageSize: 5, // Número de linhas (colaboradors) por página
      },
    },
  });

  // Personaliza o tamanhos das colunas de acordo com o índice
  const getColumnSpan = (index: number) => {
    if (index === 0 || index == 6) return 'col-span-1';
    return 'col-span-2';
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <MagnifyingGlass
            size={32}
            className="absolute left-2 top-1.5 h-4 w-4 text-gray-500"
          />
          <input
            placeholder="Pesquisar colaboradores..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => navigate("/cadastrarcolaborador")}
          className="flex items-center gap-2 bg-teal-400 hover:bg-teal-600 px-4 py-2 text-white font-bold rounded-xl"
        >
          <Plus size={32} className="h-4 w-4" />
          Novo Colaborador
        </button>
      </div>

      <div className="border rounded-lg">

        {/* 
        
          *** cabeçalho das colunas ***
        
          columns.map((column, index) => (...))}:

          map: Itera sobre o array de colunas que definimos no Componente Colaborador Columns
               Para cada coluna, cria uma div de cabeçalho
          
          index: é usado para determinar o tamanho da coluna

          key={column.id} é necessário para o React identificar cada elemento único
          
          getColumnSpan(index): determina quantas colunas cada célula do cabeçalho ocupará

          {typeof column.header === 'string' ? column.header : ''}: Verifica se o header é uma string
          Se for string, mostra o texto do cabeçalho, caso contrário, mostra vazio

        */}
        <div className="grid grid-cols-12 bg-gray-50 font-bold text-gray-500 text-base text-center uppercase tracking-wider">
					{columns.map((column, index) => (
						<div
							key={column.id}
							className={`${getColumnSpan(index)} py-3`}
						>
							{typeof column.header === 'string'
								? column.header
								: ''}
						</div>
					))}
				</div>

        {/* 
          *** Corpo do grid ***
        
          table.getRowModel(): Obtém o modelo de dados processado (já filtrado, ordenado e paginado)
          
          .rows: Acessa o array de linhas
          
          .map: Itera sobre cada linha para renderizar na tela
          
          key={row.id}: Identificador único para cada linha (igual ao Card)
          
          getVisibleCells(): Obtém apenas as células visíveis da linha 
          (definidas em ColaboradorColumns)
          
          .map: Itera sobre cada célula
          
          index: Posição da célula na linha
          
          key={cell.id}: Identificador único para cada célula
          
          flexRender(): Função do Data Table que renderiza o conteúdo da célula e 
          as suas propriedades (definidas em ColaboradorColumns)

          getColumnSpan(index): determina quantas colunas cada célula do cabeçalho ocupará

        */}
        <div className="divide-y divide-gray-200">
					{table.getRowModel().rows.map((row) => (
						<div
							key={row.id}
							className="grid grid-cols-12 text-gray-500 text-base whitespace-nowrap"
						>
							{row.getVisibleCells().map((cell, index) => (
								<div
                  key={cell.id}
                  className={`flex items-center px-3 py-4 text-wrap ${getColumnSpan(index)} ${
                    index === 0 || index === 2 ? "justify-center" : ""
                  }`}
                >
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</div>
							))}
						</div>
					))}
				</div>
      </div>

      {/*
        *** Controles de Paginação ***
        
        onClick: o primeiro chama o método previousPage() do Data Table 
        (Ir para a página anterior) e o segundo chama o método nextPage() 
        do Data Table (Ir para a próxima página)
        
        disabled: Desabilita o botão quando não há página anterior ou posterior
        
        getCanPreviousPage(): Retorna false quando está na primeira página
        
        getCanNextPage(): Retorna false quando está na última página
      
        pageIndex + 1: Índice atual da página (soma 1 porque o índice começa em 0)
        
        getPageCount(): Retorna o número total de páginas
      */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <SkipBack size={32} className="h-5 w-5" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <SkipForward size={32} className="h-5 w-5" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
      </div>

      {selectedColaborador && (
        <CalcularSalarioModal
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedColaborador(null);
          }}
          colaborador={selectedColaborador}
        />
      )}

    </div>
  );
}

export default ColaboradorData;
