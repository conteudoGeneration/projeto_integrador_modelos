export interface CalculoSalarioState {
	totalHorasExtras: number
	descontos: number
	colaborador: {
		id: number
		nome: string
		salarioBase: number
	}
}