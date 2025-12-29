'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";

interface EquipmentRecoveryRateProps {
    recovered: number;
    discarded: number;
}

export default function EquipmentRecoveryRate({
    recovered,
    discarded,
}: EquipmentRecoveryRateProps) {
    const total = recovered + discarded;
    const recoveryRate = total > 0 ? Math.round((recovered / total) * 100) : 0;
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-base">
                    Taxa de Recuperação de Equipamentos
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Percentual de equipamentos que retornam ao funcionamento após manutenção
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-3xl font-bold">
                    {recoveryRate}%
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                    Recuperados vs Baixados
                </div>
                <Progress value={recoveryRate} className="h-2" />
                <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                        {recovered} equipamentos recuperados
                    </span>
                    <span className="text-red-600">
                        {discarded} equipamentos baixados
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
