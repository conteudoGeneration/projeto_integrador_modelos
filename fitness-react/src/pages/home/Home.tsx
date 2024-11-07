import CatalogoExercicios from '../../components/catalogoexercicios/CatalogoExercicios'
import ModalExercicio from '../../components/exercicios/modalexercicio/ModalExercicio'

function Home() {
	return (
		<>
			<div
				className="
        min-h-[60vh]
              bg-slate-200 
              flex 
              justify-center
              "
			>
				<div
					className="
                  container 
                  grid 
                  grid-cols-2 
                  text-emerald-900
                  "
				>
					<div
						className="
                      flex 
                      flex-col 
                      gap-4 
                      items-center 
                      justify-center 
                      py-4
                      "
					>
						<h2
							className="
                          text-5xl 
                          font-bold
                          "
						>
							Seja bem vinde!
						</h2>
						<p className="text-2xl">
							Transforme seus objetivos em conquistas diárias!
						</p>

						<div className="flex justify-around gap-4">
							<ModalExercicio />
						</div>
					</div>

					<div className="flex justify-center ">
						<img
							src="https://ik.imagekit.io/vzr6ryejm/fitness/home.png?updatedAt=1729954739936"
							alt="Imagem Página Home"
							className="w-2/3 h-auto p-4"
						/>
					</div>
				</div>
			</div>
			
			<CatalogoExercicios />
		</>
	)
}

export default Home
