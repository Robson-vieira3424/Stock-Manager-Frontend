'use client'

import CardManutencao from "../../../Components/Card/Card-Manutencao";
import { TaxaRecuperacao } from "../../../Components/Graphs/Taxa-Recuperacao";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import { TbTool } from "react-icons/tb";
import { useManutencao } from "../../../hooks/useManutencao";
import { ManutencaoTable } from "../../../Components/Tables/table-manutencao";
import { HardwarePendente } from "../../../Components/Card/Card-Hardware-Pendente";

export default function Manutencao() {

    const { activeTab, aguardandoPeca, baixados, emAndamento, getFilteredManutencoes, prontos, setActiveTab, manutencoes, setManutencoes, pagination } = useManutencao()

    return (
        <main className="flex flex-col gap-5 px-15 py-10">
            <PageHeader
                icon={<span className="Icone-Header"><TbTool /></span>}
                title="Central de Manutenção"
                subtitle="Acompanhamento de equipamentos recolhidos para manutenção"
                buttonText="Nova Manutenção"
                onButtonClick={() => console.log('implementando..')}
            />
            <CardManutencao
                aguardandoPeca={aguardandoPeca.length}
                baixados={baixados.length}
                emAndamento={emAndamento.length}
                manutencoes={manutencoes.length}
                prontos={prontos.length} />
            <TaxaRecuperacao baixados={baixados.length} manutencoes={manutencoes.length} />
            <ManutencaoTable activeTab={activeTab} pagination={pagination} setActiveTab={setActiveTab} />
            <HardwarePendente manutencoes={manutencoes} />
        </main >
    );
}
