import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PhotosService} from "../../../services/photos.service";
import {ItemsService} from "../../../services/items.service";
import {UsersAddItemComponent} from "../users-add-item/users-add-item.component";
import {Item} from "../../../models/Item.model";

@Component({
  selector: 'app-users-details-item-static',
  templateUrl: './users-details-item-static.component.html',
  styleUrls: ['./users-details-item-static.component.css']
})
export class UsersDetailsItemStaticComponent implements OnInit {
  loadedItem:Item;

  constructor(private itemsService: ItemsService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              private photoService: PhotosService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { item:Item}) {
  }

  ngOnInit(): void {
    console.log(this.data.item)
    this.loadedItem = this.data.item;
  }

}
