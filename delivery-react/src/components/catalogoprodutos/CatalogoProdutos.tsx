import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import Categoria from '../../models/Categoria'
import Produto from '../../models/Produto'
import { listar } from '../../services/Services'
import { ToastAlerta } from '../../utils/ToastAlerta'
import CardProdutos from '../produtos/cardprodutos/CardProdutos'

function CatalogoProdutos() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]) // Armazena todos os exercícios
	const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]) // Armazena exercícios filtrados
	const [categoriaSelecionada, setCategoriaSelecionada] = useState<
		number | null
	>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
				ToastAlerta('Sessão expirada, faça login novamente', 'info')
			}
		}
	}

	async function buscarProdutos() {
		try {
			setIsLoading(true)
			setError(null)

			// Faz uma única requisição para buscar todos os exercícios
			await listar('/produtos', setTodosProdutos, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
				ToastAlerta('Sessão expirada, faça login novamente', 'info')
			} else {
				setError('Erro ao buscar exercícios')
				ToastAlerta('Erro ao buscar exercícios', 'erro')
			}
		} finally {
			setIsLoading(false)
		}
	}

	// Efeito para filtrar exercícios localmente quando a categoria é alterada
	useEffect(() => {
		if (todosProdutos.length > 0) {
			if (categoriaSelecionada === null) {
				setProdutosFiltrados(todosProdutos)
			} else {
				const produtosFiltrados = todosProdutos.filter(
					(produto) => produto.categoria?.id === categoriaSelecionada
				)
				setProdutosFiltrados(produtosFiltrados)
			}
		}
	}, [categoriaSelecionada, todosProdutos])

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/login')
		} else {
			buscarCategorias()
			buscarProdutos()
		}
	}, [token])

	const handleCategoriaClick = (categoriaId: number | null) => {
		setCategoriaSelecionada(categoriaId)
	}

	const renderProdutos = () => {
		if (!Array.isArray(produtosFiltrados)) {
			console.error('produtos não é um array array:', produtosFiltrados)
			return (
				<div className="text-center py-10">
					<p className="text-xl text-gray-600">
						Erro ao carregar exercícios
					</p>
				</div>
			)
		}

		if (produtosFiltrados.length === 0) {
			return (
				<div className="text-center py-10">
					<p className="text-xl text-gray-600">
						Nenhum exercício foi encontrado{' '}
						{categoriaSelecionada !== null && 'nesta categoria'}
					</p>
				</div>
			)
		}

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{produtosFiltrados.map((produto) => (
					<CardProdutos key={produto.id} produto={produto} />
				))}
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="bg-red-500 py-4">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-4">
						<button
							onClick={() => handleCategoriaClick(null)}
							className={`px-6 py-2 w-24 h-24 rounded-lg transition-all duration-300 
                ${
					categoriaSelecionada === null
						? 'bg-red-200 text-red-700 shadow-lg scale-105'
						: 'bg-white text-red-700 hover:bg-red-100'
				}`}
						>
							Todos
						</button>
						{categorias.map((categoria) => (
							<button
								key={categoria.id}
								onClick={() =>
									handleCategoriaClick(categoria.id)
								}
								className={`py-3 w-24 h-24 flex flex-col justify-center items-center rounded-lg text-sm transition-all duration-300
                  ${
						categoriaSelecionada === categoria.id
							? 'bg-white text-red-700 shadow-lg scale-105'
							: 'bg-white text-red-700 hover:bg-red-100'
					}`}
							>
								<img
									src={categoria.icone}
									alt={categoria.descricao}
									className="fill-emerald-100 w-16 h-16 object-cover"
								/>
								<p>{categoria.descricao}</p>
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{isLoading ? (
					<div className="flex justify-center items-center py-20">
						<DNA
							visible={true}
							height="200"
							width="200"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper mx-auto"
						/>
					</div>
				) : (
					<div className="space-y-6">
						{error ? (
							<div className="text-center py-10">
								<p className="text-xl text-red-600">{error}</p>
							</div>
						) : (
							renderProdutos()
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CatalogoProdutos
