import { Departamento } from "./Departamento"
import { Secretaria } from "./Secretaria"

enum StatusEquipamento {
    DISPONIVEL = "DISPONIVEL",
    EM_USO = "EM_USO",
    DEFEITO = "DEFEITO",
    MANUTENCAO = "MANUTENCAO"
}

export type Equipamento = {
    id: number
    patrimonio: string
    marca: string
    modelo: string
    statusEquipamento: StatusEquipamento
    secretaria: Secretaria
    departamento: Departamento
}