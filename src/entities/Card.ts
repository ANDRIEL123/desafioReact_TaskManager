export class ClassCard {
    titleCard: string;
    descriptionCard: string;
    prazo: Date;
    prioridade: number;

    constructor(_title: string, _description: string, _prazo: Date, _prioridade: number) {
        this.titleCard = _title;
        this.descriptionCard = _description;
        this.prazo = _prazo;
        this.prioridade = _prioridade;
    }
}