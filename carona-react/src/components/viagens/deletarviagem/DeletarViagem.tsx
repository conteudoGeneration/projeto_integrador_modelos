import { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Viagem from '../../../models/Viagem'
import { deletar, listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarViagem() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [viagem, setViagem] = useState<Viagem>({} as Viagem)

	const { id } = useParams<{ id: string }>()

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarPorId(id: string) {
		try {
			await listar(`/viagens/${id}`, setViagem, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Erro ao localizar a Carona!', 'erro')
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

	async function deletarViagem() {
		setIsLoading(true)

		try {
			await deletar(`/viagens/${id}`, {
				headers: {
					Authorization: token,
				},
			})

			ToastAlerta('Carona Excluída com Sucesso!', 'sucesso')
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Erro ao Excluir a Carona!', 'erro')
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/viagens')
	}

	return (
		<div className="container w-2/4 mx-auto">
			<h1 className="text-4xl text-center py-4">Deletar Viagem</h1>
			<p className="text-center font-semibold mb-4">
				Você tem certeza de que deseja apagar a carona a seguir?
			</p>
			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-cyan-900 text-white font-bold text-2xl">
					Carona
				</header>
				<p className="p-4 text-2xl bg-white h-full">Partida: {viagem.partida}</p>
				<p className="px-4 py-2 text-2xl bg-white h-full">Destino: {viagem.destino}</p>
				<p className="p-4 text-2xl bg-white h-full">Criado por: {viagem.usuario?.nome}</p>

				<div className="flex">
					<button
						className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
						onClick={retornar}
					>
						Não
					</button>
					<button
						className="w-full text-slate-100 bg-teal-500 hover:bg-teal-700
                         flex items-center justify-center"
						onClick={deletarViagem}
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
export default DeletarViagem
