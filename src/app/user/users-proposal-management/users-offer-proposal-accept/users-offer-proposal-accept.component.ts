import {Component, Inject, OnInit} from '@angular/core';
import {Offer} from "../../../models/Offer.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../../services/offers.service";
import {PhotosService} from "../../../services/photos.service";
import {ItemsService} from "../../../services/items.service";
import {UsersAddItemComponent} from "../../users-items-management/users-add-item/users-add-item.component";
import {UsersOfferProposalsListComponent} from "../users-offer-proposals-list/users-offer-proposals-list.component";

@Component({
  selector: 'app-users-offer-proposal-accept',
  templateUrl: './users-offer-proposal-accept.component.html',
  styleUrls: ['./users-offer-proposal-accept.component.css']
})
export class UsersOfferProposalAcceptComponent implements OnInit{

loadedProposal:Offer;

  constructor(private offerService: OffersService,
              public dialogRef: MatDialogRef<UsersOfferProposalsListComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { proposal:Offer}){}
  ngOnInit(): void {
  this.loadedProposal = this.data.proposal;

}

onConfirm(): void {
  // Close the dialog, return true
  this.dialogRef.close('success');
}

onDismiss(): void {
  // Close the dialog, return false
  this.dialogRef.close();
}

}
