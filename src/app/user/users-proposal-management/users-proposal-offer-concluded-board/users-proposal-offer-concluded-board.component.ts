import {Component, Inject, OnInit} from '@angular/core';
import {Offer} from "../../../models/Offer.model";
import {OffersService} from "../../../services/offers.service";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UsersDetailsItemStaticComponent} from "../../users-items-management/users-details-item-static/users-details-item-static.component";
import {Item} from "../../../models/Item.model";

@Component({
  selector: 'app-users-proposal-offer-concluded-board',
  templateUrl: './users-proposal-offer-concluded-board.component.html',
  styleUrls: ['./users-proposal-offer-concluded-board.component.css']
})
export class UsersProposalOfferConcludedBoardComponent implements OnInit{
  loadedProposal:Offer;
  loadedOffer:Offer;
  mode:string
  popUpWith = "60%";
  public constructor(private offersService:OffersService,private authService:AuthService, @Inject(MAT_DIALOG_DATA) private data: { offer: Offer,proposal:Offer,mode:string },private dialog: MatDialog){}
  ngOnInit(): void {
    this.loadedProposal=this.data.proposal;
    this.loadedOffer=this.data.offer;
    this.mode=this.data.mode;

  }


  public onDetailsItem(item:Item){
    const dialogRef = this.dialog.open(UsersDetailsItemStaticComponent, {
      data: {item},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {

    });


  }

}
