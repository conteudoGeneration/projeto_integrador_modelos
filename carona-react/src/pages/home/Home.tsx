import ListarViagens from "../../components/viagens/listarviagens/ListarViagens"
import ModalViagem from "../../components/viagens/modalviagem/ModalViagem"

function Home() {
    return (
        <>
            <div className="bg-blue-200 flex justify-center min-h-[65vh]">
                <div className='container grid grid-cols-2 text-black'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem Vinde!
                        </h2>
                        <p className='text-xl'>
                            Vá Mais Longe, Compartilhando o Caminho.
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalViagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/vzr6ryejm/carona/home.png?updatedAt=1729776740222"
                            alt="Imagem Página Home"
                            className='w-3/4 object-contain'
                        />
                    </div>
                </div>
            </div>

            <ListarViagens />
        </>
    )
}

export default Home