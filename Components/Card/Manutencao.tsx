import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Wrench, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  CheckCircle2,
  Building2,
  Calendar,
  User,
  Package,
  TrendingUp,
  ArrowRight,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/PaginationControls";

interface ManutencaoItem {
  id: string;
  pcId: string;
  pcNome: string;
  origem: string;
  problema: string;
  dataRecolhimento: string;
  previsaoRetorno?: string;
  tecnicoResponsavel: string;
  status: "em_analise" | "aguardando_peca" | "em_reparo" | "pronto" | "baixado";
  prioridade: "baixa" | "media" | "alta" | "critica";
  hardwareNecessario?: string[];
  observacoes?: string;
}

// Computadores disponíveis para vincular (simulando dados que viriam de Computadores.tsx)
interface ComputadorDisponivel {
  id: string;
  patrimonioGabinete: string;
  nomeIdentificacao: string;
  local: string;
  setor: string;
  status: "ativo" | "manutencao" | "inativo";
}

const computadoresDisponiveis: ComputadorDisponivel[] = [
  { id: "1", patrimonioGabinete: "PAT-001", nomeIdentificacao: "PC-RECEPCAO-01", local: "Posto de Saúde", setor: "Recepção", status: "ativo" },
  { id: "2", patrimonioGabinete: "PAT-002", nomeIdentificacao: "PC-MEDICO-01", local: "Posto de Saúde", setor: "Sala do Médico", status: "ativo" },
  { id: "3", patrimonioGabinete: "PAT-003", nomeIdentificacao: "PC-EDUCACAO-01", local: "Secretaria de Educação", setor: "Coordenação Pedagógica", status: "manutencao" },
  { id: "4", patrimonioGabinete: "PAT-004", nomeIdentificacao: "PC-OBRAS-01", local: "Secretaria de Obras", setor: "Engenharia", status: "ativo" },
  { id: "5", patrimonioGabinete: "PAT-005", nomeIdentificacao: "PC-TRIAGEM-02", local: "Posto de Saúde", setor: "Triagem", status: "ativo" },
  { id: "6", patrimonioGabinete: "PAT-006", nomeIdentificacao: "PC-BIBLIOTECA-01", local: "Secretaria de Educação", setor: "Núcleo de Tecnologia", status: "ativo" },
];

const tecnicos = [
  "Carlos Silva",
  "Maria Santos",
  "João Oliveira",
  "Ana Pereira",
  "Pedro Costa"
];

const initialManutencoes: ManutencaoItem[] = [
  { id: "MAN-001", pcId: "PAT-005", pcNome: "Terminal Backup", origem: "Posto de Saúde - Triagem", problema: "Falha no HD, sistema não inicializa", dataRecolhimento: "2025-11-10", previsaoRetorno: "2025-11-28", tecnicoResponsavel: "Carlos Silva", status: "aguardando_peca", prioridade: "alta", hardwareNecessario: ["SSD 256GB SATA"], observacoes: "Aguardando chegada do SSD para substituição" },
  { id: "MAN-002", pcId: "PAT-003", pcNome: "Terminal de Consulta", origem: "Sec. Educação - Núcleo de Matrículas", problema: "Memória RAM com defeito, tela azul frequente", dataRecolhimento: "2025-11-15", previsaoRetorno: "2025-11-26", tecnicoResponsavel: "Maria Santos", status: "em_reparo", prioridade: "media", hardwareNecessario: ["Memória DDR4 8GB"] },
  { id: "MAN-003", pcId: "PAT-004", pcNome: "Relatórios e Laudos", origem: "Sec. Obras - Fiscalização", problema: "Fonte queimada, não liga", dataRecolhimento: "2025-11-10", previsaoRetorno: "2025-11-25", tecnicoResponsavel: "João Oliveira", status: "pronto", prioridade: "media" },
  { id: "MAN-004", pcId: "PAT-007", pcNome: "PC-FARMACIA-01", origem: "Posto de Saúde - Farmácia", problema: "Monitor não liga, possível problema na placa de vídeo", dataRecolhimento: "2025-11-08", tecnicoResponsavel: "Ana Pereira", status: "em_analise", prioridade: "baixa" },
  { id: "MAN-005", pcId: "PAT-008", pcNome: "PC-DIRETORIA-01", origem: "Sec. Educação - Diretoria", problema: "Sistema operacional corrompido", dataRecolhimento: "2025-11-12", previsaoRetorno: "2025-11-20", tecnicoResponsavel: "Pedro Costa", status: "pronto", prioridade: "alta" },
  { id: "MAN-006", pcId: "PAT-009", pcNome: "PC-ALMOX-01", origem: "Sec. Obras - Almoxarifado", problema: "Placa-mãe queimada", dataRecolhimento: "2025-10-28", tecnicoResponsavel: "Carlos Silva", status: "baixado", prioridade: "critica", observacoes: "Equipamento muito antigo, custo de reparo não justifica" },
  { id: "MAN-007", pcId: "PAT-010", pcNome: "PC-SECRETARIA-02", origem: "Sec. Educação - Secretaria Acadêmica", problema: "Lentidão extrema, possível vírus", dataRecolhimento: "2025-11-18", tecnicoResponsavel: "Maria Santos", status: "em_reparo", prioridade: "media" },
  { id: "MAN-008", pcId: "PAT-011", pcNome: "PC-ENFERMARIA-01", origem: "Posto de Saúde - Enfermaria", problema: "Teclado e mouse não funcionam", dataRecolhimento: "2025-11-19", previsaoRetorno: "2025-11-22", tecnicoResponsavel: "João Oliveira", status: "pronto", prioridade: "baixa" },
  { id: "MAN-009", pcId: "PAT-012", pcNome: "PC-ENGENHARIA-02", origem: "Sec. Obras - Engenharia", problema: "Cooler do processador com ruído, superaquecimento", dataRecolhimento: "2025-11-16", tecnicoResponsavel: "Ana Pereira", status: "aguardando_peca", prioridade: "alta", hardwareNecessario: ["Cooler Intel LGA1200", "Pasta térmica"] },
  { id: "MAN-010", pcId: "PAT-013", pcNome: "PC-BIBLIOTECA-02", origem: "Sec. Educação - Biblioteca Digital", problema: "HD com setores defeituosos", dataRecolhimento: "2025-11-14", tecnicoResponsavel: "Pedro Costa", status: "em_analise", prioridade: "media", hardwareNecessario: ["SSD 512GB NVMe"] },
  { id: "MAN-011", pcId: "PAT-014", pcNome: "PC-DENTISTA-01", origem: "Posto de Saúde - Consultório Odontológico", problema: "Não reconhece periféricos USB", dataRecolhimento: "2025-11-17", tecnicoResponsavel: "Carlos Silva", status: "em_reparo", prioridade: "alta" },
  { id: "MAN-012", pcId: "PAT-015", pcNome: "PC-FISCALIZACAO-02", origem: "Sec. Obras - Fiscalização", problema: "Fonte com ruído, desliga sozinho", dataRecolhimento: "2025-11-11", tecnicoResponsavel: "Maria Santos", status: "baixado", prioridade: "baixa", observacoes: "Fonte e placa-mãe com danos irreparáveis" },
  { id: "MAN-013", pcId: "PAT-016", pcNome: "PC-MULTIUSO-01", origem: "Posto de Saúde - Sala Multiuso", problema: "Monitor com manchas, imagem distorcida", dataRecolhimento: "2025-11-20", tecnicoResponsavel: "João Oliveira", status: "aguardando_peca", prioridade: "media", hardwareNecessario: ["Monitor 21.5'' LED"] },
  { id: "MAN-014", pcId: "PAT-017", pcNome: "PC-COORDENACAO-01", origem: "Sec. Educação - Coordenação Pedagógica", problema: "Problema na rede, não conecta à internet", dataRecolhimento: "2025-11-21", tecnicoResponsavel: "Ana Pereira", status: "em_analise", prioridade: "alta" },
  { id: "MAN-015", pcId: "PAT-018", pcNome: "PC-DIRETORIA-OBRAS", origem: "Sec. Obras - Diretoria Técnica", problema: "Travamentos frequentes durante uso", dataRecolhimento: "2025-11-13", previsaoRetorno: "2025-11-24", tecnicoResponsavel: "Pedro Costa", status: "pronto", prioridade: "critica" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "em_analise":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "aguardando_peca":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "em_reparo":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "pronto":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "baixado":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "em_analise":
      return "Em Análise";
    case "aguardando_peca":
      return "Aguardando Peça";
    case "em_reparo":
      return "Em Reparo";
    case "pronto":
      return "Pronto p/ Devolução";
    case "baixado":
      return "Baixado";
    default:
      return status;
  }
};

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "critica":
      return "bg-red-600/10 text-red-600 border-red-600/20";
    case "alta":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "media":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "baixa":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "em_analise":
      return <Clock className="h-4 w-4" />;
    case "aguardando_peca":
      return <Package className="h-4 w-4" />;
    case "em_reparo":
      return <Wrench className="h-4 w-4" />;
    case "pronto":
      return <CheckCircle2 className="h-4 w-4" />;
    case "baixado":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

type Prioridade = "baixa" | "media" | "alta" | "critica";

interface FormData {
  pcId: string;
  problema: string;
  tecnicoResponsavel: string;
  prioridade: Prioridade;
  hardwareNecessario: string;
  observacoes: string;
  previsaoRetorno: string;
}

const emptyForm: FormData = {
  pcId: "",
  problema: "",
  tecnicoResponsavel: "",
  prioridade: "media",
  hardwareNecessario: "",
  observacoes: "",
  previsaoRetorno: ""
};

export default function Manutencao() {
  const [activeTab, setActiveTab] = useState("todos");
  const [manutencoes, setManutencoes] = useState<ManutencaoItem[]>(initialManutencoes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [searchComputer, setSearchComputer] = useState("");
  const { toast } = useToast();

  const emAndamento = manutencoes.filter(m => !["pronto", "baixado"].includes(m.status));
  const prontos = manutencoes.filter(m => m.status === "pronto");
  const baixados = manutencoes.filter(m => m.status === "baixado");
  const aguardandoPeca = manutencoes.filter(m => m.status === "aguardando_peca");

  const getFilteredManutencoes = () => {
    switch (activeTab) {
      case "em_andamento": return emAndamento;
      case "prontos": return prontos;
      case "baixados": return baixados;
      case "aguardando_peca": return aguardandoPeca;
      default: return manutencoes;
    }
  };

  const filteredManutencoes = getFilteredManutencoes();
  const pagination = usePagination(filteredManutencoes);

  const taxaRecuperacao = manutencoes.length > 0 
    ? Math.round(((manutencoes.length - baixados.length) / manutencoes.length) * 100) 
    : 0;

  // Filtrar computadores disponíveis (não em manutenção no sistema atual)
  const pcsEmManutencao = manutencoes.filter(m => !["pronto", "baixado"].includes(m.status)).map(m => m.pcId);
  const computadoresFiltrados = computadoresDisponiveis.filter(c => {
    const matchesSearch = c.nomeIdentificacao.toLowerCase().includes(searchComputer.toLowerCase()) ||
      c.patrimonioGabinete.toLowerCase().includes(searchComputer.toLowerCase()) ||
      c.local.toLowerCase().includes(searchComputer.toLowerCase());
    const naoEmManutencao = !pcsEmManutencao.includes(c.patrimonioGabinete);
    return matchesSearch && naoEmManutencao;
  });

  const selectedComputer = computadoresDisponiveis.find(c => c.patrimonioGabinete === formData.pcId);

  const handleSubmit = () => {
    if (!formData.pcId || !formData.problema || !formData.tecnicoResponsavel) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios: Computador, Problema e Técnico",
        variant: "destructive"
      });
      return;
    }

    const computer = computadoresDisponiveis.find(c => c.patrimonioGabinete === formData.pcId);
    if (!computer) return;

    const newManutencao: ManutencaoItem = {
      id: `MAN-${String(manutencoes.length + 1).padStart(3, '0')}`,
      pcId: formData.pcId,
      pcNome: computer.nomeIdentificacao,
      origem: `${computer.local} - ${computer.setor}`,
      problema: formData.problema,
      dataRecolhimento: new Date().toISOString().split('T')[0],
      previsaoRetorno: formData.previsaoRetorno || undefined,
      tecnicoResponsavel: formData.tecnicoResponsavel,
      status: "em_analise",
      prioridade: formData.prioridade,
      hardwareNecessario: formData.hardwareNecessario ? formData.hardwareNecessario.split(',').map(s => s.trim()) : undefined,
      observacoes: formData.observacoes || undefined
    };

    setManutencoes(prev => [...prev, newManutencao]);
    setFormData(emptyForm);
    setSearchComputer("");
    setIsDialogOpen(false);
    toast({ title: "Ordem de serviço criada com sucesso!" });
  };

  const handleUpdateStatus = (id: string, newStatus: ManutencaoItem['status']) => {
    setManutencoes(prev => prev.map(m => 
      m.id === id ? { ...m, status: newStatus } : m
    ));
    toast({ title: `Status atualizado para: ${getStatusLabel(newStatus)}` });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Central de Manutenção</h1>
              <p className="text-muted-foreground">
                Acompanhamento de equipamentos recolhidos para manutenção
              </p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setFormData(emptyForm);
              setSearchComputer("");
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nova Manutenção
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Nova Manutenção</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Seleção de Computador */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Selecionar Computador *
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por patrimônio, nome ou local..."
                      value={searchComputer}
                      onChange={(e) => setSearchComputer(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {searchComputer && !formData.pcId && (
                    <div className="border rounded-lg max-h-48 overflow-y-auto">
                      {computadoresFiltrados.length > 0 ? (
                        computadoresFiltrados.map((pc) => (
                          <div
                            key={pc.id}
                            className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0 transition-colors"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, pcId: pc.patrimonioGabinete }));
                              setSearchComputer("");
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{pc.nomeIdentificacao}</p>
                                <p className="text-sm text-muted-foreground">
                                  {pc.patrimonioGabinete} • {pc.local} - {pc.setor}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {pc.status === "ativo" ? "Ativo" : pc.status === "manutencao" ? "Em Manutenção" : "Inativo"}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          Nenhum computador encontrado
                        </div>
                      )}
                    </div>
                  )}

                  {selectedComputer && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Monitor className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{selectedComputer.nomeIdentificacao}</p>
                              <p className="text-sm text-muted-foreground">
                                {selectedComputer.patrimonioGabinete} • {selectedComputer.local} - {selectedComputer.setor}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, pcId: "" }))}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Descrição do Problema */}
                <div className="space-y-2">
                  <Label htmlFor="problema">Descrição do Problema *</Label>
                  <Textarea
                    id="problema"
                    placeholder="Descreva o problema apresentado pelo equipamento..."
                    value={formData.problema}
                    onChange={(e) => setFormData(prev => ({ ...prev, problema: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Técnico Responsável */}
                  <div className="space-y-2">
                    <Label htmlFor="tecnico">Técnico Responsável *</Label>
                    <Select 
                      value={formData.tecnicoResponsavel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, tecnicoResponsavel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        {tecnicos.map((tecnico) => (
                          <SelectItem key={tecnico} value={tecnico}>
                            {tecnico}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prioridade */}
                  <div className="space-y-2">
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select 
                      value={formData.prioridade}
                      onValueChange={(value: "baixa" | "media" | "alta" | "critica") => 
                        setFormData(prev => ({ ...prev, prioridade: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="critica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Previsão de Retorno */}
                  <div className="space-y-2">
                    <Label htmlFor="previsao">Previsão de Retorno</Label>
                    <Input
                      id="previsao"
                      type="date"
                      value={formData.previsaoRetorno}
                      onChange={(e) => setFormData(prev => ({ ...prev, previsaoRetorno: e.target.value }))}
                    />
                  </div>

                  {/* Hardware Necessário */}
                  <div className="space-y-2">
                    <Label htmlFor="hardware">Hardware Necessário</Label>
                    <Input
                      id="hardware"
                      placeholder="Ex: SSD 256GB, Memória 8GB"
                      value={formData.hardwareNecessario}
                      onChange={(e) => setFormData(prev => ({ ...prev, hardwareNecessario: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Observações adicionais..."
                    value={formData.observacoes}
                    onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Manutenção
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Wrench className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total em Manutenção</p>
                  <p className="text-2xl font-bold">{manutencoes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold">{emAndamento.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aguardando Peças</p>
                  <p className="text-2xl font-bold">{aguardandoPeca.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prontos p/ Devolução</p>
                  <p className="text-2xl font-bold">{prontos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Baixados</p>
                  <p className="text-2xl font-bold">{baixados.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Taxa de Recuperação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Taxa de Recuperação de Equipamentos
            </CardTitle>
            <CardDescription>
              Percentual de equipamentos que retornam ao funcionamento após manutenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recuperados vs Baixados</span>
                <span className="text-sm font-medium">{taxaRecuperacao}%</span>
              </div>
              <Progress value={taxaRecuperacao} className="h-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{manutencoes.length - baixados.length} equipamentos recuperados</span>
                <span>{baixados.length} equipamentos baixados</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Manutenções - Redesign */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Ordens de Serviço</CardTitle>
                <CardDescription>
                  Gerencie equipamentos em manutenção
                </CardDescription>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="h-9">
                  <TabsTrigger value="todos" className="text-xs px-3">Todos</TabsTrigger>
                  <TabsTrigger value="em_andamento" className="text-xs px-3">Andamento</TabsTrigger>
                  <TabsTrigger value="aguardando_peca" className="text-xs px-3">Peças</TabsTrigger>
                  <TabsTrigger value="prontos" className="text-xs px-3">Prontos</TabsTrigger>
                  <TabsTrigger value="baixados" className="text-xs px-3">Baixados</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {pagination.paginatedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-14 rounded-full shrink-0 ${
                      item.status === "em_analise" ? "bg-blue-500" :
                      item.status === "aguardando_peca" ? "bg-orange-500" :
                      item.status === "em_reparo" ? "bg-yellow-500" :
                      item.status === "pronto" ? "bg-green-500" :
                      "bg-red-500"
                    }`} />
                    
                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium truncate">{item.pcNome}</span>
                          <Badge variant="outline" className="text-[10px] shrink-0">{item.id}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate pl-6">{item.origem}</p>
                      </div>

                      <div className="md:col-span-3 hidden md:block">
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.problema}</p>
                      </div>

                      <div className="md:col-span-2 hidden lg:block">
                        <div className="flex items-center gap-1.5 text-sm">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{item.tecnicoResponsavel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Calendar className="h-3 w-3" />
                          <span>{item.dataRecolhimento}</span>
                        </div>
                      </div>

                      <div className="md:col-span-3 flex items-center gap-2 justify-end flex-wrap">
                        <Badge className={`${getPrioridadeColor(item.prioridade)} text-[10px]`}>
                          {item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}
                        </Badge>
                        <Badge className={`${getStatusColor(item.status)} text-[10px]`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(item.status)}
                            <span className="hidden sm:inline">{getStatusLabel(item.status)}</span>
                          </span>
                        </Badge>
                        
                        {item.status !== "baixado" && item.status !== "pronto" && (
                          <Select
                            value={item.status}
                            onValueChange={(value: ManutencaoItem['status']) => handleUpdateStatus(item.id, value)}
                          >
                            <SelectTrigger className="h-7 w-7 p-0 border-0 bg-transparent [&>svg]:hidden">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </SelectTrigger>
                            <SelectContent align="end">
                              <SelectItem value="em_analise">Em Análise</SelectItem>
                              <SelectItem value="aguardando_peca">Aguardando Peça</SelectItem>
                              <SelectItem value="em_reparo">Em Reparo</SelectItem>
                              <SelectItem value="pronto">Pronto</SelectItem>
                              <SelectItem value="baixado">Baixar</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>

                  {(item.hardwareNecessario?.length || item.observacoes || item.previsaoRetorno) && (
                    <div className="mt-3 ml-5 pl-4 border-l-2 border-muted flex flex-wrap gap-x-6 gap-y-2 text-xs">
                      {item.previsaoRetorno && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <ArrowRight className="h-3 w-3" />
                          <span>Retorno: <span className="text-foreground font-medium">{item.previsaoRetorno}</span></span>
                        </div>
                      )}
                      {item.hardwareNecessario && item.hardwareNecessario.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Package className="h-3 w-3 text-orange-500" />
                          <span className="text-muted-foreground">Peças:</span>
                          {item.hardwareNecessario.map((hw, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] h-5">{hw}</Badge>
                          ))}
                        </div>
                      )}
                      {item.observacoes && (
                        <div className="flex items-start gap-1.5 text-muted-foreground w-full">
                          <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{item.observacoes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {pagination.paginatedItems.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Wrench className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>Nenhuma ordem de serviço nesta categoria</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                startIndex={pagination.startIndex}
                endIndex={pagination.endIndex}
                totalItems={pagination.totalItems}
                onPrevPage={pagination.prevPage}
                onNextPage={pagination.nextPage}
              />
            </div>
          </CardContent>
        </Card>

        {/* Hardware Pendente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Peças/Hardware Pendentes
            </CardTitle>
            <CardDescription>
              Lista de componentes necessários para conclusão das manutenções
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {manutencoes
                .filter(m => m.hardwareNecessario && m.hardwareNecessario.length > 0 && m.status !== "baixado")
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 rounded">
                        <Package className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.hardwareNecessario?.join(", ")}</p>
                        <p className="text-xs text-muted-foreground">Para: {item.pcNome} ({item.pcId})</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
