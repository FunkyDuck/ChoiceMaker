import { IElementList } from "./ielement-list";

export class ElementList implements IElementList {
    // id: number;
    name: string;
    
    constructor(/*id: number,*/ name: string) {
        // this.id = id;
        this.name = name
    }
}