import { ReactNode } from "react";
import { AiTwotoneTool } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

type CardManutencao = {
    icon: ReactNode
    title: string
    quantity: number
}

export const ManutencaoCards: Omit<CardManutencao, 'quantity'>[] = [
    { icon: <AiTwotoneTool />, title: 'Total em Manutenção' },
    { icon: <FaRegClock />, title: 'Em Andamento' },
    { icon: <BsBoxSeam />, title: 'Aguardando Peças' },
    { icon: <FaRegCheckCircle />, title: 'Prontos p/Devolução' },
    { icon: <VscError />, title: 'Baixadas' },
]