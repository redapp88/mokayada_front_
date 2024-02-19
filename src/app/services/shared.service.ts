import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersDeleteProposalComponent} from "../body/users-delete-proposal/users-delete-proposal.component";
import {InfoComponent} from "../shared/info/info.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  cities: String[] =  [
    'Casablanca',
    'Rabat',
    'Fès',
    'Tanger',
    'Marrakech',
    'Agadir',
    'Oujda',
    'Kenitra',
    'Tétouan',
    'Salé',
    'Meknès',
    'Nador',
    'Beni Mellal',
    'Témara',
    'Mohammédia'
  ];

  categories: String[] =  [
    'Électronique',
    'Mode',
    'Électroménager',
    'Beauté et santé',
    'Maison et jardin',
    'Sports et loisirs',
    'Alimentation et boissons',
    'Bébés et enfants',
    'Automobile',
    'Livres et médias',
    'Informatique',
    'Accessoires pour la maison',
    'Outils et bricolage',
    'Articles de voyage',
    'Produits écologiques'
  ];


  constructor(private _snackBar: MatSnackBar,private dialog: MatDialog,private authService:AuthService,private router:Router ) { }

  public  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      //panelClass: ['blue-snackbar'],
    });
  }

  public  openDialogInfo(title:string,message: string,style:string ,action:string) {
    console.log(action)
    const dialogRef = this.dialog.open(InfoComponent, {
      data: {title,message,style},
      width: "70%",
    });
    dialogRef.afterClosed().subscribe(result => {

        if(action === "disconnect"){
          this.authService.logout();
          this.router.navigate(["/login"])
        }


    });
  }
}
