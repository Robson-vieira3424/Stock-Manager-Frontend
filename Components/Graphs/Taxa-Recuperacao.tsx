import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { TrendingUp } from "lucide-react";

type TaxaRecuperacaoProps = {
    manutencoes: number
    baixados: number
}

export function TaxaRecuperacao({ baixados, manutencoes }: TaxaRecuperacaoProps) {
    const recuperados = manutencoes - baixados

    const taxaRecuperacao =
        manutencoes > 0
            ? Math.round((recuperados / manutencoes) * 100)
            : 0

    return (
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
                        <span className="text-sm text-muted-foreground">
                            Recuperados vs Baixados
                        </span>
                        <span className="text-sm font-medium">
                            {taxaRecuperacao}%
                        </span>
                    </div>

                    <Progress value={taxaRecuperacao} className="h-3" />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{recuperados} equipamentos recuperados</span>
                        <span>{baixados} equipamentos baixados</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}