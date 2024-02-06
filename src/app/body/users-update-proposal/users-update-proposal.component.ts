import {Component, Inject} from '@angular/core';
import {Item} from "../../models/Item.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PhotosService} from "../../services/photos.service";
import {UsersAddOfferComponent} from "../../user/users-offers-management/users-add-offer/users-add-offer.component";
import {OffersService} from "../../services/offers.service";
import {ItemsService} from "../../services/items.service";
import {AuthService} from "../../services/auth.service";
import {ProposalRequest} from "../../requests/Proposal.request";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UsersAddItemComponent} from "../../user/users-items-management/users-add-item/users-add-item.component";
import {SharedService} from "../../services/shared.service";
import {Offer} from "../../models/Offer.model";
import {UsersDeleteProposalComponent} from "../users-delete-proposal/users-delete-proposal.component";
import {UsersDetailsItemStaticComponent} from "../../user/users-items-management/users-details-item-static/users-details-item-static.component";

@Component({
  selector: 'app-users-update-proposal',
  templateUrl: './users-update-proposal.component.html',
  styleUrls: ['./users-update-proposal.component.css']
})
export class UsersUpdateProposalComponent {


  private form: FormGroup;
  private isSavingOffer: boolean = false;
  private errorMessage = "";
  cities: String[] = ["Rabat", "Casablanca", "Fes", "Agadir"];
  categories: String[] = ["Maison", "Auto-Moto", "Enfants", "Voyages"];

  loadedOffer: Offer;
  loadedProposal: Offer;
  allUsersItems: Item[] = [];
  proposedItems: Item[] = [];
  isLoadingAllUsersItems: boolean = false;
  isLoadingPorposalItems: boolean = false;
  isLoadingLoadedOfferItems: boolean = false;
  isSavingProposal: boolean = false;
  page: number = 0;
  size: number = 5;
  seachForm: FormGroup;
  popUpWith: string = "60%";
  selectedOffer: Offer = null;
  loadedOfferItems: any;
  mode:string = "withoutDeleteOption";

  constructor(private offersService: OffersService, private itemsService: ItemsService, private authService: AuthService, private sharedService: SharedService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              private photoService: PhotosService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: { offer: Offer,mode:string }) {
  }


  ngOnInit(): void {
    this.mode=this.data.mode;

    this.isSavingOffer = false;
    this.errorMessage = "";
    this.loadedOffer = this.data.offer;
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


    this.seachForm = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      })
    })

    this.itemsService.userItemsSubject.subscribe(
      (res) => {
        this.allUsersItems = res;

        let temporalArrayItems: Item[] = [];
        this.allUsersItems.forEach(i => {
          if (!this.proposedItems.some(e => e.id === i.id)) {
            temporalArrayItems.push(i);
          }
        })
        this.allUsersItems = temporalArrayItems;


      }
    )
    this.itemsService.offersItemsSubject.subscribe(
      (res) => {
        this.loadedOfferItems = res
      }
    )
    // this.proposedItems=
    this.loadedOffer.propositions.forEach(o => {
      if (o.owner?.username == this.authService.curentUser.username) {
        this.loadedProposal = o;
        this.proposedItems = o.items;
      }
    })


    this.laodOfferItems(this.data.offer.id);
    this.loadAllUsersItems();
  }

  laodOfferItems(offerId) {
    this.isLoadingLoadedOfferItems = true;
    this.itemsService.fetchOfferItems(this.authService.curentUser.username, offerId).subscribe(
      () => {
        this.isLoadingLoadedOfferItems = false;
      },
      (error) => {
        this.isLoadingLoadedOfferItems = false;
      },
      () => {
        this.isLoadingLoadedOfferItems = false;
      }
    )
  }

  loadAllUsersItems() {

    this.isLoadingAllUsersItems = true
    this.itemsService.fetchUserItems(this.authService.curentUser.username).subscribe(
      () => {
      },
      error => {
        this.errorMessage = error.message;
        this.isLoadingAllUsersItems = false
      },
      () => {
        this.isLoadingAllUsersItems = false

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

  onAddProposal(offer: Offer) {
    const dialogRef = this.dialog.open(UsersAddOfferComponent, {
      data: {offer},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Offer added successfuly", "")
        // this.fetchOffers();
      }
    });
  }


  onUpdateProposal() {
    this.isSavingProposal = true;
    let request = new ProposalRequest(this.loadedProposal.id, this.authService.curentUser.username, this.proposedItems)
    this.offersService.updateProposal(request).subscribe(
      () => {
        this.isSavingProposal = false;
        this.dialogRef.close('success');
      },
      (error) => {
        this.errorMessage = error;
        this.isSavingProposal = false;
      }
    )
  }

  annuler() {
    this.dialogRef.close('dismiss');
  }

  onDeleteProposal(){
    let proposal = this.loadedProposal

    const dialogRef = this.dialog.open(UsersDeleteProposalComponent, {
      data: {proposal},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.sharedService.openSnackBar("Suppression effectuée", "")
        this.dialogRef.close('success');
      }
    });
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


