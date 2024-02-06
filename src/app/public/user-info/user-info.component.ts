import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PhotosService} from "../../services/photos.service";
import {UsersAddItemComponent} from "../../user/users-items-management/users-add-item/users-add-item.component";
import {Offer} from "../../models/Offer.model";
import {AppUser} from "../../models/AppUser.model";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  loadedUser:AppUser;
  constructor( public dialogRef: MatDialogRef<UsersAddItemComponent>, private dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) private data: { user: AppUser}){

  }
  ngOnInit(): void {
    this.loadedUser= this.data.user;
  }

  annuler() {
    this.dialogRef.close('dismiss');
  }

}
