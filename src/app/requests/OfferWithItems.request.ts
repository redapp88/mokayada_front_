import {OfferRequest} from "./Offer.request";
import {Item} from "../models/Item.model";

export class OfferWithItemsRequest {
  constructor(offerRequest:OfferRequest,items:Item[]){}

}
