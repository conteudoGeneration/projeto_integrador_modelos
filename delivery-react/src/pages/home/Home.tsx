import CatalogoProdutos from "../../components/catalogoprodutos/CatalogoProdutos";
import ListarProdutosSaudaveis from "../../components/produtos/listarprodutossaudaveis/ListarProdutosSaudaveis";
import ModalProduto from "../../components/produtos/modalproduto/ModalProduto";

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
                  text-black
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
              Seu prato favorito, a qualquer hora, em qualquer lugar!
            </p>

            <div className="flex justify-around gap-4">
              <ModalProduto />
            </div>
          </div>

          <div className="flex justify-center ">
            <img
              src="https://ik.imagekit.io/vzr6ryejm/food/home.png?updatedAt=1729652804741"
              alt="Imagem Página Home"
              className="w-2/3 h-auto p-4"
            />
          </div>
        </div>
      </div>

      <div>
        <CatalogoProdutos />
      </div>
      <ListarProdutosSaudaveis />
    </>
  );
}

export default Home;
