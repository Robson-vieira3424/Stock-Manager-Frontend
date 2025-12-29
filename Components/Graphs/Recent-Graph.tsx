export type MovementsChart = {
    id: number
    item: string
    type: string
    date: string
}

type RecentMovementsProps = {
    listMovements?: MovementsChart[]
}

export function RecentMovements({ listMovements = [] }: RecentMovementsProps) {
    return (
        <ul className="flex flex-col space-y-3 gap-2">
            {listMovements.map((mov) => (
                <li
                    key={mov.id}
                    className="flex justify-between items-center text-sm"
                >
                    <span className="flex-1 font-medium">{mov.item}</span>
                    <span
                        className={`flex justify-center font-bold flex-1 text-xs px-2 py-1 rounded-full ${mov.type === "Entrada"
                            ? " text-green-700"
                            : " text-red-700"
                            }`}
                    >
                        {mov.type}
                    </span>
                    <span className="flex flex-1 justify-end text-gray-400">{mov.date}</span>
                </li>
            ))}
        </ul>
    );
}
