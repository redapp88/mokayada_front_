import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isUser = this.authService.isUser()
    if (isUser === true)
      return isUser;

    else {
      this.authService.autoLogin().subscribe(
        (resData: boolean) => {
          isUser = resData;
        },
      )

      if (isUser==false){
        this.router.navigate(["/login"]);
      }
      return isUser;
    }
  }

}
