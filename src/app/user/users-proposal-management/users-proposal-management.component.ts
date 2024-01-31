import {Component, OnInit} from '@angular/core';
import {OffersService} from "../../services/offers.service";
import {AuthService} from "../../services/auth.service";
import {Offer} from "../../models/Offer.model";
import {Subscription} from "rxjs";
import {UsersUpdateProposalComponent} from "../../body/users-update-proposal/users-update-proposal.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";
import {UsersDeleteItemComponent} from "../users-items-management/users-delete-item/users-delete-item.component";
import {UsersDeleteProposalComponent} from "../../body/users-delete-proposal/users-delete-proposal.component";

@Component({
  selector: 'app-users-proposal-management',
  templateUrl: './users-proposal-management.component.html',
  styleUrls: ['./users-proposal-management.component.css']
})
export class UsersProposalManagementComponent implements OnInit{
  proposalesSubscribtion:Subscription;
  isLoading:boolean = false;
  loadedProposales=[];
  private errorMessage: string;
  popUpWith: string = "80%";

  constructor(private offersService:OffersService,private authService:AuthService,private dialog: MatDialog,private sharedService:SharedService){

  }
  ngOnInit(): void {

    this.offersService.offersSubject.subscribe(
      (res)=>{
        this.loadedProposales = res;
        console.log( this.loadedProposales)

      }
    )

    this. loadProposales();
  }


  loadProposales(){
    this.isLoading = true;
    this.offersService.fetchProposales(this.authService.curentUser.username).subscribe(
      ()=>{
        this.isLoading=false;

      },
    (error)=>{
        this.errorMessage=error;
    }
    );
  }

  onDetails(offer:Offer){


      const dialogRef = this.dialog.open(UsersUpdateProposalComponent, {
        data: {offer},
        width: this.popUpWith,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "success") {
          this.sharedService.openSnackBar("Modification effectuée", "")
          this.loadProposales();
        }
      });

  }

  onDelete(proposal:Offer){
    let mode = "withoutDeleteOption";
    const dialogRef = this.dialog.open(UsersDeleteProposalComponent, {
      data: {proposal,mode},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Suppression effectuée", "")
        this.loadProposales();
      }
    });
  }


}
