import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import Categoria from '../../../models/Categoria'
import { atualizar, cadastrar, listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormCategoria() {
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

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setCategoria({
			...categoria,
			[e.target.name]: e.target.value,
		})
	}

	async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})

				ToastAlerta('Categoria atualizada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar a Categoria!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})

				ToastAlerta('Categoria cadastrada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar a Categoria!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/categorias')
	}

	return (
		<div className="container flex flex-col items-center justify-center mx-auto">
			<h1 className="text-4xl text-center my-8">
				{id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
			</h1>

			<form
				className="w-1/2 flex flex-col gap-4"
				onSubmit={gerarNovaCategoria}
			>
				<div className="flex flex-col gap-2 ">
					<label htmlFor="descricao">Descrição</label>
					<input
						type="text"
						placeholder="Insira uma descrição"
						name="descricao"
						className="border-2 border-slate-700 rounded p-2 utral-800"
						required
						value={categoria.descricao}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							atualizarEstado(e)
						}
					/>
				</div>
				<div className="flex flex-col gap-2 ">
					<label htmlFor="icone">Ícone</label>
					<input
						type="text"
						placeholder="Insira um ícone"
						name="icone"
						className="border-2 border-slate-700 rounded p-2 utral-800"
						required
						value={categoria.icone}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							atualizarEstado(e)
						}
					/>
				</div>
				<button
					className="rounded text-white bg-emerald-600 
          hover:bg-emerald-800 w-1/2 py-2 mx-auto flex justify-center"
					type="submit"
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
						<span>
							{id === undefined ? 'Cadastrar' : 'Atualizar'}
						</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormCategoria
