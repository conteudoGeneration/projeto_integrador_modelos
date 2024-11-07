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
  import Cliente from '../../../models/Cliente'
  import { createClienteColumns } from './ClienteColumns'
  
  interface ClienteDataTableProps {
	clientes: Cliente[]
  }
  
  function ClienteDataTable({ clientes }: ClienteDataTableProps) {
	const navigate = useNavigate()
  
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
  
	const columns = createClienteColumns()
  
	const table = useReactTable({
	  data: clientes,
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
  
	const getColumnSpan = (index: number) => {
	  if (index === 0 || index === 4) return 'col-span-1'
	  else if (index === 3) return 'col-span-4'
	  else return 'col-span-3'
	}
  
	return (
	  <div className="p-4 space-y-4">
		<div className="flex justify-between items-center">
		  <div className="relative w-64">
			<MagnifyingGlass
			  size={32}
			  className="absolute left-2 top-1.5 h-4 w-4 text-gray-500"
			/>
			<input
			  id="cliente"
			  name="cliente"
			  placeholder="Pesquisar clientes..."
			  value={globalFilter}
			  onChange={(e) => setGlobalFilter(e.target.value)}
			  className="pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
			/>
		  </div>
		  <button
			onClick={() => navigate('/cadastrarcliente')}
			className="flex items-center gap-2 bg-teal-400 hover:bg-teal-600 px-4 py-2 text-white font-bold rounded-xl"
		  >
			<Plus size={32} className="h-4 w-4" />
			Novo Cliente
		  </button>
		</div>
  
		<div className="border rounded-lg">
		  {/* Header with grid layout */}
		  <div className="grid grid-cols-12 bg-gray-50 font-bold text-gray-500 text-base text-center uppercase tracking-wider">
			{table.getFlatHeaders().map((header, index) => (
			  <div
				key={header.id}
				className={`${getColumnSpan(index)} py-3 cursor-pointer`}
				onClick={header.column.getToggleSortingHandler()}
			  >
				{flexRender(header.column.columnDef.header, header.getContext())}
			  </div>
			))}
		  </div>
  
		  {/* Table body with grid layout */}
		  <div className="divide-y divide-gray-200">
			{table.getRowModel().rows.map((row) => (
			  <div
				key={row.id}
				className="grid grid-cols-12 text-gray-500 text-base whitespace-nowrap"
			  >
				{row.getVisibleCells().map((cell, index) => (
				  <div
					key={cell.id}
					className={`flex items-center px-3 py-4 ${getColumnSpan(index)} 
					${index === 0 || index === 4 ? 'justify-center' : 'justify-left'}`}
				  >
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				  </div>
				))}
			  </div>
			))}
		  </div>
		</div>
  
		{/* Pagination */}
		<div className="flex items-center justify-between">
		  <div className="flex items-center gap-2">
			<button
			  onClick={() => table.previousPage()}
			  disabled={!table.getCanPreviousPage()}
			  className="disabled:opacity-50"
			>
			  <SkipBack size={32} className="h-5 w-5" />
			</button>
			<button
			  onClick={() => table.nextPage()}
			  disabled={!table.getCanNextPage()}
			  className="disabled:opacity-50"
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
  
  export default ClienteDataTable