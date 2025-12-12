export interface ComputadorDTO {
  patrimonio: string;
  marca: string;
  modelo: string;
  statusEquipamento: string; 
  processador: string;
  memoria: string;
  armazenamento: string;
  tipo: string;
  sistema: string;
  nome:string;
}

export interface MonitorDTO {
  patrimonio: string;
  marca: string;
  modelo: string;
  statusEquipamento: string;
  tamanho: string;
}

export interface EstabilizadorDTO {
  patrimonio: string;
  marca: string;
  modelo: string;
  statusEquipamento: string;
  potencia: string;
}

export interface EstacaoTrabalhoDTO {
  id: number;
  secretaria: string;
  setor: string;
  computador?: ComputadorDTO;   
  monitor?: MonitorDTO;        
  estabilizador?: EstabilizadorDTO; 
  dataCriacao: string;
  dataUltimaAlteracao: string;
}