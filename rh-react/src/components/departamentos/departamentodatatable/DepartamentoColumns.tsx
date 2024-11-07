import { Pencil, Trash } from '@phosphor-icons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import Departamento from '../../../models/Departamento'

const columnHelper = createColumnHelper<Departamento>()

export function createDepartamentoColumns() {
	const navigate = useNavigate()

	return [
		columnHelper.accessor('icone', {
			header: 'Ícone',
			cell: (info) => {
				const url = info.getValue()
				return url ? (
					<div className="w-10 h-10 relative">
						<img
							src={url}
							alt="Foto do cliente"
							className="w-full h-full object-cover rounded-full"
							onError={(e) => {
								e.currentTarget.src =
									'https://ik.imagekit.io/vzr6ryejm/rh/icones/smiley-sad.svg?updatedAt=1730246853172'
							}}
						/>
					</div>
				) : (
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
						<span className="text-gray-500 text-xs">Sem foto</span>
					</div>
				)
			},
		}),
		columnHelper.accessor('descricao', {
			header: 'Descrição',
			cell: (info) => info.getValue(),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Ações',
			cell: (info) => {
				const id = info.row.original.id
				return (
					<div className="flex items-center justify-center gap-2">
						<button
							onClick={() =>
								navigate(`/atualizardepartamento/${id}`)
							}
						>
							<Pencil
								size={32}
								className="h-5 w-5 text-blue-500"
							/>
						</button>
						<button
							onClick={() =>
								navigate(`/deletardepartamento/${id}`)
							}
						>
							<Trash size={32} className="h-5 w-5 text-red-500" />
						</button>
					</div>
				)
			},
		}),
	]
}
