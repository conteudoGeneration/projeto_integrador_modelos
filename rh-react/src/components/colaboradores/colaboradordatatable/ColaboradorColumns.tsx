import { Money, Pencil, Trash } from '@phosphor-icons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import Colaborador from '../../../models/Colaborador'
import { formatarMoeda } from '../../../utils/FormatarMoeda'

interface CreateColaboradorColumnsProps {
	onSalario: (oportunidade: Colaborador) => void
}

const columnHelper = createColumnHelper<Colaborador>()

export function createColaboradorColumns({
	onSalario,
}: CreateColaboradorColumnsProps) {
	const navigate = useNavigate()

	return [
		columnHelper.accessor('foto', {
			header: 'Foto',
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
									'https://ik.imagekit.io/vzr6ryejm/profile/usuario.svg?updatedAt=1729485119852'
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
		columnHelper.accessor('nome', {
			header: 'Nome',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('email', {
			header: 'E-mail',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('cargo', {
			header: 'Cargo',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('salario', {
			header: 'Salário',
			cell: (info) => {
				const valor = info.getValue()
				return formatarMoeda(valor)
			},
		}),
		columnHelper.accessor('departamento.descricao', {
			header: 'Departamento',
			cell: (info) => {
				const url = info.row.original.departamento?.icone
				return (
					<div className="flex items-center gap-3">
						{url ? (
							<div className="w-8 h-8 relative">
								<img
									src={url}
									alt="Ícone do departamento"
									className="w-full h-full object-cover rounded-full"
									onError={(e) => {
										e.currentTarget.src =
											'https://ik.imagekit.io/vzr6ryejm/rh/icones/smiley-sad.svg?updatedAt=1730246853172'
									}}
								/>
							</div>
						) : (
							<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
								<span className="text-gray-500 text-xs">
									Sem ícone
								</span>
							</div>
						)}
						<span className="text-gray-900">{info.getValue()}</span>
					</div>
				)
			},
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
								navigate(`/atualizarcolaborador/${id}`)
							}
						>
							<Pencil
								size={32}
								className="h-5 w-5 text-blue-500"
							/>
						</button>
						<button
							onClick={() =>
								navigate(`/deletarcolaborador/${id}`)
							}
						>
							<Trash size={32} className="h-5 w-5 text-red-500" />
						</button>
						<button
							onClick={() => onSalario(info.row.original)}
						>
							<Money
								size={32}
								className="h-5 w-5 text-green-500"
							/>
						</button>
					</div>
				)
			},
		}),
	]
}
