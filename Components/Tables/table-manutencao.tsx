import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getPrioridadeColor, getStatusColor, getStatusIcon, getStatusLabel } from "@/functions/utils-functions";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Monitor, Badge, User, Calendar, ArrowRight, Package, AlertTriangle, Wrench } from "lucide-react";
import { PaginationControls } from "../pagination-controls";
import { Pagination } from "../../hooks/useManutencao";
import { StatusManutencao } from "../../types/Manutencao";
import { formatarDataLegivel } from "@/services/functions";

type ManutencaoTableProps = {
    activeTab: string
    setActiveTab: (state: string) => void
    pagination: Pagination
}

export function ManutencaoTable({ activeTab, setActiveTab, pagination }: ManutencaoTableProps) {

    return (
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
                                <div className={`w-1 h-14 rounded-full shrink-0 ${item.status === StatusManutencao.AGUARDANDO ? "bg-orange-500" :
                                    item.status === StatusManutencao.ANDAMENTO ? "bg-yellow-500" :
                                        item.status === StatusManutencao.PRONTO ? "bg-green-500" :
                                            "bg-red-500"
                                    }`} />

                                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="md:col-span-4">
                                        <div className="flex items-center gap-2">
                                            <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span className="font-medium truncate">{item.equipamento.marca}</span>
                                            <Badge className="text-[10px] shrink-0">{item.equipamento.id}</Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5 truncate pl-6">{item.equipamento.secretaria.nome}</p>
                                    </div>

                                    <div className="md:col-span-3 hidden md:block">
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.descricaoProblema}</p>
                                    </div>

                                    <div className="md:col-span-2 hidden lg:block">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="truncate">{item.observacao}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatarDataLegivel(item.recolhimento ? item.recolhimento : new Date())}</span>
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

                                        {item.status !== StatusManutencao.BAIXADO && item.status !== StatusManutencao.PRONTO && (
                                            <Select
                                                value={item.status}
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

                            {(item.necessitaPeca || item.observacao || item.previsaoRetorno) && (
                                <div className="mt-3 ml-5 pl-4 border-l-2 border-muted flex flex-wrap gap-x-6 gap-y-2 text-xs">
                                    {item.previsaoRetorno && (
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <ArrowRight className="h-3 w-3" />
                                            <span>Retorno: <span className="text-foreground font-medium">{formatarDataLegivel(item.previsaoRetorno)}</span></span>
                                        </div>
                                    )}
                                    {item.necessitaPeca && (
                                        <div className="flex items-center gap-1.5">
                                            <Package className="h-3 w-3 text-orange-500" />
                                            <span className="text-muted-foreground">Peças:</span>
                                            <Badge className="text-[10px] h-5">{item.necessitaPeca}</Badge>
                                            {/* {item.necess.map((hw, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-[10px] h-5">{hw}</Badge>
                                            ))} */}
                                        </div>
                                    )}
                                    {item.observacao && (
                                        <div className="flex items-start gap-1.5 text-muted-foreground w-full">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 shrink-0" />
                                            <span className="line-clamp-1">{item.observacao}</span>
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
    )
}