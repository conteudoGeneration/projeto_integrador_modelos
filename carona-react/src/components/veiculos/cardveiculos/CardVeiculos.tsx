import { CarProfile, Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";

interface CardVeiculoProps {
	veiculo: Veiculo;
}

function CardVeiculos({ veiculo }: CardVeiculoProps) {
	return (
		<div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white mx-4 my-10 hover:shadow-lg">
			<div className="flex justify-between items-center p-2 bg-cyan-700">
				<div className="flex items-center">
					<CarProfile size={28} className="mr-1 fill-blue-200" />
					<p className="text-xl text-left text-white font-bold p-2">
						Veículo
					</p>
				</div>

				<div className="flex justify-center gap-2 items-center">
					<Link to={`/atualizarveiculo/${veiculo.id}`}>
						<Pencil
							size={24}
							className="mr-1 fill-white hover:fill-green-500"
						/>
					</Link>

					<Link to={`/deletarveiculo/${veiculo.id}`}>
						<Trash
							size={24}
							className="mr-1 fill-white hover:fill-red-300"
						/>
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center py-2">
				<img
					src={veiculo.foto}
					className="mt-1 h-36 w-auto m-2 object-contain rounded-lg "
					alt={veiculo.modelo}
				/>

				<div className="p-4">
					<div className="min-h-12 flex items-center justify-center">
						<p className="text-sm text-center uppercase">
							{veiculo.modelo}
						</p>
					</div>
					<p className="text-sm text-center p-2">
						Placa: {veiculo.placa}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CardVeiculos;
