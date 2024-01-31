import {Component, Inject} from '@angular/core';
import {UsersOfferProposalsListComponent} from "../../user/users-proposal-management/users-offer-proposals-list/users-offer-proposals-list.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Offer} from "../../models/Offer.model";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  title: string;
  message: string;
  style: string;

  errorMessage: string;

  constructor(private offerService: OffersService,
              public dialogRef: MatDialogRef<UsersOfferProposalsListComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, style: string }) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.style = this.data.style;

  }

  onConfirm(): void {

    this.dialogRef.close('success');
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close();
  }
}
