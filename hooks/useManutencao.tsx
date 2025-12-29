import { useState } from "react";
import { Manutencao, StatusManutencao } from "../types/Manutencao";
import { usePagination } from "./usePagination";

export function useManutencao() {
    const [activeTab, setActiveTab] = useState("todos");
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([])
    const emAndamento = manutencoes.filter(m => m.status === StatusManutencao.ANDAMENTO);
    const prontos = manutencoes.filter(m => m.status === StatusManutencao.PRONTO);
    const baixados = manutencoes.filter(m => m.status === StatusManutencao.BAIXADO);
    const aguardandoPeca = manutencoes.filter(m => m.status === StatusManutencao.AGUARDANDO);

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

    return {
        emAndamento,
        baixados,
        prontos,
        aguardandoPeca,
        getFilteredManutencoes,
        activeTab,
        setActiveTab,
        manutencoes,
        setManutencoes,
        pagination
    }
}

export type Pagination = {
    currentPage: number;
    totalPages: number;
    paginatedItems: Manutencao[];
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    resetPage: () => void;
    totalItems: number;
    startIndex: number;
    endIndex: number;
}