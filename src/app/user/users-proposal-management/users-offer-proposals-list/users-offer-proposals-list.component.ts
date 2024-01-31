import {Component, Inject, OnInit} from '@angular/core';
import {OffersService} from "../../../services/offers.service";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Offer} from "../../../models/Offer.model";
import {ArrayDataSource} from '@angular/cdk/collections';
import {FlatTreeControl, CdkTreeModule} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {UsersDetailsItemComponent} from "../../users-items-management/users-details-item/users-details-item.component";
import {UsersDetailsItemStaticComponent} from "../../users-items-management/users-details-item-static/users-details-item-static.component";
import {Item} from "../../../models/Item.model";
import {UsersOfferProposalAcceptComponent} from "../users-offer-proposal-accept/users-offer-proposal-accept.component";
import {UsersProposalOfferConcludedBoardComponent} from "../users-proposal-offer-concluded-board/users-proposal-offer-concluded-board.component";
import {UsersProposalManagementComponent} from "../users-proposal-management.component";


@Component({
  selector: 'app-users-offer-proposals-list',
  templateUrl: './users-offer-proposals-list.component.html',
  styleUrls: ['./users-offer-proposals-list.component.css']
})
export class UsersOfferProposalsListComponent implements OnInit {
  loadedOffer:Offer;
  loadedPropositions:Offer[];
  popUpWith :string= "50%";
  errorMessage: string;
  public constructor( public dialogRefPropoalList: MatDialogRef<UsersProposalManagementComponent>,private offersService:OffersService,private authService:AuthService, @Inject(MAT_DIALOG_DATA) private data: { offer: Offer },private dialog: MatDialog){}


  ngOnInit(): void {
   this.loadedOffer = this.data.offer;
   this.loadedPropositions = this.loadedOffer.propositions;

  }

  public onDetailsItem(item:Item){
    const dialogRef = this.dialog.open(UsersDetailsItemStaticComponent, {
      data: {item},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {

    });


  }

  onAcceptOffer(proposal:Offer){
    const dialogRefAcceptComp = this.dialog.open(UsersOfferProposalAcceptComponent, {
      data: {proposal},
      width: this.popUpWith,
    });
    dialogRefAcceptComp.afterClosed().subscribe(result => {
      if(result=="success"){
        this.offersService.acceptProposal(proposal).subscribe(
          ()=>{
              let offer=this.loadedOffer;
              let mode= "new"
            const dialogRefBoard = this.dialog.open(UsersProposalOfferConcludedBoardComponent, {
              data: {proposal,offer,mode},
              width: this.popUpWith,
            });
            dialogRefBoard.afterClosed().subscribe(result => {
              this.dialogRefPropoalList.close('success');

            });
          },
        (error)=>{
            this.errorMessage=error
        }
        )
       //

      }
    });

  }

}
