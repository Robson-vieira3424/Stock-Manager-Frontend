export function formatarDataLegivel(data: Date | string): string {
    const dataObj = typeof data === "string" ? new Date(data) : data

    if (isNaN(dataObj.getTime())) {
        return "Data inválida"
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(dataObj)
}