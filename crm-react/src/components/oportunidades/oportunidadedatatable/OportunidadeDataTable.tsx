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
  import { useContext, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import AuthContext from '../../../contexts/AuthContext'
  import Oportunidade from '../../../models/Oportunidade'
  import MudarStatusModal from '../mudarstatusmodal/MudarStatusModal'
  import { createOportunidadeColumns } from './OportunidadeColumns'
  import { listar } from '../../../services/Service'
  
  interface OportunidadeDataProps {
	oportunidades: Oportunidade[]
  }
  
  function OportunidadeData({ oportunidades }: OportunidadeDataProps) {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
  
	const [data, setData] = useState<Oportunidade[]>(oportunidades)
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [selectedOportunidade, setSelectedOportunidade] = useState<Oportunidade | null>(null)
	const [isPopupOpen, setIsPopupOpen] = useState(false)
  
	const handleStatus = (oportunidade: Oportunidade) => {
	  setSelectedOportunidade(oportunidade)
	  setIsPopupOpen(true)
	}
  
	async function refresh() {
	  try {
		await listar('/oportunidades', setData, {
		  headers: {
			Authorization: token,
		  },
		})
	  } catch (error: any) {
		if (error.toString().includes('401')) {
		  handleLogout()
		}
	  }
	}
  
	const columns = createOportunidadeColumns({
	  onStatus: handleStatus,
	})
  
	const table = useReactTable({
	  data,
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
	  if (index === 5 || index === 6) return 'col-span-2'
	  else if (index === 0) return 'col-span-3'
	  else return 'col-span-1'
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
			  id="oportunidade"
			  name="oportunidade"
			  placeholder="Pesquisar oportunidades..."
			  value={globalFilter}
			  onChange={(e) => setGlobalFilter(e.target.value)}
			  className="pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
			/>
		  </div>
		  <button
			onClick={() => navigate('/cadastraroportunidade')}
			className="flex items-center gap-2 bg-teal-400 hover:bg-teal-600 px-4 py-2 text-white font-bold rounded-xl"
		  >
			<Plus size={32} className="h-4 w-4" />
			Nova Oportunidade
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
					className={`flex items-center px-3 py-4 text-wrap ${getColumnSpan(index)} 
					${index === 4 || index === 7 ? 'justify-center' : 'justify-left'}`}
				  >
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				  </div>
				))}
			  </div>
			))}
		  </div>
		</div>
  
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
  
		{selectedOportunidade && (
		  <MudarStatusModal
			isOpen={isPopupOpen}
			onClose={() => {
			  setIsPopupOpen(false)
			  setSelectedOportunidade(null)
			  refresh()
			}}
			oportunidade={selectedOportunidade}
		  />
		)}
	  </div>
	)
  }
  
  export default OportunidadeData