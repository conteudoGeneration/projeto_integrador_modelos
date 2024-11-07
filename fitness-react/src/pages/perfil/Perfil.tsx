import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'
import { listar } from '../../services/Services'
import { IMC_FAIXAS } from './ImcFaixas'

function Perfil() {
	
	const navigate = useNavigate()

	const [imc, setImc] = useState<number>(0)
	const [imcImagem, setImcImagem] = useState<string>('')
	const [imcCategoria, setImcCategoria] = useState<string>('')
	const [imcDescricao, setImcDescricao] = useState<string>('')
	const [imcStyle, setImcStyle] = useState<string>('bg-yellow-500')

	const { usuario, handleLogout } = useContext(AuthContext)

	async function buscarImc() {
		try {
			await listar(`/usuarios/imc/${usuario.id}`, setImc, {
				headers: {
					Authorization: usuario.token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		}
	}

	useEffect(() => {
		if (usuario.token === '') {
			ToastAlerta('Você precisa estar logado', 'info')
			navigate('/')
		}
		buscarImc()
	}, [usuario.token])

	useEffect(() => {
		const imcData = IMC_FAIXAS.find((range) => imc <= range.max)
		if (imcData) {
			setImcImagem(imcData.imagem)
			setImcCategoria(imcData.categoria)
			setImcDescricao(imcData.descricao)
			setImcStyle(imcData.cor)
		}
	}, [imc])

	return (
		<div className="m-4 mx-auto rounded-2xl overflow-hidden container">
			<img
				className="border-white border-b-8 w-full h-72 object-cover"
				src="https://ik.imagekit.io/vzr6ryejm/fitness/fundo_05.jpg?updatedAt=1730009723055"
				alt="Capa do Perfil"
			/>

			<img
				className="relative z-10 border-8 border-white mx-16 mt-[-8rem] rounded-full w-56 h-56 object-cover"
				src={usuario.foto}
				alt={`Foto de perfil de ${usuario.nome}`}
			/>

			<div className="flex gap-2">
				<div className="relative w-1/2 flex flex-col justify-center items-left bg-emerald-300 mt-[-6rem] h-90 text-2xl text-black">
					<div className="mx-8 mt-20 p-4 text-lg rounded">
						<p>
							<span className="font-semibold">Nome:</span>{' '}
							{usuario.nome}{' '}
						</p>
						<p>
							<span className="font-semibold">Email:</span>{' '}
							{usuario.usuario}
						</p>
						<p>
							<span className="font-semibold">Peso:</span>{' '}
							{usuario.peso.toFixed(2)}{' '}Kg
						</p>
						<p>
							<span className="font-semibold">Altura:</span>{' '}
							{usuario.altura.toFixed(2)}{' '}m
						</p>
					</div>
				</div>

				<div className="relative w-1/2 flex flex-col justify-center items-left bg-blue-300 mt-[-6rem] h-90 text-2xl text-black">
					<div className="mx-4 p-2 text-lg rounded">
						<h2 className="text-center text-2xl font-semibold uppercase text-indigo-900 py-3">
							Índice de Massa Corporal (IMC)
						</h2>

						<div className="flex">
							<div className="w-2/5 flex flex-col justify-center">
								<img
									className="h-52 object-contain"
									src={imcImagem}
									alt="Classificação do IMC"
								/>
								<h3 className="flex items-center justify-center font-bold py-2">
									{imcCategoria}
								</h3>
							</div>

							<div className="w-3/5 flex flex-col justify-around my-4 items-center">
								<div className="flex justify-center items-center w-full gap-4">
									<h2 className="text-xl font-bold">
										O seu IMC é:{' '}
									</h2>
									<h3 className={`flex items-center justify-center font-bold rounded-full w-20 h-20 shadow-lg ${imcStyle}`}>
										{imc.toFixed(2)}
									</h3>
								</div>
								<p className="text-base p-4 text-justify">
									{imcDescricao}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Perfil
