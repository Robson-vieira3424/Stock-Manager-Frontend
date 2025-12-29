import { Clock, Package, Wrench, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export const getStatusColor = (status: string) => {
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

export const getStatusLabel = (status: string) => {
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

export const getPrioridadeColor = (prioridade: string) => {
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

export const getStatusIcon = (status: string) => {
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

