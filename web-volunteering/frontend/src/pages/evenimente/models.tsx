export interface Projects{
    id_proiect: number,
    categorie: string,
    id_organizator:number;
    img: string
    inceput: string,
    nume:string,
    oras:string,
    organizator:string,
    sfarsit:string,
    status: string
    strada: string
    suma: string
    tara: string
    descriere:string
    suma_necesara:string
}

export enum menu{
    InformatiiGenerale='Informatii generale',
    Necesitati='Necesitati',
    Finantari='Finantari',
    Donatie='Înregistrează o donație'
}

export type menuType=menu.InformatiiGenerale|menu.Necesitati|menu.Finantari|menu.Donatie

export interface Necesitati{
    id_necesitate:number;
    cantitate:string;
    necesitate:string
}
export interface Donatii{
    id_donatie:number
    nume:string
    prenume:string
    cantitate:string;
    donatii:string
    data:string
}

export interface Transactions{
    organizatie:string;
    data:string
    suma:string

}