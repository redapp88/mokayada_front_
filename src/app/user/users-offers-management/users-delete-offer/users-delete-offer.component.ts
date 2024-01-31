import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../../services/offers.service";
import {UsersOfferProposalsListComponent} from "../../users-proposal-management/users-offer-proposals-list/users-offer-proposals-list.component";
import {Offer} from "../../../models/Offer.model";

@Component({
  selector: 'app-users-delete-offer',
  templateUrl: './users-delete-offer.component.html',
  styleUrls: ['./users-delete-offer.component.css']
})
export class UsersDeleteOfferComponent  implements OnInit{

  loadedOffer:Offer;
  errorMessage:string;
  constructor(private offerService: OffersService,
              public dialogRef: MatDialogRef<UsersOfferProposalsListComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { offer:Offer}){}
  ngOnInit(): void {
    this.loadedOffer = this.data.offer;

  }

  onConfirm(): void {
this.offerService.deleteOffer(this.loadedOffer).subscribe(
  ()=>{
    this.dialogRef.close('success');
  },
  (error)=>{
    this.errorMessage = error;
  }
)

  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close();
  }

}
