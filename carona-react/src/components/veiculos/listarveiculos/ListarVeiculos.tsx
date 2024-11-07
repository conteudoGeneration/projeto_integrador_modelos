import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Veiculo from '../../../models/Veiculo'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { listar } from '../../../services/Services'
import { DNA } from 'react-loader-spinner'
import CardVeiculos from '../cardveiculos/CardVeiculos'

function ListarVeiculos() {
	const navigate = useNavigate()

	const [veiculos, setVeiculos] = useState<Veiculo[]>([])

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarVeiculos() {
		try {
			await listar('/veiculos', setVeiculos, {
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
		buscarVeiculos()
	}, [veiculos.length])

	return (
		<>
			{veiculos.length === 0 && (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			)}

			<div className="bg-gray-200 flex justify-center">
				<div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{veiculos.map((veiculo) => (
						<CardVeiculos key={veiculo.id} veiculo={veiculo} />
					))}
				</div>
			</div>
      
		</>
	)
}

export default ListarVeiculos
