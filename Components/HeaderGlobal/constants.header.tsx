import { BsBoxSeam, BsFileEarmarkText } from "react-icons/bs"
import { FaGear } from "react-icons/fa6"
import { GrConfigure } from "react-icons/gr"
import { LuArrowLeftRight, LuLayoutDashboard } from "react-icons/lu"
import { PiClipboardTextBold } from "react-icons/pi"

export type NavHeaderItem = {
    icon: React.ReactNode
    name: string
    href: string
}

export const NavHeaderConfig: NavHeaderItem[] = [
    { icon: <LuLayoutDashboard fontSize={20} />, name: 'Dashboard', href: '/dashboard' },
    { icon: <BsBoxSeam fontSize={18} />, name: 'Estoque', href: '/estoque' },
    { icon: <LuArrowLeftRight fontSize={18} />, name: 'Movimentações', href: '/movimentacoes' },
    { icon: <GrConfigure fontSize={18} />, name: 'Manutenção', href: '/manutencao' },
    { icon: <PiClipboardTextBold fontSize={20} />, name: 'Levantamento', href: '/levantamento' },
    { icon: <BsFileEarmarkText fontSize={20} />, name: 'Relatórios', href: '/relatorios' },
    { icon: <FaGear fontSize={19} />, name: 'Configurações', href: '/configuracoes' },
]