import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Badge } from "lucide-react";
import { ORDERS } from "./ServiceOrders-Constants";

export function ServiceOrders() {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle>Ordens de Serviço</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Gerencie equipamentos em manutenção
                    </p>
                </div>

                {/* Tabs / Filtro */}
                <Tabs defaultValue="todas">
                    <TabsList>
                        <TabsTrigger value="todas">Todas</TabsTrigger>
                        <TabsTrigger value="em-reparo">Em reparo</TabsTrigger>
                        <TabsTrigger value="aguardando">Aguardando</TabsTrigger>
                        <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
                        <TabsTrigger value="baixadas">Baixadas</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>

            <CardContent className="space-y-4">
                {ORDERS.map((order) => (
                    <div
                        key={order.id}
                        className="flex gap-4 rounded-lg border p-4"
                    >
                        {/* Indicador de cor */}
                        <div className={`w-2 rounded-full ${order.color}`} />

                        {/* Conteúdo */}
                        <div className="flex-1 space-y-2">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex gap-2 items-center">
                                    <Monitor className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{order.computerName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.department}
                                        </p>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex gap-1 flex-wrap">
                                    {order.badges.map((badge) => (
                                        <Badge key={badge}>
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Descrição */}
                            <p className="text-sm">{order.description}</p>

                            <Separator />

                            {/* Informações */}
                            <div className="text-sm space-y-1">
                                <p>
                                    <strong>Retorno:</strong> {order.returnDate}
                                </p>
                                <p>
                                    <strong>Peças:</strong>{" "}
                                    {order.parts.length > 0
                                        ? order.parts.join(", ")
                                        : "Nenhuma"}
                                </p>
                            </div>

                            {/* Aviso opcional */}
                            {order.warning && (
                                <div className="rounded-md bg-yellow-100 px-3 py-2 text-sm text-yellow-800">
                                    ⚠ {order.warning}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
