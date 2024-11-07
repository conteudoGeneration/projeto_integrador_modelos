import {
	MagnifyingGlass,
	Plus,
	SkipBack,
	SkipForward,
} from '@phosphor-icons/react'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Departamento from '../../../models/Departamento'
import { createDepartamentoColumns } from './DepartamentoColumns'

interface DepartamentoDataTableProps {
	departamentos: Departamento[]
}

function DepartamentoDataTable({ departamentos }: DepartamentoDataTableProps) {
	const navigate = useNavigate()

	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')

	const columns = createDepartamentoColumns()

	const table = useReactTable({
		data: departamentos,
		columns,
		state: {
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	})

   // Personaliza o tamanhos das colunas de acordo com o índice
   const getColumnSpan = (index: number) => {
    if (index === 1) return 'col-span-10';
    return 'cols-span-1';
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
						placeholder="Pesquisar departamentos..."
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
					/>
				</div>
				<button
					onClick={() => navigate('/cadastrardepartamento')}
					className="flex items-center gap-2 bg-teal-400 hover:bg-teal-600 px-4 py-2 text-white font-bold rounded-xl"
				>
					<Plus size={32} className="h-4 w-4" />
					Novo Departamento
				</button>
			</div>

			{/* Cabeçalho com grid layout */}
			<div className="border rounded-lg">
				<div className="grid grid-cols-12 bg-gray-50 font-bold text-gray-500 text-base text-center uppercase tracking-wider">
					{columns.map((column, index) => (
						<div
							key={column.id}
							className={`py-3 ${getColumnSpan(index)}`}
						>
							{typeof column.header === 'string'
								? column.header
								: ''}
						</div>
					))}
				</div>

				{/* Corpo da tabela com grid layout */}
				<div className="divide-y divide-gray-200">
					{table.getRowModel().rows.map((row) => (
						<div
							key={row.id}
							className="grid grid-cols-12 text-gray-500 text-base whitespace-nowrap"
						>
							{row.getVisibleCells().map((cell, index) => (
								<div
                  key={cell.id}
                  className={`flex items-center px-3 py-4 ${getColumnSpan(index)} ${
                    index === 0 || index === 2 ? "justify-center" : "justify-start"
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

			{/* Paginação do Data Table */}
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
					Página {table.getState().pagination.pageIndex + 1} de{' '}
					{table.getPageCount()}
				</span>
			</div>
		</div>
	)
}

export default DepartamentoDataTable
