import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletar, listar } from '../../../services/Services'
import Categoria from '../../../models/Categoria'
import { RotatingLines } from 'react-loader-spinner'
import { AuthContext } from '../../../contexts/AuthContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarCategoria() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

	const { id } = useParams<{ id: string }>()

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarPorId(id: string) {
		try {
			await listar(`/categorias/${id}`, setCategoria, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Categoria não Encontrada!', 'erro')
				retornar()
			}
		}
	}

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
		}
	}, [id])

	async function deletarCategoria() {
		setIsLoading(true)

		try {
			await deletar(`/categorias/${id}`, {
				headers: {
					Authorization: token,
				},
			})

			ToastAlerta('Categoria apagada!', 'sucesso')
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Erro ao Excluir Categoria!', 'erro')
				retornar()
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/categorias')
	}

	return (
		<div className="container w-1/3 mx-auto">
			<h1 className="text-4xl text-center py-4">Deletar Categoria</h1>
			<p className="text-center font-semibold mb-4">
				Você tem certeza de que deseja apagar a categoria a seguir?
			</p>
			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-gradient-to-b from-yellow-400 to-yellow-200  text-slate-800 font-semibold text-2xl">
					Categoria
				</header>
				<p className="p-8 text-3xl bg-white h-full">
					{categoria.descricao}
				</p>
				<div className="flex">
					<button
						className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
						onClick={retornar}
					>
						Não
					</button>
					<button
						className="w-full text-slate-100 bg-teal-400 hover:bg-teal-700
                         flex items-center justify-center"
						onClick={deletarCategoria}
					>
						{isLoading ? (
							<RotatingLines
								strokeColor="white"
								strokeWidth="5"
								animationDuration="0.75"
								width="24"
								visible={true}
							/>
						) : (
							<span>Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
export default DeletarCategoria
