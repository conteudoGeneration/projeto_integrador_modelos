import { Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";
import { formatarMoeda } from "../../../utils/FormatarMoeda";

interface CardProdutoProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutoProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white my-10 hover:shadow-lg">
      <div className="flex justify-end items-end pt-2 pr-2">
        <Link to={`/atualizarproduto/${produto.id}`}>
          <Pencil size={24} className="mr-1 hover:fill-teal-700" />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={24} className="mr-1 hover:fill-red-700" />
        </Link>
        <button onClick={() => console.log("curtir")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#ff0000"
            viewBox="0 0 256 256"
            className="h-6 w-6 fill-red-600 hover:fill-red-300"
          >
            <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
          </svg>
        </button>
        <p className="pl-1">00</p>
      </div>

      <div className="flex flex-col justify-center py-2">
        <img
          src={produto.foto}
          className="mt-1 h-44 w-auto m-2 object-cover rounded-lg "
          alt={produto.nome}
        />

        <div className="p-4">
          <div className="min-h-12 flex items-center justify-center">
            <p className="text-sm text-center uppercase">{produto.nome}</p>
          </div>
          <h3 className="text-xl text-center font-bold uppercase">
            {formatarMoeda(produto.preco)}
          </h3>
          <div className="m-2 p-2 bg-red-100 rounded">
            <h6 className="py-1 text-sm font-bold">Valor Nutricional:</h6>
            <p className="text-sm">Calorias: {produto.calorias} Kcal</p>
            <p className="text-sm">Proteínas: {produto.proteinas} g</p>
          </div>
          {produto.categoria ? (
            <p className="text-base italic text-center">
              Categoria: {produto.categoria?.descricao}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <button
        className="w-full text-white bg-red-500 hover:bg-red-600 flex items-center justify-center py-2"
        onClick={() => console.log("Comprar")}
      >
        Comprar
      </button>
    </div>
  );
}

export default CardProdutos;
