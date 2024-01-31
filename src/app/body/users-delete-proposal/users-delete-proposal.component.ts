import {Component, Inject, OnInit} from '@angular/core';
import {ItemsService} from "../../services/items.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersAddItemComponent} from "../../user/users-items-management/users-add-item/users-add-item.component";
import {OffersService} from "../../services/offers.service";
import {Offer} from "../../models/Offer.model";

@Component({
  selector: 'app-users-delete-proposal',
  templateUrl: './users-delete-proposal.component.html',
  styleUrls: ['./users-delete-proposal.component.css']
})
export class UsersDeleteProposalComponent implements OnInit{
  errorMessage="";
  isLoading:boolean=false;
  loadedProposal:Offer;
  constructor(
    private offerService:OffersService,
    public dialogRef: MatDialogRef<UsersAddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proposal:Offer}) {
  }

  ngOnInit() {
    this.loadedProposal = this.data.proposal;
    this.isLoading=false;
    this.errorMessage="";
  }


  onDeleteProposal() {
    this.isLoading=true;
    this.offerService.deleteProposal(this.loadedProposal.id).subscribe(
      ()=>{
        this.isLoading=false;
        this.dialogRef.close('success');},
      (error)=>{this.isLoading=false;
        this.errorMessage=error.message}
    )
  }
}
