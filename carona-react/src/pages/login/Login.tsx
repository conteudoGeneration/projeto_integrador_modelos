import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import UsuarioLogin from '../../models/UsuarioLogin'
import AuthContext from '../../contexts/AuthContext'
import { EyeSlash, Eye } from '@phosphor-icons/react'

function Login() {
	const navigate = useNavigate()

	const { usuario, handleLogin, isLoading } = useContext(AuthContext)

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
		{} as UsuarioLogin
	)

	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (usuario.token !== '') {
			navigate('/home')
		}
	}, [usuario])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		})
	}

	function login(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		handleLogin(usuarioLogin)
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
				<form
					className="flex justify-center items-center flex-col w-1/2 gap-4"
					onSubmit={login}
				>
					<h2 className="text-slate-900 text-5xl ">Entrar</h2>
					<div className="flex flex-col w-full">
						<label htmlFor="usuario">Usuário</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border-2 border-slate-700 rounded p-2"
							value={usuarioLogin.usuario}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
					</div>
					<div className="relative flex flex-col w-full">
						<label htmlFor="senha">Senha</label>
						<input
							type={showPassword ? 'text' : 'password'}
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-slate-700 rounded p-2"
							value={usuarioLogin.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
						<button
							type="button"
							className="top-9 right-2 absolute text-slate-700"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeSlash size={20} />
							) : (
								<Eye size={20} />
							)}
						</button>
					</div>
					<button
						type="submit"
						className="rounded bg-cyan-600 flex justify-center
                                   hover:bg-cyan-900 text-white w-1/2 py-2"
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
							<span>Entrar</span>
						)}
					</button>

					<hr className="border-slate-800 w-full" />

					<p>
						Ainda não tem uma conta?{' '}
						<Link
							to="/cadastro"
							className="text-indigo-800 hover:underline"
						>
							Cadastre-se
						</Link>
					</p>
				</form>
				<div
					style={{
						backgroundImage: `url("https://ik.imagekit.io/vzr6ryejm/carona/fundo_02.jpeg?updatedAt=1729796918976")`,
					}}
					className="lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
				></div>
			</div>
		</>
	)
}

export default Login
