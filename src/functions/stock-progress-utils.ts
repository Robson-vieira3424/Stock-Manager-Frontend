export function SwitchTypeProgressBar(type: string) {
    switch (type) {
        case 'normal':
            return {
                color: "bg-green-500",
                label: 'Estoque Normal'
            }
        case 'lower':
            return {
                color: "bg-yellow-500",
                label: 'Estoque Baixo'
            }
        case 'void':
            return {
                color: "bg-red-500",
                label: 'Sem Estoque'
            }
        default:
            return {
                color: "bg-red-500",
                label: 'Sem Estoque'
            }
    }
}