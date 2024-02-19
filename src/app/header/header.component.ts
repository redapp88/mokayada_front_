import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Notification} from "../models/Notification.model";
import {OffersService} from "../services/offers.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit{

  loadedNotifications:Notification[] = [];
  unreadNotifications:number=0;
  errorMessage:string=""
  isNotificationListOpened=false;

  constructor(private router:Router,public authService:AuthService,public offersService:OffersService){
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
if(this.isAuthenticated){
    this.offersService.getNotification(this.authService.curentUser?.username).subscribe(
      (resData:any)=>{
        this.loadedNotifications=resData;
        this.unreadNotifications = this.loadedNotifications.filter(notification => notification.readed == false).length

      },
      (error)=>{
        this.errorMessage = error;
      }
    )
}
  }
  goToLogin(){
    this.router.navigate(["/login"])
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(["/login"])
  }



  onReadNotifications(){
    if(this.isNotificationListOpened==false){
      this.isNotificationListOpened=!this.isNotificationListOpened;
      this.offersService.setReaded(this.loadedNotifications).subscribe(
        (resData)=>{


        },
        (error)=>{
          this.errorMessage=error;

        }
      )


      this.loadedNotifications.forEach(notification=>{
        if(notification.readed==false){
          notification.readed=true;
          this.changeColor(notification.id);
        }
      })
    }

  }




  changeColor(id) {
    let element =  document.getElementById(id); // Sélectionnez l'élément <i>
    let currentColor = [255, 0, 0]; // Couleur de départ : rouge (en RGB)
    let targetColor = [255, 255, 255]; // Couleur cible : blanc (en RGB)
    let duration = 1000; // Durée de la transition en millisecondes
    let steps = 50; // Nombre d'étapes de transition

    let step = [
      (targetColor[0] - currentColor[0]) / steps,
      (targetColor[1] - currentColor[1]) / steps,
      (targetColor[2] - currentColor[2]) / steps
    ];

    let currentStep = 0;

    let timer = setInterval(() => {
      currentColor[0] += step[0];
      currentColor[1] += step[1];
      currentColor[2] += step[2];
      element.style.backgroundColor = `rgb(${Math.round(currentColor[0])},${Math.round(currentColor[1])},${Math.round(currentColor[2])})`;
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  }


}
