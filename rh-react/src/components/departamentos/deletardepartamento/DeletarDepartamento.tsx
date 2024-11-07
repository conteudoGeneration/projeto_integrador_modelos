import { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import Departamento from '../../../models/Departamento'
import { deletar, listar } from '../../../services/Service'
import AuthContext from '../../../contexts/AuthContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarDepartamento() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [departamento, setDepartamento] = useState<Departamento>(
		{} as Departamento
	)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	async function buscarPorId(id: string) {
		try {
			await listar(`/departamentos/${id}`, setDepartamento, {
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

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado', 'info')
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
		}
	}, [id])

	async function deletarDepartamento() {
		setIsLoading(true)

		try {
			await deletar(`/departamentos/${id}`, {
				headers: {
					Authorization: token,
				},
			})

			ToastAlerta('Departamento apagado com sucesso', 'sucesso')
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Erro ao deletar o Departamento!', 'erro')
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/departamentos')
	}

	return (
		<div className="container w-1/3 mx-auto">
			<h1 className="text-4xl text-center py-4">Deletar Departamento</h1>
			<p className="text-center font-semibold mb-4">
				Você tem certeza de que deseja apagar a departamento a seguir?
			</p>
			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-slate-800 text-white font-bold text-2xl">
					Departamento
				</header>
				<div className='flex items-center mx-4'>
					<img
						src={departamento.icone}
						alt={departamento.descricao}
						className="w-8 h-8"
					/>
					<p className="px-2 py-8 text-3xl bg-white h-full">
						{departamento.descricao}
					</p>
				</div>
				<div className="flex">
					<button
						className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
						onClick={retornar}
					>
						Não
					</button>
					<button
						className="w-full text-slate-100 bg-teal-400 hover:bg-teal-600
                         flex items-center justify-center"
						onClick={deletarDepartamento}
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
export default DeletarDepartamento
