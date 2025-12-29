import { DepartmentChart } from "../../Components/Graphs/Bar-Graph"
import { MovementLineChart } from "../../Components/Graphs/Line-Graph"
import { StockProgress } from "../../Components/Graphs/Progress-Graph"
import { MovementsChart } from "../../Components/Graphs/Recent-Graph"
import { ApiInstanceAxios } from "../../config/axios.instance"

export type CardsInfo = {
    totalItens: number
    totalItensLastMonth: number
    todayMoviments: number
    stockLowerTotalMonth: number
    stockLowerTotalLastMonth: number
    totalItensValueMonth: number
    totalItensValueLastMonth: number
}

export const DashboardService = {

    async getAllCardsInfo(): Promise<CardsInfo | null> {
        const res = await ApiInstanceAxios.get('/dashboard-card')
        if (!res.data) {
            return null
        }
        const data: CardsInfo = res.data as CardsInfo
        return data
    },

    async getLineChartData(): Promise<MovementLineChart[] | null> {
        const res = await ApiInstanceAxios.get('/graph-linechart')
        if (!res.data) {
            return null
        }
        const data: MovementLineChart[] = res.data as MovementLineChart[]
        return data
    },

    async getDepartmentData(): Promise<DepartmentChart[] | null> {
        const res = await ApiInstanceAxios.get('/graph-department')
        if (!res.data) {
            return null
        }
        const data: DepartmentChart[] = res.data as DepartmentChart[]
        return data
    },

    async getRecentMovementsData(): Promise<MovementsChart[] | null> {
        const res = await ApiInstanceAxios.get('/graph-recent')
        if (!res.data) {
            return null
        }
        const data: MovementsChart[] = res.data as MovementsChart[]
        return data
    },

    async getStockStatusData(): Promise<StockProgress[] | null> {
        const res = await ApiInstanceAxios.get('/graph-stock')
        if (!res.data) {
            return null
        }
        const data: StockProgress[] = res.data as StockProgress[]
        return data
    },
}