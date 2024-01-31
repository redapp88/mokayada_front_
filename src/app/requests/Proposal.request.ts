import {Item} from "../models/Item.model";

export class ProposalRequest {

  constructor(public offerId:number,public username:string,public items:Item[]){}

}
