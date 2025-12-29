import { Equipamento } from "./EquipamentoBase"

export enum StatusManutencao {
    PRONTO = 'PRONTO',
    AGUARDANDO = "AGUARDANDO PEÇA",
    BAIXADO = "BAIXADO",
    ANDAMENTO = "EM ANDAMENTO"
}

export type Manutencao = {
    id: number
    equipamento: Equipamento
    patrimonio: string
    necessitaPeca: boolean
    descricaoProblema: string
    tipo: string
    status: StatusManutencao
    prioridade: string
    recolhimento: Date
    previsaoRetorno: Date
    pecasUtilizadas: string[]
    observacao: string
    dataPrevisao: string
}