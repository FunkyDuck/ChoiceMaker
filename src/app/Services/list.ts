import { IList } from "./ilist";

export class List implements IList {
    name: string;
    data: string[];
    
    constructor (name: string, data: string[]){
        this.name = name;
        this.data = data;
    }
}