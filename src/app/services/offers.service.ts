import {Injectable} from '@angular/core';
import {Offer} from "../models/Offer.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environement/environement";
import {Subject,Observable} from "rxjs";
import {OfferRequest} from "../requests/Offer.request";
import {ProposalRequest} from "../requests/Proposal.request";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Notification} from "../models/Notification.model";


@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offerWithPropositionSubjetcs: Array<any>=[new Subject<any>(),new Subject<any>()]
  offersSubject: Subject<any> = new Subject<any>();
  offers: Offer[] = [];
  offerWithPropositions: Array<any>=[[],[]]


  constructor(private http:HttpClient,private authService:AuthService) {
  }

  emitOffers() {
    this.offersSubject.next(this.offers)
  }
  emitoffersWithPropsitions(order) {
    this.offerWithPropositionSubjetcs[order].next(this.offerWithPropositions[order])
  }
  public fetchOffers(keyword:string,city:string,categorie:string,page:number,size:number){
    let searcher = null;
    if(this.authService.curentUser){
      searcher = this.authService.curentUser.username
    }
    return new Observable(observer=>{
      this.http.get
      (`${environment.backEndUrl}/offers/byParams?searcher=${searcher}&keyword=${keyword}&city=${city}&categorie=${categorie}&page=${page}&size=${size}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.offers=resData;
          this.emitOffers();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public fetchOffersByUser(username:string,keyword:string){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/offers/byUser?username=${username}&keyword=${keyword}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.offers=resData;
          this.emitOffers();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public getOffer(offerId){
    return  this.http.get
    (`${environment.backEndUrl}/offers/getOne?offerId=${offerId}`,this.authService.httpOptions())

  }


  addOffer(title: string, description: string, categorie: string, city: any) {
    let request:OfferRequest = new OfferRequest(title,description,categorie,city,this.authService.curentUser.username);
    return this.http.post(`${environment.backEndUrl}/offers/add`,request, this.authService.httpOptions())


  }

  saveProposal(request: ProposalRequest) {

    return this.http.post(`${environment.backEndUrl}/offers/addProposal`,request, this.authService.httpOptions())

  }

  updateProposal(request: ProposalRequest) {
    return this.http.put(`${environment.backEndUrl}/offers/updateProposal`,request, this.authService.httpOptions())
  }

  fetchProposales(username: string) {
    return new Observable(observer=>{
      this.http.get(`${environment.backEndUrl}/offers/getProposales?username=${username}`, this.authService.httpOptions()).subscribe(
        (res:any)=>{
          this.offers=res;
          this.emitOffers();
          observer.complete();
        },
        (error)=>{observer.error(error)},
        ()=>[]
      )

      }
    )

  }

  deleteProposal(id: number) {
    return this.http.delete(`${environment.backEndUrl}/offers/deleteProposal/${id}`, this.authService.httpOptions())
  }

  acceptProposal(proposal: Offer) {
    return this.http.put(`${environment.backEndUrl}/offers/acceptProposal/${proposal.id}`,proposal, this.authService.httpOptions())

  }

  deleteOffer(offer: Offer) {
    return this.http.delete(`${environment.backEndUrl}/offers/deleteOffer/${offer.id}`, this.authService.httpOptions())
  }

  getContracts(username: string, mode: string,page:number,size:number,order) {

    return new Observable(observer=>{
        this.http.get(`${environment.backEndUrl}/offers/getContracts?username=${username}&mode=${mode}&page=${page}&size=${size}`, this.authService.httpOptions()).subscribe(
          (res:any)=>{

            this.offerWithPropositions[order]=res;
            this.emitoffersWithPropsitions(order)
            observer.complete();
          },
          (error)=>{observer.error(error)},
          ()=>[]
        )

      }
    )
  }

  getNotification(username:string){
    return this.http.get(`${environment.backEndUrl}/offers/getNotifications?username=${username}`, this.authService.httpOptions())
  }

  setReaded(notifications:Notification[]) {
    return this.http.put(`${environment.backEndUrl}/offers/readNotifications`,notifications, this.authService.httpOptions())

  }
}
