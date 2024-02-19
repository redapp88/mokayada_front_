import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {OfferRequest} from "../requests/Offer.request";
import {environment} from "../../environement/environement";
import {AppUserRequest} from "../requests/AppUserRequest.request";
import {PasswordRequest} from "../requests/Password.request";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient,private authService:AuthService){}

  addUser(firstName:string,lastName:string,sex:string,birthDate:Date,email:string,phone:string,username:string,password:string) {

    let request:AppUserRequest = new AppUserRequest(firstName,lastName,sex,birthDate,email,phone,username,password);
   // console.log(request);
    return this.http.post(`${environment.backEndUrl}/auth/register`,request)


  }

  getUser(username: string) {
    return this.http.get(`${environment.backEndUrl}/auth/getUser?username=${username}`,this.authService.httpOptions());
  }

  updateUser(firstName:string,lastName:string,sex:string,birthDate:Date,email:string,phone:string,username:string) {

    let request:AppUserRequest = new AppUserRequest(firstName,lastName,sex,birthDate,email,phone,null,null);

    return this.http.put(`${environment.backEndUrl}/auth/updateUser?username=${username}`,request,this.authService.httpOptions())


  }

  updatePassword(oldPassword:string,newPassword:string,username:string) {

    let request:PasswordRequest = new PasswordRequest(oldPassword,newPassword);

    return this.http.put(`${environment.backEndUrl}/auth/updatePassword?username=${username}`,request,this.authService.httpOptions())


  }


  passwordResetRequest(email: string) {
    return this.http.get(`${environment.backEndUrl}/tokens/passwordResetRequest?email=${email}`)

  }

  validatResetRequest(email: string, code: string, password: string) {

    return this.http.put(`${environment.backEndUrl}/tokens/validatResetRequest?email=${email}`,{newPassword:password,tokenCode:code})
  }
}
