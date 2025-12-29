import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export type MovementLineChart = {
    name: string
    entries: number
    exits: number
}

type LineChartMovimentacoesProps = {
    listMoviments?: MovementLineChart[]
}

export function LineChartMovimentacoes({ listMoviments = [] }: LineChartMovimentacoesProps) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <LineChart data={listMoviments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="entries" stroke="#16a34a" />
                <Line type="monotone" dataKey="exits" stroke="#dc2626" />
            </LineChart>
        </ResponsiveContainer>
    );
}