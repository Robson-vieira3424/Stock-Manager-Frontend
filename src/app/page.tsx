
export default function Home() {
  return (
    <main>
      <section>
        <section>
          <h1>Dashboard</h1>
          <p>Visão Geral do sistema patrimonial</p>
        </section>
        <section>
          <select name="filtro_data" id="filtro_data">
            <option value="mounth">Último mês</option>
            <option value="three">Últimos 3 meses</option>+
            <option value="six">Últimos 6 meses</option>
            <option value="year">Últimos ano</option>
          </select>
          <select name="filtro_" id="filtro_data">
            <option value="mounth">Último mês</option>
            <option value="three">Últimos 3 meses</option>+
            <option value="six">Últimos 6 meses</option>
            <option value="year">Últimos ano</option>
          </select>
        </section>
      </section>
    </main>
  );
}
