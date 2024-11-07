import { ArrowLeft, Printer, SkipBack } from '@phosphor-icons/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { cadastrar } from '../../services/Service'
import { formatarMoeda } from '../../utils/FormatarMoeda'
import { ToastAlerta } from '../../utils/ToastAlerta'
import Holerite from './holerite/Holerite'
import { CalculoResponse } from './models/CalculoResponse'
import { CalculoSalarioState } from './models/CalculoSalarioState'

function CalcularSalario() {
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as CalculoSalarioState

	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [resultado, setResultado] = useState<CalculoResponse>(
		{} as CalculoResponse
	)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function calcularSalario() {
		try {
			setIsLoading(true)
			setError(null)

			await cadastrar(
				`/colaboradores/calcularsalario/${id}`,
				{
					totalHorasExtras: state.totalHorasExtras,
					descontos: state.descontos,
				},
				setResultado,
				{
					headers: {
						Authorization: token,
					},
				}
			)
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				setError(
					'Erro ao calcular salário. Por favor, tente novamente.'
				)
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (state && id) {
			calcularSalario()
		} else {
			setError('Dados inválidos para o cálculo')
			setIsLoading(false)
		}
	}, [id, state])

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/')
		}
	}, [token])

	if (!state) {
		return (
			<div className="p-6">
				<div className="text-red-600">Dados não encontrados</div>
				<button
					onClick={() => navigate(-1)}
					className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Voltar
				</button>
			</div>
		)
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="bg-white rounded-lg shadow-lg p-6">
				<h1 className="text-2xl font-bold mb-6">
					Holerite - {state.colaborador.nome}
				</h1>

				{isLoading && (
					<div className="flex items-center justify-center py-8">
						<DNA
							visible={true}
							height="200"
							width="200"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper mx-auto"
						/>
						<span className="ml-2">Calculando...</span>
					</div>
				)}

				{error && (
					<div className="p-4 bg-red-50 text-red-600 rounded-md mb-4">
						{error}
					</div>
				)}

				{resultado && (
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-gray-50 rounded-lg">
								<span className="text-sm text-gray-600 block">
									Salário Base
								</span>
								<span className="text-lg font-semibold">
									{formatarMoeda(resultado.salario)}
								</span>
							</div>

							<div className="p-4 bg-gray-50 rounded-lg">
								<span className="text-sm text-gray-600 block">
									Horas Extras
								</span>
								<span className="text-lg font-semibold">
									{formatarMoeda(
										resultado.valorTotalHorasExtras
									)}
								</span>
							</div>

							<div className="p-4 bg-red-50 rounded-lg">
								<span className="text-sm text-gray-600 block">
									Descontos
								</span>
								<span className="text-lg font-semibold text-red-600">
									{formatarMoeda(resultado.totalDescontos)}
								</span>
							</div>

							<div className="p-4 bg-green-50 rounded-lg">
								<span className="text-sm text-gray-600 block">
									Salário Líquido
								</span>
								<span className="text-lg font-semibold text-green-600">
									{formatarMoeda(resultado.salarioLiquido)}
								</span>
							</div>
						</div>

						<div className="mt-6 p-4 bg-blue-50 rounded-lg">
							<h3 className="font-medium text-blue-800 mb-2">
								Detalhes do Cálculo
							</h3>
							<ul className="space-y-2 text-sm text-blue-700">
								<li>
									• Horas extras registradas:{' '}
									{state.totalHorasExtras} horas
								</li>
								{state.totalHorasExtras > 0 && (
									<li>
										• Valor por hora extra:{' '}
										{formatarMoeda(
											resultado.valorHoraExtra
										)}
									</li>
								)}
								<li>• INSS: {formatarMoeda(resultado.inss)}</li>
								<li>• IRRF: {formatarMoeda(resultado.irrf)}</li>
							</ul>
						</div>
					</div>
				)}

				<div className="my-4 flex items-center justify-center">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center"
					>
						<SkipBack className="w-5 h-5 mr-2 fill-slate-500 hover:fill-slate-800" />
					</button>

					<PDFDownloadLink
						document={<Holerite resultado={resultado} state={state} />}
						fileName={`holerite-${state.colaborador.nome}.pdf`}
					>
						<button 
							className="flex items-center"
						>
							<Printer className="w-5 h-5 mr-2 fill-slate-500 hover:fill-slate-800" />
						</button>
					</PDFDownloadLink>
				</div>
			</div>
		</div>
	)
}

export default CalcularSalario
