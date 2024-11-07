import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Services'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [confirmaSenha, setConfirmaSenha] = useState<string>('')

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
    peso: 0,
    altura: 0,
  })

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar()
		}
	}, [usuario])

	function retornar() {
		navigate('/login')
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

    const { type, value } = e.target;

    let valor: string | number = value;

    switch (type) {
      case "number":
      case "range":
        valor = value === "" ? "" : parseFloat(Number(value).toFixed(2));
        break;
      case "date":
        valor = value;
        break;
      default:
        // Se não for um dos tipos acima, verifica se é um número
        if (!isNaN(Number(value)) && value !== "") {
          valor = parseFloat(Number(value).toFixed(2));
        }
    }

		setUsuario({
			...usuario,
			[e.target.name]: valor,
		})
	}

	function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmaSenha(e.target.value)
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
			setIsLoading(true)

			try {
				await cadastrarUsuario(
					`/usuarios/cadastrar`,
					usuario,
					setUsuario
				)
				ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
			} catch (error) {
				ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
			}
		} else {
			ToastAlerta(
				'Dados estão inconsistentes! Verifique os dados do usuário.',
				'erro'
			)
			setUsuario({ ...usuario, senha: '' })
			setConfirmaSenha('')
		}

		setIsLoading(false)
	}
  
	console.log(JSON.stringify(usuario))
	console.log(confirmaSenha)
	return (
		<>
			<div className="place-items-center grid grid-cols-1 lg:grid-cols-2 h-screen font-bold">
				<div
					style={{
						backgroundImage: `url("https://ik.imagekit.io/vzr6ryejm/fitness/fundo_02.png?updatedAt=1730009763846")`,
					}}
					className="lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
				></div>
				<form
					className="flex flex-col justify-center items-center gap-3 w-2/3"
					onSubmit={cadastrarNovoUsuario}
				>
					<h2 className="text-5xl text-slate-900">Cadastrar</h2>
					<div className="flex flex-col w-full">
						<label htmlFor="nome">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Adicione o nome"
							className="border-2 border-slate-700 p-2 rounded"
							value={usuario.nome}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="usuario">Usuario</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							placeholder="Adicione o usuário (e-mail)"
							className="border-2 border-slate-700 p-2 rounded"
							value={usuario.usuario}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="foto">Foto</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Adicione a Foto"
							className="border-2 border-slate-700 p-2 rounded"
							value={usuario.foto}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
					</div>

					<div className="flex justify-between w-full">
						<div className="flex flex-col gap-2 w-1/2 pr-1">
							<label htmlFor="peso">
								Peso (Kg)
							</label>
							<input
								value={usuario.peso}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Adicione o seu peso"
								name="peso"
								required
								className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
						</div>

						<div className="flex flex-col gap-2 w-1/2 pl-1">
							<label htmlFor="altura">
								Altura (m)
							</label>
							<input
								value={usuario.altura}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Adicione a sua altura"
								name="altura"
								required
								className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
							/>
						</div>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Adicione a Senha"
							className="border-2 border-slate-700 p-2 rounded"
							value={usuario.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								atualizarEstado(e)
							}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="confirmarSenha">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmae a Senha"
							className="border-2 border-slate-700 p-2 rounded"
							value={confirmaSenha}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleConfirmaSenha(e)
							}
						/>
					</div>
					<div className="flex justify-around gap-8 w-full">
						<button
							className="bg-red-400 hover:bg-red-700 py-2 rounded w-1/2 text-white"
							onClick={retornar}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="flex justify-center bg-emerald-600 hover:bg-emerald-900 py-2 rounded w-1/2 text-white"
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
								<span>Cadastrar</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Cadastro
