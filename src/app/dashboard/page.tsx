'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import './dashboard.css';
import { useEffect, useState } from "react";
import CardDashboard from "../../../Components/Card/Card-Dashboard";
import { HiMiniSquares2X2, HiOutlineFunnel } from "react-icons/hi2";
import { HiOutlineCalendar } from "react-icons/hi2";
import { GraphCard } from "../../../Components/Card/Graph-Cards";
import { BarChartDepartamentos, DepartmentChart } from "../../../Components/Graphs/Bar-Graph";
import { LineChartMovimentacoes, MovementLineChart } from "../../../Components/Graphs/Line-Graph";
import { StockProgress, StockStatus } from "../../../Components/Graphs/Progress-Graph";
import { MovementsChart, RecentMovements } from "../../../Components/Graphs/Recent-Graph";
import { dashboardCardsConfig } from "../../../Components/Card/config-card-dashboard";
import { CardsInfo, DashboardService } from "@/services/dashboard-service";

type DataDashboardPage = {
    cardsInfo: CardsInfo
    movementsLineChart: MovementLineChart[]
    departmentChart: DepartmentChart[]
    movementsChart: MovementsChart[]
    stockStatusChart: StockProgress[]
}


export default function DashboardPage() {
    const [filtroData, setFiltroData] = useState<string>()
    const [filtroSecretaria, setFiltroSecretaria] = useState<string>()
    const [dataDashboard, setDataDashboard] = useState<DataDashboardPage | null>(null);

    useEffect(() => {
        setDataDashboard((prev) => ({
            ...prev,
            movementsLineChart: [{
                name: 'Jan',
                entries: 4,
                exits: 15
            }, {
                name: 'Fev',
                entries: 2,
                exits: 9
            },
            {
                name: 'Mar',
                entries: 12,
                exits: 15
            }, {
                name: 'Mai',
                entries: 15,
                exits: 9
            }
            ]
        }) as DataDashboardPage)

        setDataDashboard((prev) => ({
            ...prev,
            stockStatusChart: [{
                type: 'normal',
                value: 50
            },
            {
                type: 'lower',
                value: 25
            },
            {
                type: 'nothing',
                value: 25
            }
            ]
        }) as DataDashboardPage)

        DashboardService.getAllCardsInfo().then(cardsInfo =>
            setDataDashboard(prev => ({
                ...prev,
                cardsInfo,
            }) as DataDashboardPage)
        );

        // DashboardService.getLineChartData().then(movementsLineChart =>
        //     setDataDashboard(prev => ({
        //         ...prev,
        //         movementsLineChart,
        //     }) as DataDashboardPage)
        // );

        DashboardService.getDepartmentData().then(departmentChart =>
            setDataDashboard(prev => ({
                ...prev,
                departmentChart,
            }) as DataDashboardPage)
        );

        DashboardService.getRecentMovementsData().then(movementsChart =>
            setDataDashboard(prev => ({
                ...prev,
                movementsChart,
            }) as DataDashboardPage)
        );

        // DashboardService.getRecentMovementsData().then(stockStatusChart =>
        //     setDataDashboard(prev => ({
        //         ...prev,
        //         stockStatusChart,
        //     }) as DataDashboardPage)
        // );
    }, []);


    return (
        <>
            <section
                id="header_filtros"
            >
                <section className="flex gap-2 items-center">
                    <HiMiniSquares2X2 className="rounded-sm" size={40} />
                    <section>
                        <h1>Dashboard</h1>
                        <p>Visão Geral do sistema patrimonial</p>
                    </section>
                </section>
                <section id="header_filtros">
                    <Select name="filtro_data" onValueChange={setFiltroData}>
                        <SelectTrigger className="w-[150px] flex items-center gap-0">
                            <div className="flex justify-center items-center flex-1">
                                <HiOutlineCalendar className="self-center-safe" size={18} color="black" />
                            </div>
                            <div className="flex-5">
                                <SelectValue placeholder="Filtro de Data" />
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="month">Último mês</SelectItem>
                            <SelectItem value="three">Últimos 3 meses</SelectItem>
                            <SelectItem value="six">Últimos 6 meses</SelectItem>
                            <SelectItem value="year">Último ano</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select name="filtro_data" onValueChange={setFiltroSecretaria}>
                        <SelectTrigger className="w-[150px] flex items-center gap-0">
                            <div className="flex justify-center items-center flex-1">
                                <HiOutlineFunnel size={18} color="black" />
                            </div>
                            <div className="flex-5">
                                <SelectValue placeholder="Secretaria" />
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="education">Educação</SelectItem>
                            <SelectItem value="health">Saúde</SelectItem>
                            <SelectItem value="work">Obras</SelectItem>
                            <SelectItem value="transport">Transporte</SelectItem>
                        </SelectContent>
                    </Select>
                </section>
            </section>
            <section id="dashboard">
                <CardDashboard
                    icon={dashboardCardsConfig[0].icon}
                    quantity={'0'}
                    subtitle={'0'}
                    title={dashboardCardsConfig[0].title}
                />
                <CardDashboard
                    icon={dashboardCardsConfig[1].icon}
                    quantity={'0'}
                    subtitle={'0'}
                    title={dashboardCardsConfig[1].title}
                />
                <CardDashboard
                    icon={dashboardCardsConfig[2].icon}
                    quantity={'0'}
                    subtitle={'0'}
                    title={dashboardCardsConfig[2].title}
                />
                <CardDashboard
                    icon={dashboardCardsConfig[3].icon}
                    quantity={'0'}
                    subtitle={'0'}
                    title={dashboardCardsConfig[3].title}
                />
            </section>
            <section
                id="dashboard-graphs"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <GraphCard title="Entradas e Saídas">
                    <LineChartMovimentacoes listMoviments={dataDashboard?.movementsLineChart} />
                </GraphCard>

                <GraphCard title="Itens por Departamento">
                    <BarChartDepartamentos />
                </GraphCard>

                <GraphCard title="Movimentações Recentes">
                    <RecentMovements />
                </GraphCard>

                <GraphCard title="Status de Estoque">
                    <StockStatus />
                </GraphCard>
            </section>
        </>
    );
}
