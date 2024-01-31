import {Component, Inject, OnInit} from '@angular/core';
import {Offer} from "../../models/Offer.model";
import {ActivatedRoute, Route} from "@angular/router";
import {OffersService} from "../../services/offers.service";

import {PhotosService} from "../../services/photos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersAddItemComponent} from "../../user/users-items-management/users-add-item/users-add-item.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../../models/Item.model";
import {UsersDetailsItemComponent} from "../../user/users-items-management/users-details-item/users-details-item.component";
import {UsersDetailsItemStaticComponent} from "../../user/users-items-management/users-details-item-static/users-details-item-static.component";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {


  form: FormGroup;
  errorMessage = "";
  isSavingOffer: boolean = false;
  imagePath: string;
  cities:String[]=["Rabat","Casablanca","Fes","Agadir"];
  categories:String[]=["Maison","Auto-Moto","Enfants","Voyages"];
  mode:string = "withoutDeleteOption";
  loadedOffer:Offer;

  //***images ***//
  constructor(private offersService: OffersService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              private photoService: PhotosService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: { offer: Offer,mode:string }) {
  }

  ngOnInit() {
    this.mode=this.data.mode;
    this.loadedOffer=this.data.offer;
    console.log(this.loadedOffer)
    this.isSavingOffer = false;
    this.errorMessage = "";


    this.form = new FormGroup({

      title: new FormControl({value: this.loadedOffer.title, disabled: true}, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl({value: this.loadedOffer.description, disabled: true}, {
        updateOn: 'change',
        validators: []
      }),
      categorie: new FormControl({value: this.loadedOffer.categorie, disabled: true}, {
        updateOn: 'change',
        validators: []
      }),
      city: new FormControl({value: this.loadedOffer.city, disabled: true}, {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })
    this.form.get('categorie').setValue(this.loadedOffer.categorie);
    this.form.get('city').setValue(this.loadedOffer.city);
  }


  onSaveOffer() {
    this.isSavingOffer= true;
    this.errorMessage = "";

    this.offersService.addOffer(this.form.value['title'], this.form.value['description'], this.form.value['categorie'],this.form.value['city']).subscribe(
      (res: any) => {
        this.isSavingOffer = false;
        this.dialogRef.close('success');
      },
      (error) => {
        this.isSavingOffer = false;
        this.errorMessage = error.message
      }
    )
  }
  onDetailsItem(item:Item){
//console.log(item)
      const dialogRef = this.dialog.open(UsersDetailsItemStaticComponent, {
        data: {item:item},
        width: "60%",
      });
      dialogRef.afterClosed().subscribe(result => {

      });


  }
}
