import {AppUser} from "./AppUser.model";
import {AppPhoto} from "./AppPhoto.model";
import {Offer} from "./Offer.model";

export class Item {
  constructor(public id:number,public title:string,public description:string, public status:string,public creationDate:Date,public owner:AppUser,public photos:AppPhoto[],public offers:Offer[]) {
  }

}
