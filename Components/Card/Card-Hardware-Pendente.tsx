import { CardHeader, Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { getStatusColor, getStatusLabel } from "@/functions/utils-functions"
import { Package, Badge } from "lucide-react"
import { Manutencao, StatusManutencao } from "../../types/Manutencao"

type HardwarePendenteProps = {
    manutencoes: Manutencao[]
}

export function HardwarePendente({ manutencoes }: HardwarePendenteProps) {
    return (
        < Card >
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
                        .filter(m => m.necessitaPeca && m.status !== StatusManutencao.BAIXADO)
                        .map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/10 rounded">
                                        <Package className="h-4 w-4 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{item.necessitaPeca}</p>
                                        <p className="text-xs text-muted-foreground">Para: {item.equipamento.marca} ({item.equipamento.id})</p>
                                    </div>
                                </div>
                                <Badge className={getStatusColor(item.status)}>
                                    {getStatusLabel(item.status)}
                                </Badge>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card >
    )
}