'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CardDashboard from "../../../components/Card/Card-Dashboard";
import { dashboardCardsConfig } from "../../../components/Card/config-card-dashboard";
import './dashboard.css';
import { useState } from "react";

export default function DashboardPage() {
    const [filtroData, setFiltroData] = useState<string>()
    const [filtroSecretaria, setFiltroSecretaria] = useState<string>()

    return (
        <>
            <section id="header_main">
                <section>
                    <h1>Dashboard</h1>
                    <p>Visão Geral do sistema patrimonial</p>
                </section>
                <section id="header_filtros">
                    <Select name="filtro_data" onValueChange={(value) => setFiltroData(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtro de Data" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mounth">Último mês</SelectItem>
                            <SelectItem value="three">Últimos 3 meses</SelectItem>
                            <SelectItem value="six">Últimos 6 meses</SelectItem>
                            <SelectItem value="year">Último ano</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select name="filtro_secretaria" onValueChange={(value) => setFiltroSecretaria(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Secretaria" />
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
                {dashboardCardsConfig.map((element, idx) => (
                    <CardDashboard
                        key={idx}
                        icon={element.icon}
                        quantity={element.quantity}
                        subtitle={element.subtitle}
                        title={element.title}
                    />
                ))}
            </section>
        </>
    );
}
