
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environement/environement";
import {Observable, Subject} from "rxjs";
import {Item} from "../models/Item.model";
import {ItemRequest} from "../requests/Item.request";
import {Injectable} from "@angular/core";
import {Offer} from "../models/Offer.model";
import {OfferWithItemsRequest} from "../requests/OfferWithItems.request";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsSubject: Subject<any> = new Subject<any>();
  offersItemsSubject: Subject<any> = new Subject<any>();
  userItemsSubject: Subject<any> = new Subject<any>();
  items: Item[] = [];
  offersItems:Item[]=[];
  userItems:Item[]=[];


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  emitItems() {
    this.itemsSubject.next(this.items)
  }

  emitOffersItems() {
    this.offersItemsSubject.next(this.offersItems);
  }


  emitUserItems() {

    this.userItemsSubject.next(this.userItems);
  }

  public fetchitems(username: string, page: number, size: number) {
    return new Observable(observer => {

      this.http.get
      (`${environment.backEndUrl}/items/byParams?username=${username}&page=${page}&size=${size}`, this.authService.httpOptions()).subscribe(
        (resData: any) => {
          this.items = resData;
          this.emitItems();
          observer.complete()
        },
        (error) => {
          observer.error(error)
        }
      )

    })
  }


  public fetchUserItems(username: string) {
    return new Observable(observer => {

      this.http.get
      (`${environment.backEndUrl}/items/byUser?username=${username}`, this.authService.httpOptions()).subscribe(
        (resData: any) => {
          this.userItems = resData;
          this.emitUserItems();

          observer.complete()
        },
        (error) => {
          observer.error(error)
        }
      )

    })
  }

  public getItem(itemId) {
    return this.http.get<Item>
    (`${environment.backEndUrl}/items/getOne?id=${itemId}`, this.authService.httpOptions())

  }


  addItem(title: string, status: string, description: string) {

    let request:ItemRequest = new ItemRequest(title,status,description,this.authService.curentUser.username);
      return this.http.post(`${environment.backEndUrl}/items/add`,request, this.authService.httpOptions())


  }

  delete(itemId: number) {

    return this.http.delete(`${environment.backEndUrl}/items/delete/${itemId}`, this.authService.httpOptions())

  }

  update(id: number, title: string, status: string, description: string) {
    let request:ItemRequest = new ItemRequest(title,status,description,this.authService.curentUser.username);


    return this.http.put(`${environment.backEndUrl}/items/update/${id}`,request, this.authService.httpOptions())
  }

  fetchOfferItems(username:string,offerId: number) {
    return new Observable(observer => {

      this.http.get
      (`${environment.backEndUrl}/items/byOffer?username=${username}&offerId=${offerId}`, this.authService.httpOptions()).subscribe(
        (resData: any) => {
          this.items = resData.availableItems;
          this.offersItems = resData.offerItems;
          this.emitOffersItems();
          this.emitItems();
          observer.complete();
        },
        (error) => {
          observer.error(error)
        }
      )

    })
  }

  saveItemAffectation(selectedOffer: Offer, offerWithItemsRequest:OfferWithItemsRequest) {

    return this.http.post(`${environment.backEndUrl}/items/saveToOffer?offerId=${selectedOffer.id}`,offerWithItemsRequest, this.authService.httpOptions())

  }


}
