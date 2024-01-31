import {AppUser} from "./AppUser.model";
import {Item} from "./Item.model";

export class Offer {
  public constructor(public id: number, public creationDate: Date, public title: string, public description: string,
                     public status: string, public city: string, public categorie: string, public parentOffer: Offer, public propositions: Offer[], public owner: AppUser, public items: Item[]) {

  }
}
