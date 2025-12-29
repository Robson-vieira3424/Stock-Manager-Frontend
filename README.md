# 📦 Stock Manager – Departamento de Tecnologia

Sistema completo de **gestão de ativos e controle de estoque**, desenvolvido para o **Departamento de Tecnologia da Prefeitura Municipal de Penedo**.

A aplicação centraliza o controle de **entradas e saídas de periféricos**, além de gerenciar o **inventário de hardware** e o **histórico de manutenções** do município.

---

## 🎯 Objetivo do Projeto

Facilitar o controle de estoque e ativos de TI, garantindo:
- Visibilidade do inventário em tempo real  
- Rastreabilidade das movimentações  
- Organização dos equipamentos por secretaria  
- Histórico técnico de manutenções  

---

## 🚀 Funcionalidades Principais

### 📊 Gestão de Estoque e Movimentações

- **Controle Dinâmico de Produtos**
  - Listagem com indicadores de **Estoque Baixo**
  - Exibição de **Unidades Disponíveis**
  
- **Lógica Inteligente de Movimentação**
  - Entradas ➕ somam no estoque
  - Saídas ➖ subtraem automaticamente
  - Atualização em tempo real do saldo do produto

- **Histórico Detalhado**
  - Registro de movimentações com:
    - Data
    - Categoria
    - Tipo (Entrada / Saída)
    - Destino ou origem

---

### 🖥️ Módulo de Hardware *(Em Desenvolvimento)*

- **Inventário de Computadores**
  - Cadastro técnico de máquinas
  - Vinculação com **secretarias municipais**
  - Localização rápida dos equipamentos

- **Gestão de Manutenções**
  - Histórico de reparos
  - Status do equipamento (ativo, em manutenção, inativo)
  - Registro de observações técnicas

---

## 🛠️ Stack Técnica

### 🔹 Frontend
- **React.js**
- **TypeScript**
- **Tailwind CSS** *(ou CSS Modules)*

**Destaques:**
- Componentização reutilizável
- Cards de resumo (KPIs)
- Tabelas dinâmicas com filtros e busca

---

### 🔹 Backend
- API REST
- Persistência de dados
- Atualização automática do estoque

---

## 📸 Telas do Sistema

### 📦 Dashboard de Estoque
![Dashboard](./images/dashboard.png)

### 🔄 Movimentações
![Movimentações](./images/movimentacoes.png)

### 🖥️ Inventário de Hardware
![Hardware](./images/hardware.png)

### 🛠️ Manutenções
![Manutenções](./images/manutencoes.png)

---

## 📁 Estrutura do Projeto

## 📁 Estrutura do Projeto

```bash
src/
├── app/
│   ├── dashboard/
│   ├── estoque/
│   ├── movimentacoes/
│   ├── computadores/
│   ├── manutencao/
│   ├── relatorios/
│   ├── configuracoes/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Card/
│   ├── Forms/
│   ├── Tables/
│   ├── Modal/
│   └── HeaderGlobal/
│
├── lib/
├── utils/
├── types/
└── config/
    └── axios.instance.ts

