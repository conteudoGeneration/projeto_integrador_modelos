import { Pencil, Trash } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Exercicio from '../../../models/Exercicio'

interface CardExercicioProps {
	exercicio: Exercicio
}

function CardExercicios({ exercicio }: CardExercicioProps) {
	return (
		<div className="max-w-72 flex flex-col rounded-lg overflow-hidden justify-between bg-white my-10 hover:shadow-lg">
			<div className="flex justify-between items-center p-2 bg-gradient-to-b from-emerald-800 to-emerald-600 text-white">
				<div className="flex flex-start items-center gap-2">
					<img
						src={exercicio.categoria?.icone}
						alt={exercicio?.categoria?.descricao}
						className="border-transparent bg-white p-0.5 rounded-full w-10 h-10"
					/>
					<div>
						{exercicio.categoria ? (
							<p className="text-lg font-semibold">
								{exercicio.categoria?.descricao}
							</p>
						) : (
							''
						)}
					</div>
				</div>
				<div className='flex'>
					<Link to={`/atualizarexercicio/${exercicio.id}`}>
						<Pencil
							size={24}
							className="mr-1 hover:fill-teal-300"
						/>
					</Link>

					<Link to={`/deletarexercicio/${exercicio.id}`}>
						<Trash size={24} className="mr-1 hover:fill-red-300" />
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center py-2">
				<img
					src={exercicio.foto}
					className="h-44 w-auto m-3 object-contain rounded-lg bg-[#F5B731]"
					alt={exercicio.nome}
				/>

				<div className="p-4">
					<div className="min-h-12 flex items-center justify-center">
						<p className="text-base text-center font-semibold uppercase">
							{exercicio.nome}
						</p>
					</div>
					<div className="m-2 p-2 bg-emerald-200 rounded">
						<h6 className="py-1 text-sm font-bold">Treino:</h6>
						<p className="text-sm py-1">
							Tempo: {exercicio.tempo} Minutos
						</p>
						<p className="text-sm py-1">Séries: {exercicio.serie}</p>
						<p className="text-sm py-1">
							Repetições: {exercicio.repeticao}
						</p>
						<p className="text-sm py-1">
							Descanso: {exercicio.descanso} Minutos
						</p>
						<p className="text-sm py-1">Peso: {exercicio.peso} Kg</p>
					</div>
				</div>
			</div>

			<button
				className="w-full text-white bg-blue-500 hover:bg-blue-600 flex items-center justify-center py-2"
				onClick={() => console.log('Comprar')}
			>
				Adicionar
			</button>
		</div>
	)
}

export default CardExercicios
