interface FaixaImposto {
    limite: number;
    aliquota: number;
    deducao: number;
}

export interface ResultadoINSS {
    desconto: number;
    aliquotaEfetiva: number;
    faixasUtilizadas: {
        faixa: number;
        valorDescontado: number;
    }[];
}

export interface ResultadoIRRF {
    desconto: number;
    aliquotaEfetiva: number;
    baseDeCalculo: number;
    faixa: number;
}

// Tabelas de referência (2024)
const FAIXAS_INSS: FaixaImposto[] = [
    { limite: 1412.00, aliquota: 7.5, deducao: 0 },
    { limite: 2666.68, aliquota: 9.0, deducao: 21.18 },
    { limite: 4000.03, aliquota: 12.0, deducao: 101.18 },
    { limite: 7786.02, aliquota: 14.0, deducao: 181.18 },
];

const FAIXAS_IRRF: FaixaImposto[] = [
    { limite: 2259.20, aliquota: 0, deducao: 0 },
    { limite: 2826.65, aliquota: 7.5, deducao: 158.40 },
    { limite: 3751.05, aliquota: 15.0, deducao: 370.40 },
    { limite: 4664.68, aliquota: 22.5, deducao: 651.73 },
    { limite: Infinity, aliquota: 27.5, deducao: 884.96 },
];

// Função auxiliar para arredondar com precisão específica
function roundToPrecision(number: number, precision: number = 2): number {
    return Number(Math.round(Number(number + 'e' + precision)) + 'e-' + precision);
}

export function calcularINSS(salarioBruto: number): ResultadoINSS {
    let descontoTotal = 0;
    let salarioAnterior = 0;
    const faixasUtilizadas = [];

    // Para cada faixa, calcula o desconto apropriado
    for (const faixa of FAIXAS_INSS) {
        if (salarioBruto > salarioAnterior) {
            const salarioFaixa = Math.min(faixa.limite, salarioBruto) - salarioAnterior;
            const descontoFaixa = roundToPrecision((salarioFaixa * faixa.aliquota) / 100);
            
            descontoTotal = roundToPrecision(descontoTotal + descontoFaixa);
            faixasUtilizadas.push({
                faixa: faixa.aliquota,
                valorDescontado: descontoFaixa
            });
            
            salarioAnterior = faixa.limite;
        }
    }

    // Aplica o teto do INSS se necessário
    const tetoINSS = 876.97; // Teto de contribuição 2024
    if (descontoTotal > tetoINSS) {
        descontoTotal = tetoINSS;
    }

    const aliquotaEfetiva = roundToPrecision((descontoTotal / salarioBruto) * 100);
    
    return {
        desconto: roundToPrecision(descontoTotal),
        aliquotaEfetiva,
        faixasUtilizadas
    };
}

export function calcularIRRF(salarioBruto: number, numeroDependentes: number = 0): ResultadoIRRF {
    // Calcula INSS primeiro
    const descontoINSS = calcularINSS(salarioBruto).desconto;
    
    // Dedução por dependente (2024)
    const deducaoPorDependente = 189.59;
    const deducaoDependentes = roundToPrecision(numeroDependentes * deducaoPorDependente);

    // Calcula base de cálculo do IR
    const baseDeCalculo = roundToPrecision(salarioBruto - descontoINSS - deducaoDependentes);
    
    // Encontra a faixa apropriada do IR
    let faixaIR = FAIXAS_IRRF.findIndex(faixa => baseDeCalculo <= faixa.limite);
    if (faixaIR === -1) faixaIR = FAIXAS_IRRF.length - 1;
    
    const { aliquota, deducao } = FAIXAS_IRRF[faixaIR];
    
    // Calcula o desconto do IR com maior precisão
    const descontoIR = Math.max(
        roundToPrecision(roundToPrecision((baseDeCalculo * aliquota) / 100) - deducao),
        0
    );
    
    const aliquotaEfetiva = roundToPrecision((descontoIR / salarioBruto) * 100);
    
    return {
        desconto: roundToPrecision(descontoIR),
        aliquotaEfetiva,
        baseDeCalculo,
        faixa: faixaIR
    };
}