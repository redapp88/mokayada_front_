import {Component, Inject, OnInit} from '@angular/core';
import {PhotosService} from "../../../services/photos.service";
import {environment} from "../../../../environement/environement";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ItemsService} from "../../../services/items.service";
import {UsersAddItemComponent} from "../../users-items-management/users-add-item/users-add-item.component";
import {ImageMaximizeComponent} from "../../../shared/image-maximize/image-maximize.component";
import {AppPhoto} from "../../../models/AppPhoto.model";
import {OffersService} from "../../../services/offers.service";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-users-add-offer',
  templateUrl: './users-add-offer.component.html',
  styleUrls: ['./users-add-offer.component.css']
})
export class UsersAddOfferComponent implements OnInit {


  form: FormGroup;
  errorMessage = "";
  isSavingOffer: boolean = false;
  imagePath: string;
  cities = this.sharedService.cities;
  categories = this.sharedService.categories;



  //***images ***//
  constructor(private offersService: OffersService,
              private sharedService:SharedService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              private photoService: PhotosService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: { id: number }) {
  }

  ngOnInit() {
    this.isSavingOffer = false;
    this.errorMessage = "";


    this.form = new FormGroup({

      title: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),
      categorie: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),
      city: new FormControl('', {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })
    this.form.get('categorie').setValue(this.categories[0]);
    this.form.get('city').setValue(this.cities[0]);
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


}
