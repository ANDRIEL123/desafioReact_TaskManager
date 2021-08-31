import { ClassCard } from "../entities/Card";
import { ClassList } from "../entities/List";

let ListCardsAux: ClassCard[]


export function orderPriority(list: ClassList) {
    list.listCards.sort(function (a, b) {
        if (a.prioridade > b.prioridade) return 1;
        if (a.prioridade < b.prioridade) return -1;
        return 0;
    })
    console.log(list)
    return list
}

export function orderDate(list: ClassList) {
    list.listCards.sort(function (a, b) {
        if (a.prazo > b.prazo) return 1;
        if (a.prazo < b.prazo) return -1;
        return 0;
    })
    console.log(list.listCards)
    return list
}