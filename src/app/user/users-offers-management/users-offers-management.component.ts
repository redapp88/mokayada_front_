import {Component} from '@angular/core';
import {Offer} from "../../models/Offer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../../services/items.service";
import {SharedService} from "../../services/shared.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {OffersService} from "../../services/offers.service";
import {Item} from "../../models/Item.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {UsersAddItemComponent} from "../users-items-management/users-add-item/users-add-item.component";
import {UsersAddOfferComponent} from "./users-add-offer/users-add-offer.component";
import {OfferRequest} from "../../requests/Offer.request";
import {OfferWithItemsRequest} from "../../requests/OfferWithItems.request";
import {UsersOfferProposalsListComponent} from "../users-proposal-management/users-offer-proposals-list/users-offer-proposals-list.component";
import {UsersDeleteOfferComponent} from "./users-delete-offer/users-delete-offer.component";

@Component({
  selector: 'app-users-offers-management',
  templateUrl: './users-offers-management.component.html',
  styleUrls: ['./users-offers-management.component.css']
})
export class UsersOffersManagementComponent {

  constructor(private offersService: OffersService, private itemsService: ItemsService, private sharedService: SharedService, private authService: AuthService, private dialog: MatDialog) {
  }

  loadedOffers: Offer[] = [];
  loadedOfferItems: Item[] = [];
  loadedItems: Item[] = [];
  errorMessage: string = "";
  isLoadingOffers: boolean = false;
  isLoadingItems: boolean = false;
  isLoadingOfferItems: boolean = false;
  isSavingItems: boolean = false;
  page: number = 0;
  size: number = 5;
  form: FormGroup;
  offerform: FormGroup;
  popUpWith: string = "60%";
  selectedOffer: Offer = null;
  cities: String[] = ["Rabat", "Casablanca", "Fes", "Agadir"];
  categories: String[] = ["Maison", "Auto-Moto", "Enfants", "Voyages"];

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      })
    })

    this.offerform = new FormGroup({

      title: new FormControl({value: '', disabled: this.isDisabledOffer()}, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl({value: '', disabled: this.isDisabledOffer()}, {
        updateOn: 'change',
        validators: []
      }),
      categorie: new FormControl({value: '', disabled: this.isDisabledOffer()}, {
        updateOn: 'change',
        validators: []
      }),
      city: new FormControl({value: '', disabled: this.isDisabledOffer()}, {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })

    this.offersService.offersSubject.subscribe(
      (res) => {
        this.loadedOffers = res;
        if (this.loadedOffers.length > 0) {

        }
      }
    )

    this.itemsService.itemsSubject.subscribe(
      (res) => {
        this.loadedItems = res
      }
    )
    this.itemsService.offersItemsSubject.subscribe(
      (res) => {
        this.loadedOfferItems = res
      }
    )

    this.fetchOffers()

  }


  public fetchOffers() {
    this.isLoadingOffers = true;


    this.offersService.fetchOffersByUser(this.authService.curentUser.username, this.form.value["keyword"]).subscribe(
      () => {
      },
      (error) => {
        this.isLoadingOffers = false
        this.errorMessage = error
      },
      () => {
        this.isLoadingOffers = false;
      }
    )
  }


  fetchOfferItems(offerId: number) {
    this.isLoadingOfferItems = true
    this.itemsService.fetchOfferItems(this.authService.curentUser.username, offerId).subscribe(
      () => {
      },
      error => {
        this.errorMessage = error.message;
        this.isLoadingItems = false
      },
      () => {
        this.isLoadingItems = false
      }
    )
  }


  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onAddOffer() {
    const dialogRef = this.dialog.open(UsersAddOfferComponent, {
      data: {},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Offer added successfuly", "")
        this.fetchOffers();
      }
    });
  }

  onChangeSelectedOffer(offer) {
    this.disableEnableForm(offer)
    this.selectedOffer = offer;
    console.info(this.selectedOffer)
    this.offerform.get('title').setValue(offer.title);
    this.offerform.get('description').setValue(offer.description);
    this.offerform.get('categorie').setValue(offer.categorie);
    this.offerform.get('city').setValue(offer.city);
    this.fetchOfferItems(offer.id);

  }

  onSaveItemsAffectation() {
    this.isSavingItems = true;
    let offerRequest: OfferRequest = new OfferRequest
    (this.offerform.get('title').value, this.offerform.get('description').value, this.offerform.get('categorie').value, this.offerform.get('city').value, null);


    let offerWithItemsRequest: OfferWithItemsRequest = {
      offerRequest: offerRequest,
      items: this.loadedOfferItems

    }

    //console.log(offerWithItemsRequest)
    this.itemsService.saveItemAffectation(this.selectedOffer, offerWithItemsRequest).subscribe(
      () => {
        this.isSavingItems = false;
        this.fetchOffers();
      },
      (error) => {
        this.errorMessage = error;
        this.isSavingItems = false;
      }
    )
  }


  isTheSelectedOne(i: number,offer:Offer): boolean {
    if(this.loadedOffers.length==0)
      return false;
    else if (this.selectedOffer === null){
      if(i === 0){
        this.onChangeSelectedOffer(offer)
        return true;
      }

      else return false
    }
    else if(offer.id===this.selectedOffer.id){
      return true;

    }
    else return false;
  }


  private disableEnableForm(offer:Offer){
    if(offer.status !== "FREE"){
      this.offerform.get('title').disable();
      this.offerform.get('description').disable();
      this.offerform.get('categorie').disable();
      this.offerform.get('city').disable();
    }
    else{
      this.offerform.get('title').enable();
      this.offerform.get('description').enable();
      this.offerform.get('categorie').enable();
      this.offerform.get('city').enable();
    }

  }

  onShowProposals(){
    let offer = this.selectedOffer;
    const dialogRef = this.dialog.open(UsersOfferProposalsListComponent, {
      data: {offer},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Proposition accepté", "")
        this.fetchOffers();
      }
    });
  }

  onDeleteOffer(offer:Offer){

    const dialogRef = this.dialog.open(UsersDeleteOfferComponent, {
      data: {offer},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Offre supprimé", "")
        this.fetchOffers();
      }
    });
  }

  isDisabledOffer():boolean{
    let isDisabled = false;
    if(this.selectedOffer == null){
      isDisabled=true;
    }
    if(this.selectedOffer?.propositions.length>0 && this.selectedOffer.status==='FREE'){
      isDisabled = true;
    }
    if(this.selectedOffer?.propositions.length>0 && this.selectedOffer.status==='CONCLUDED'){
      isDisabled = true;
    }
    return isDisabled;
  }

}
