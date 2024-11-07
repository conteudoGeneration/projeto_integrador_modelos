import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'

import { atualizar, cadastrar, listar } from '../../../services/Services'

import { AuthContext } from '../../../contexts/AuthContext'
import Veiculo from '../../../models/Veiculo'
import Viagem from '../../../models/Viagem'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import {
	formatarDataSubmit,
	formatarDataInputDateTime,
} from '../../../utils/FormatarData'

function FormViagem() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [veiculos, setVeiculos] = useState<Veiculo[]>([])

	const [veiculo, setVeiculo] = useState<Veiculo>({
		id: 0,
		modelo: '',
		placa: '',
		foto: '',
	})

	const [viagem, setViagem] = useState<Viagem>({} as Viagem)
	const [dataAlterada, setDataAlterada] = useState(false)

	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarViagemPorId(id: string) {
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
				ToastAlerta('Carona não Encontrada!', 'erro')
				retornar()
			}
		}
	}

	async function buscarVeiculoPorId(id: string) {
		try {
			await listar(`/veiculos/${id}`, setVeiculo, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Veículo não Encontrado!', 'erro')
				retornar()
			}
		}
	}

	async function buscarVeiculos() {
		try {
			await listar(`/veiculos`, setVeiculos, {
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
		buscarVeiculos()
		if (id !== undefined) {
			buscarViagemPorId(id)
		}
	}, [id])

	useEffect(() => {
		if (veiculo.id !== 0) {
			setViagem((prevState) => ({
				...prevState,
				veiculo: veiculo,
				usuario: usuario,
			}))
		}
	}, [veiculo])

	// Handle Data e Hora
	const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		const novaData = e.target.value
		setViagem((prev) => ({ ...prev, dataPartida: novaData }))
		setDataAlterada(true) // Indica que a data foi modificada
	}

	// Handle Select Veiculo
	function handleVeiculoChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			buscarVeiculoPorId(selectedId)
		}
	}

	// Handle dos Inputs
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value } = e.target

		let valor: string | number = value

		switch (type) {
			case 'number':
			case 'range':
				valor = value === '' ? '' : parseFloat(Number(value).toFixed(2))
				break
			case 'date':
				valor = value // Input do tipo text
				break
			default:
				// Se não for um dos tipos acima, verifica se é um número
				if (!isNaN(Number(value)) && value !== '') {
					valor = parseFloat(Number(value).toFixed(2))
				}
		}

		setViagem({
			...viagem,
			[e.target.name]: valor,
		})
	}

	function retornar() {
		navigate('/viagens')
	}

	async function gerarNovaViagem(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		// Converte a data antes do envio
		const viagemParaEnvio = {
			...viagem,
			dataPartida: formatarDataSubmit(viagem.dataPartida, dataAlterada),
		}

		if (id !== undefined) {
			try {
				await atualizar(`/viagens`, viagemParaEnvio, setViagem, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Carona atualizada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar a Carona!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/viagens`, viagemParaEnvio, setViagem, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Carona cadastrada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar a Carona!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	const veiculoSelecionado = viagem.veiculo?.id > 0

	return (
		<div className="container flex flex-col mx-auto items-center bg-gray-200">
			<h1 className="text-4xl text-center my-4">
				{id !== undefined ? 'Editar Carona' : 'Cadastrar Carona'}
			</h1>

			<form
				className="flex flex-col w-1/2 gap-4 mb-8"
				onSubmit={gerarNovaViagem}
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="partida">Partida</label>
					<input
						value={viagem.partida || ''}
						onChange={atualizarEstado}
						type="text"
						placeholder="Insira o local da partida"
						name="partida"
						required
						className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="destino">Destino</label>
					<input
						value={viagem.destino || ''}
						onChange={atualizarEstado}
						type="text"
						placeholder="Insira o Destino"
						name="destino"
						required
						className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="dataPartida">
						Data e Horário da partida
					</label>
					<input
						type="datetime-local"
						name="dataPartida"
						placeholder="Data e Horário da carona"
						className="border-2 border-slate-700 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-zinc-400"
						onChange={handleDataChange}
						value={
							formatarDataInputDateTime(viagem.dataPartida) || ''
						}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="valor">Valor do trajeto (R$)</label>
					<input
						value={viagem.valor || ''}
						onChange={atualizarEstado}
						type="number"
						step=".01"
						placeholder="Adicione o valor do serviço"
						name="valor"
						required
						className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex justify-between flex-nowrap">
					<div className="flex flex-col gap-1 w-1/2 px-1">
						<label htmlFor="distancia">Distância (Km)</label>
						<input
							value={viagem.distancia || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Distância"
							name="distancia"
							required
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

					<div className="flex flex-col gap-1 w-1/2 px-1">
						<label htmlFor="velocidadeMedia">
							Velocidade (Km²)
						</label>
						<input
							value={viagem.velocidadeMedia || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Velocidade Média"
							name="velocidadeMedia"
							required
							className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<p>Veículo</p>
					<select
						name="veiculo"
						id="veiculo"
						className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
						onChange={handleVeiculoChange}
						value={viagem.veiculo?.id || ''}
					>
						<option value="" disabled>
							Selecione um Veículo
						</option>
						{veiculos.map((veiculo) => (
							<option key={veiculo.id} value={veiculo.id}>
								{veiculo.modelo}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					disabled={!veiculoSelecionado || isLoading}
					className="flex justify-center rounded disabled:bg-slate-200 bg-cyan-600 
                    hover:bg-cyan-900 text-white font-bold w-1/2 mx-auto py-1"
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

export default FormViagem
