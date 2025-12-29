'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Clock, Package, CheckCircle2, XCircle } from "lucide-react";

export interface CardProps {
    emAndamento: number
    baixados: number
    manutencoes: number
    aguardandoPeca: number
    prontos: number
}

export default function CardManutencao({
    aguardandoPeca,
    baixados,
    emAndamento,
    manutencoes,
    prontos
}: CardProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Wrench className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total em Manutenção</p>
                            <p className="text-2xl font-bold">{manutencoes}</p>
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
                            <p className="text-2xl font-bold">{emAndamento}</p>
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
                            <p className="text-2xl font-bold">{aguardandoPeca}</p>
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
                            <p className="text-2xl font-bold">{prontos}</p>
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
                            <p className="text-2xl font-bold">{baixados}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
