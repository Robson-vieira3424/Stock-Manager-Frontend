import { SwitchTypeProgressBar } from "@/functions/stock-progress-utils"

export type StockProgress = {
    type: string
    value: number
}

type StockProgressFinal = {
    label: string
    value: number
    color: string
}

type StockStatusProps = {
    listStockStatus?: StockProgress[]
}

export function StockStatus({ listStockStatus = progressBarDefault }: StockStatusProps) {
    const stock: StockProgressFinal[] = listStockStatus.map(item => {
        const { color, label } = SwitchTypeProgressBar(item.type)
        return {
            color,
            label,
            value: item.value
        }
    })

    return (
        <div className="flex flex-col space-y-4 gap-4">
            {stock.map((item) => (
                <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.value}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

const progressBarDefault: StockProgress[] = [
    { type: 'normal', value: 0 },
    { type: 'lower', value: 0 },
    { type: 'nothing', value: 0 }
]