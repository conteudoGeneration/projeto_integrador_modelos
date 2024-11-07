import Oportunidade from "../../../models/Oportunidade";
import { StatusData, ProdutoAgrupadoData, VendedorData } from "./DashboardModel";

const STATUS_MAP = {
	1: 'Aberta',
	2: 'Fechada',
	3: 'Perdida',
}

export const agruparOportunidadesPorStatus = (oportunidades: Oportunidade[]): StatusData[] => {
    const opportunityByStatus = Object.entries(
      oportunidades.reduce((acc: { [key: string]: number }, curr) => {
        const status = STATUS_MAP[curr.status as keyof typeof STATUS_MAP];
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
  
    return opportunityByStatus;
  };
  
// Função de agrupamento tipada
export const agruparOportunidadesPorProduto = (opportunities: Oportunidade[]): ProdutoAgrupadoData[] => {
  const grouped = opportunities.reduce<Record<string, ProdutoAgrupadoData>>((acc, curr) => {
    // Verifica se a oportunidade está fechada (status 2)
    if (curr.status === 2) {
      const name = curr.nome;
      if (!acc[name]) {
        acc[name] = { name, valor: 0, count: 0 };
      }
      acc[name].valor += curr.valor;
      acc[name].count += 1;
    }
    return acc;
  }, {});

  return Object.values(grouped)
    .map(item => ({
      ...item,
      name: `${item.name}${item.count > 1 ? ` (${item.count})` : ''}`
    }))
    .sort((a, b) => b.valor - a.valor);
};


export const agruparVendasPorUsuario = (oportunidades: Oportunidade[]): VendedorData[] => {
  const salesByUser = Object.entries(
    oportunidades.reduce((acc: { [key: string]: number }, curr) => {
      // Verifica se a oportunidade está fechada (status 2)
      if (curr.status === 2) {
        acc[curr.usuario.nome] = (acc[curr.usuario.nome] || 0) + curr.valor;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return salesByUser;
};