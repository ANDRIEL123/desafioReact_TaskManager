import { ClassCard } from "./Card";

export class ClassList {
    title: string;
    listCards: ClassCard[] = [];

    constructor(_title: string) {
        this.title = _title;
    }

    addCard = (titleCard: string, descriptionCard: string, prazo: Date, prioridade: number) => {
        let card = new ClassCard(titleCard, descriptionCard, prazo, prioridade)
        this.listCards.push(card)
    }
}