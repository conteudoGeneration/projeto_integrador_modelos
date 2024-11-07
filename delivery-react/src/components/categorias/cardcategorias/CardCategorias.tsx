import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'

interface CardCategoriaProps {
	categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {
	return (
		<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
			<header className="py-2 px-6 text-slate-800 font-semibold text-2xl bg-gradient-to-b from-yellow-400 to-yellow-200">
				Categoria
			</header>
			<div className="bg-white flex justify-start items-center">
				<img
					src={categoria.icone}
					alt={`Ícone da Categoria ${categoria.descricao}`}
					className="w-20 h-20 ml-4 p-4"
				/>
				<p className="px-4 py-8 text-3xl h-full">
					{categoria.descricao}
				</p>
			</div>
			<div className="flex">
				<Link
					to={`/atualizarcategoria/${categoria.id}`}
					className="w-full text-slate-100 bg-teal-500 hover:bg-teal-700 
                        flex items-center justify-center py-2"
				>
					<button>Editar</button>
				</Link>

				<Link
					to={`/deletarcategoria/${categoria.id}`}
					className="text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                        flex items-center justify-center"
				>
					<button>Deletar</button>
				</Link>
			</div>
		</div>
	)
}

export default CardCategorias
