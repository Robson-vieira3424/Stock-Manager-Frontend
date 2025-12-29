'use client';


interface ServiceOrder {
    id: string;
    color: string;
    computerName: string;
    department: string;
    description: string;
    badges: string[];
    returnDate: string;
    parts: string[];
    warning?: string;
}

export const ORDERS: ServiceOrder[] = [
    {
        id: "1",
        color: "bg-green-500",
        computerName: "PC-Administrativo-01",
        department: "Secretaria de Finanças",
        description: "Computador não liga após queda de energia",
        badges: ["Em reparo", "Média"],
        returnDate: "25/12/2025",
        parts: ["Fonte", "Cabo de energia"],
    },
    {
        id: "2",
        color: "bg-yellow-500",
        computerName: "PC-Educacao-03",
        department: "Secretaria de Educação",
        description: "Lentidão excessiva no sistema",
        badges: ["Aguardando peças"],
        returnDate: "30/12/2025",
        parts: ["SSD 480GB"],
        warning: "Peça em falta no almoxarifado",
    },
];