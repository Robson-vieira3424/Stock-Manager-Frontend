import Card from "../../Card/Card";
import CardComputador from "../../Card/CardComputador";
import "../painel.css";
import { LuMonitor } from "react-icons/lu";

export default function PainelComputadores({ data }) {
  
  const{
      totalComputadores = 0,
      totalAtivos = 0,
      totalManutencao = 0,
      totalInativos = 0
  } = data || {};
  return (
    <>
      <section className="painel">
        <section className="container__cards">
          <CardComputador icon={<LuMonitor color="#0080FF"  fontSize={20} />} subtitle="Total" quantity= {totalComputadores} bgColor="#E5F2FF" />
         
          <CardComputador icon={<LuMonitor color="#43CE76" fontSize={20}/>} subtitle="Ativos" quantity= {totalAtivos} bgColor="#E8F9EF"/>
         
          <CardComputador icon={<LuMonitor color="#EAB308" fontSize={20}/>} subtitle="Manutenção" quantity= {totalManutencao} bgColor="#FDF7E6" />
         
          <CardComputador icon={<LuMonitor color="#EF4444"  fontSize={20}/>} subtitle="Inativos" quantity= {totalInativos} bgColor="#FDECEC"/>
        </section>
      </section>
    </>
  );
}