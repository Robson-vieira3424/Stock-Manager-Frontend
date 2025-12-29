import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Monitor } from "lucide-react";
import { tecnicos } from "../../../test/test";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type ManutencaoFormProps = {
    isDialogOpen: boolean
    setIsDialogOpen: (state: boolean) => void
    selectedItem: Manutencao
    stock: Item

}


export function ManutencaoForm({ isDialogOpen, setIsDialogOpen }: ManutencaoFormProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
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
                    <div className="space-y-3">
                        <Label className="text-base font-semibold flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            Selecionar Computador *
                        </Label>
                        <Select>
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
                        <div className="space-y-2">
                            <Label>Descrição do Problema *</Label>
                            <Textarea
                                id="problema"
                                placeholder="Descreva o problema apresentado pelo equipamento..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Técnico Responsável *</Label>
                                <Select>
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
                            <div className="space-y-2">
                                <Label>Prioridade</Label>
                                <Select>
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
                            <div className="space-y-2">
                                <Label>Previsão de Retorno</Label>
                                <Input
                                    id="previsao"
                                    type="date"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Hardware Necessário</Label>
                                <Input
                                    id="hardware"
                                    placeholder="Ex: SSD 256GB, Memória 8GB"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Observações</Label>
                            <Textarea
                                id="observacoes"
                                placeholder="Observações adicionais..."
                                rows={2}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1">
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
    )
}