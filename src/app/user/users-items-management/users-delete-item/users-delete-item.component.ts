import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UsersAddItemComponent} from "../users-add-item/users-add-item.component";
import {ItemsService} from "../../../services/items.service";
import {PhotosService} from "../../../services/photos.service";

@Component({
  selector: 'app-users-delete-item',
  templateUrl: './users-delete-item.component.html',
  styleUrls: ['./users-delete-item.component.css']
})
export class UsersDeleteItemComponent implements OnInit{
  errorMessage="";
  isLoading:boolean=false;
  constructor(
              private itemsService:ItemsService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number,title:string}) {
  }

  ngOnInit() {
    this.isLoading=false;
    this.errorMessage="";
  }


  onDeleteItem() {
    this.isLoading=true;
    console.log(this.data.id)
    this.itemsService.delete(this.data.id).subscribe(
      ()=>{
        this.isLoading=false;
        this.dialogRef.close('success');},
      (error)=>{this.isLoading=false;
       this.errorMessage=error.message}
    )
  }
}
