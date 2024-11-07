import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'

import { atualizar, cadastrar, listar } from '../../../services/Services'

import { AuthContext } from '../../../contexts/AuthContext'
import Categoria from '../../../models/Categoria'
import Exercicio from '../../../models/Exercicio'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormExercicio() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		descricao: '',
		icone: '',
	})

	const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio)

	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarExercicioPorId(id: string) {
		try {
			await listar(`/exercicios/${id}`, setExercicio, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Exercicio não Encontrada!', 'erro')
				retornar()
			}
		}
	}

	async function buscarCategoriaPorId(id: string) {
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
				ToastAlerta('Categoria não Encontrado!', 'erro')
				retornar()
			}
		}
	}

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
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
		buscarCategorias()
		if (id !== undefined) {
			buscarExercicioPorId(id)
		}
	}, [id])

	useEffect(() => {
		if (categoria.id !== 0) {
			setExercicio((prevState) => ({
				...prevState,
				categoria: categoria,
				usuario: usuario,
			}))
		}
	}, [categoria])

	function handleCategoriaChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			buscarCategoriaPorId(selectedId)
		}
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value } = e.target

		let tempo: string | number = value

		switch (type) {
			case 'number':
			case 'range':
				tempo = value === '' ? '' : parseFloat(Number(value).toFixed(2))
				break
			case 'date':
				tempo = value
				break
			default:
				// Se não for um dos tipos acima, verifica se é um número
				if (!isNaN(Number(value)) && value !== '') {
					tempo = parseFloat(Number(value).toFixed(2))
				}
		}

		setExercicio((prevState) => ({
			...prevState,
			[e.target.name]: tempo,
		}))
	}

	function retornar() {
		navigate('/exercicios')
	}

	async function gerarNovoExercicio(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/exercicios`, exercicio, setExercicio, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Exercicio atualizado com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar o Exercicio!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/exercicios`, exercicio, setExercicio, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Exercicio cadastrado com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar o Exercicio!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	const categoriaSelecionado = exercicio.categoria?.id > 0

	return (
		<div className="container flex flex-col mx-auto mb-8 items-center">
			<h1 className="text-4xl text-center my-4">
				{id !== undefined ? 'Editar Exercicio' : 'Cadastrar Exercicio'}
			</h1>

			<form
				className="flex flex-col w-1/2 gap-4"
				onSubmit={gerarNovoExercicio}
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="nome">Exercicio</label>
					<input
						value={exercicio.nome || ''}
						onChange={atualizarEstado}
						type="text"
						placeholder="Insira o nome do Exercicio"
						name="nome"
						required
						className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="tempo">Tempo do Exercicio (min)</label>
					<input
						value={exercicio.tempo || ''}
						onChange={atualizarEstado}
						type="number"
						step=".01"
						placeholder="Adicione o tempo do Exercicio"
						name="tempo"
						className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex justify-between w-full flex-wrap">

					<div className="flex flex-col gap-1 w-1/2 pr-1">
						<label htmlFor="serie">Séries</label>
						<input
							value={exercicio.serie || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Séries"
							name="serie"
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

					<div className="flex flex-col gap-1 w-1/2 pl-1">
						<label htmlFor="repeticao">Repetições</label>
						<input
							value={exercicio.repeticao || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Repetições"
							name="repeticao"
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

					<div className="flex flex-col gap-1 w-1/2 pr-1">
						<label htmlFor="peso">Peso (Kg)</label>
						<input
							value={exercicio.peso || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Peso (Kg)"
							name="peso"
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

					<div className="flex flex-col gap-1 w-1/2 pl-1">
						<label htmlFor="descanso">Descanso (min)</label>
						<input
							value={exercicio.descanso || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Descanso (min)"
							name="descanso"
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

				</div>

				<div className="flex flex-col gap-1 ">
					<label htmlFor="foto">Foto do Exercício</label>
					<input
						type="text"
						placeholder="Insira uma foto"
						name="foto"
						className="border-2 border-slate-700 rounded p-1 utral-800"
						required
						value={exercicio.foto}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							atualizarEstado(e)
						}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<p>Categoria</p>
					<select
						name="categoria"
						id="categoria"
						className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
						onChange={handleCategoriaChange}
						value={exercicio.categoria?.id || ''}
					>
						<option value="" disabled>
							Selecione um Categoria
						</option>
						{categorias.map((categoria) => (
							<option key={categoria.id} value={categoria.id}>
								{categoria.descricao}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					disabled={!categoriaSelecionado || isLoading}
					className="flex justify-center rounded disabled:bg-slate-200 bg-emerald-600 
                    hover:bg-emerald-800 text-white font-bold w-1/2 mx-auto py-2"
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
							{id !== undefined ? 'Atualizar' : 'Cadastrar'}
						</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormExercicio
