import {
	CalendarDots,
	Clock,
	MapPin,
	Pencil,
	Trash,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Viagem from '../../../models/Viagem'
import { formatarData, formatarHora } from '../../../utils/FormatarData'
import { formatarMoeda } from '../../../utils/FormatarMoeda'

interface CardViagemProps {
	viagem: Viagem
}

function CardViagens({ viagem }: CardViagemProps) {

	return (
		<div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white mx-4 my-10 hover:shadow-lg">
			<div className="flex justify-between items-center p-2 bg-cyan-700">
				<div className="flex items-center">
					<img
						src={viagem.usuario?.foto}
						alt={viagem.usuario?.nome}
						className="border-transparent rounded-full w-8 h-8"
					/>
					<p className="text-base text-left text-white font-semibold p-2">
						{viagem.usuario?.nome}
					</p>
				</div>

				<div className="flex justify-center gap-2 items-center">
					<Link to={`/atualizarviagem/${viagem.id}`}>
						<Pencil
							size={24}
							className="mr-1 fill-white hover:fill-green-500"
						/>
					</Link>

					<Link to={`/deletarviagem/${viagem.id}`}>
						<Trash
							size={24}
							className="mr-1 fill-white hover:fill-red-300"
						/>
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center py-2">
				<div className="p-2">
					<div className="min-h-12 flex items-center justify-start">
						<MapPin size={24} className="fill-red-700" />
						<p className="text-sm text-left uppercase font-semibold">
							Partida: {viagem.partida}
						</p>
					</div>
					<div className="min-h-12 flex items-center justify-start">
						<MapPin size={24} className="fill-green-700" />
						<p className="text-sm text-left uppercase font-semibold">
							Destino: {viagem.destino}
						</p>
					</div>

					<div className="flex py-2 gap-4">
						<div className="flex items-center gap-1">
							<CalendarDots size={24} />
							<p>{formatarData(viagem.dataPartida)}</p>
						</div>
						<div className="flex items-center gap-1">
							<Clock size={24} />
							<p>{formatarHora(viagem.dataPartida)}</p>
						</div>
					</div>

					<h3 className="py-2 text-xl text-left font-bold uppercase">
						{formatarMoeda(viagem.valor)}
					</h3>

					<div className="flex flex-col bg-sky-100 mt-3 p-2 rounded-lg">
						<h4 className="text-sm font-semibold py-1">
							Detalhes da Carona:
						</h4>
						<p className="text-sm text-left py-1">
							Distância: {viagem.distancia} Km
						</p>
						<p className="text-sm text-left py-1">
							Velocidade Média: {viagem.velocidadeMedia} Km²
						</p>
						<p className="text-sm text-left py-1">
							Tempo Estimado: {viagem.tempoEstimado}
						</p>
					</div>

					<div className="flex flex-col items-start bg-green-200 mt-3 p-2 rounded-lg">
						<h4 className="text-sm font-semibold py-1">Veículo:</h4>

						<div className="flex items-center">
							<img
								src={viagem.veiculo?.foto}
								alt={viagem.veiculo?.modelo}
								className="border-transparent rounded-lg w-20 h-16 object-fit"
							/>
							<p className="text-base text-left text-black font-semibold p-2">
								{viagem.veiculo?.modelo}
							</p>
						</div>
					</div>
				</div>
			</div>

			<button
				className="w-full text-white bg-blue-500 hover:bg-blue-600 flex items-center justify-center py-2"
			>
				Contratar
			</button>
		</div>
	)
}

export default CardViagens
