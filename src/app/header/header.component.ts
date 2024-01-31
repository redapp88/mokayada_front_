import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router,public authService:AuthService){
  }
isAuthenticated = false;
  authenticatedUser = null;
  ngOnInit(){
this.authService.userSubject.subscribe(
  (res=>{
    this.authenticatedUser=res;

  })
)
    this.authService.isAuthentificated().subscribe(
      (res=>{
        this.isAuthenticated=res;
        if(res==true){
          this.authenticatedUser = this.authService.curentUser;
        }


        this.authService.autoLogin().subscribe(
          (res) => {
            if (res) {
              this.isAuthenticated=res;
              console.log("logged user "+this.authenticatedUser.firstname);
            }
          }
        )
      })
    )

  }
  goToLogin(){
    this.router.navigate(["/login"])
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(["/login"])
  }

}
