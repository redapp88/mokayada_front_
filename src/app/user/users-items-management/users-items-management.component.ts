
import {ItemsService} from "../../services/items.service";
import {Item} from "../../models/Item.model";
import {AuthService} from "../../services/auth.service";

import {UsersAddItemComponent} from "./users-add-item/users-add-item.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../services/shared.service";
import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {UsersDeleteItemComponent} from "./users-delete-item/users-delete-item.component";
import {UsersDetailsItemComponent} from "./users-details-item/users-details-item.component";

@Component({
  selector: 'app-users-items-management',
  templateUrl: './users-items-management.component.html',
  styleUrls: ['./users-items-management.component.css']
})
export class UsersItemsManagementComponent {
  loadedItemsPage;
  form: FormGroup
  errorMessage: string = "";
  isLoading: boolean = false;
  page: number = 0;
  size: number = 5;
  popUpWith :string= "60%";

  constructor(private itemsService: ItemsService,private sharedService:SharedService, private authService: AuthService,private dialog: MatDialog) {

  }

  ngOnInit() {

    this.itemsService.itemsSubject.subscribe(
      (res => {
        this.loadedItemsPage = res
      })
    )

   this.loadItems();

  }

  public goToDetails(itemId){


}
  onPaginatorChange($event: any) {
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.loadItems();


  }

loadItems(){
  this.isLoading=true
  this.itemsService.fetchitems(this.authService.curentUser.username, this.page, this.size).subscribe(
    () => {
    },
    error => {
      this.errorMessage = error.message;
      this.isLoading = false
    },
    () => {
      this.isLoading = false
    }
  )
}

  onAddItem() {
    const dialogRef = this.dialog.open(UsersAddItemComponent, {
      data: {},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.sharedService.openSnackBar("Item added successfuly","")
        this.loadItems();
      }
    });
  }

  public onDelete(id,title){
    const dialogRef = this.dialog.open(UsersDeleteItemComponent, {
      data: {id,title},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.loadItems();

      }
    });


  }


  public onDetails(id,title){
    const dialogRef = this.dialog.open(UsersDetailsItemComponent, {
      data: {id,title},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.loadItems();

      }
    });


  }

}
