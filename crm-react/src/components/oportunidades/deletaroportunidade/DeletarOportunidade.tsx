import { useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Oportunidade from "../../../models/Oportunidade"
import { deletar, listar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarOportunidade() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade)

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await listar(`/oportunidades/${id}`, setOportunidade, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao Excluir Oportunidade!', 'erro')
                retornar()
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
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarOportunidade() {
        setIsLoading(true)

        try {
            await deletar(`/oportunidades/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Oportunidade Excluído com Sucesso!', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao Excluir o Oportunidade!', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/oportunidades")
    }

    return (
        <div className='container w-1/2 mx-auto'>
            <h1 className='text-4xl text-center py-4'>Deletar Oportunidade</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o oportunidade a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-zinc-600 text-white font-bold text-2xl'>
                    Oportunidade
                </header>
                <p className='p-8 text-2xl bg-white h-full'>{oportunidade.nome}</p>

                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-teal-500 hover:bg-teal-700
                         flex items-center justify-center'
                        onClick={deletarOportunidade}
                    >
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarOportunidade