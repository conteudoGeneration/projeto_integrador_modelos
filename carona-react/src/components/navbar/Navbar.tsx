import { Car, MagnifyingGlass } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Navbar() {
	const navigate = useNavigate()

	const { usuario, handleLogout } = useContext(AuthContext)

	function logout() {
		handleLogout()
		ToastAlerta('Usuário desconectado!', 'info')
		navigate('/')
	}

	let component: ReactNode

	if (usuario.token !== '') {
		component = (
			<div
				className="
            w-full 
            bg-cyan-900  
            text-white 
            flex 
            justify-center 
            py-4
        "
			>
				<div
					className="
                container 
                flex 
                justify-between 
                text-lg
            "
				>
					<Link to="/home">
						<img
							src="https://ik.imagekit.io/vzr6ryejm/carona/logo_carona.png?updatedAt=1729778310397"
							alt="Logo"
							className="w-60"
						/>
					</Link>

					<div className="flex-1 flex justify-center items-center relative w-30 text-black">
						<form className="w-3/4 flex justify-center">
							<input
								className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
								type="search"
								placeholder="Pesquisar carona"
								id="busca"
								name="busca"
								required
							/>
							<button
								type="submit"
								className="bg-cyan-600 border-cyan-200 hover:bg-cyan-500  border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
							>
								<MagnifyingGlass
									size={14}
									weight="bold"
									className="fill-cyan-200"
								/>
							</button>
						</form>
					</div>

					<div className="flex gap-4 py-4 mr-3">
						<Link to="/viagens" className="hover:underline">
							Viagens
						</Link>
						<Link to="/veiculos" className="hover:underline">
							Veículos
						</Link>
						<Link
							to="/cadastrarveiculo"
							className="hover:underline"
						>
							Cadastrar Veículo
						</Link>
						<Link
							to=""
							onClick={logout}
							className="hover:underline"
						>
							Sair
						</Link>
						<Link to="/Perfil">
							<img
								src={usuario.foto}
								alt={usuario.nome}
								className="border-transparent rounded-full w-8 h-8"
							/>
						</Link>
						<Link to="">
							<Car size={32} weight="bold" />
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return <>{component}</>
}

export default Navbar
