import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Viagem from '../../../models/Viagem'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { listar } from '../../../services/Services'
import { DNA } from 'react-loader-spinner'
import CardViagems from '../cardviagens/CardViagens'

function ListarViagens() {
	const navigate = useNavigate()

	const [viagens, setViagens] = useState<Viagem[]>([])

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarViagems() {
		try {
			await listar('/viagens', setViagens, {
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
		buscarViagems()
	}, [viagens.length])

	return (
		<>
			{viagens.length === 0 && (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			)}

			<div
				className="
        bg-gray-200 
          flex 
          justify-center
        "
			>
				<div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{viagens.map((viagem) => (
						<CardViagems key={viagem.id} viagem={viagem} />
					))}
				</div>
			</div>
		</>
	)
}

export default ListarViagens
