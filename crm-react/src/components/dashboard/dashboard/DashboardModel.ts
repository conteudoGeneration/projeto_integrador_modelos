// Modelo de Dados do Gráfico de Pizza
export interface StatusData {
	name: string
	value: number
}

// Modelo de Dados do Gráfico de Barras
export interface ProdutoAgrupadoData {
  name: string;
  valor: number;
  count: number;
}

// Modelo de Dados do Gráfico de Linha
export interface VendedorData {
	name: string // nome do vendedor
	value: number // valor total vendido
}