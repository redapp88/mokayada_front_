import {Offer} from "./Offer.model";

export class OffersPage {
  public constructor(public content:Offer[],public pageSize:number,public numberOfElements:number) {


  }
}
