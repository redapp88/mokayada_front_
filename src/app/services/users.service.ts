import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {OfferRequest} from "../requests/Offer.request";
import {environment} from "../../environement/environement";
import {AppUserRequest} from "../requests/AppUserRequest.request";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient,private authService:AuthService){}

  addUser(firstName:string,lastName:string,sex:string,birthDate:Date,email:string,phone:string,username:string,password:string) {

    let request:AppUserRequest = new AppUserRequest(firstName,lastName,sex,birthDate,email,phone,username,password);
    console.log(request);
    return this.http.post(`${environment.backEndUrl}/auth/register`,request)


  }
}
