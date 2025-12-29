import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export type DepartmentChart = {
    name: string
    itens: number
}

type BarChartDepartamentosProps = {
    listDepartments?: DepartmentChart[]
}

export function BarChartDepartamentos({ listDepartments = [] }: BarChartDepartamentosProps) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={listDepartments}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="itens" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}