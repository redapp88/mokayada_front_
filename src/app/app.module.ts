import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {OfferDetailsComponent} from './offers/offer-details/offer-details.component';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UsersItemsManagementComponent} from './user/users-items-management/users-items-management.component';
import {UsersOffersManagementComponent} from './user/users-offers-management/users-offers-management.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {UsersAddItemComponent} from './user/users-items-management/users-add-item/users-add-item.component';
import {ImageMaximizeComponent} from './shared/image-maximize/image-maximize.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersDeleteItemComponent} from './user/users-items-management/users-delete-item/users-delete-item.component';
import {UsersDetailsItemComponent} from './user/users-items-management/users-details-item/users-details-item.component';
import {MatListModule} from "@angular/material/list";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { UsersAddOfferComponent } from './user/users-offers-management/users-add-offer/users-add-offer.component';
import {MatButtonModule} from "@angular/material/button";
import { UsersAddProposalComponent } from './body/users-add-proposal/users-add-proposal.component';
import { UsersUpdateProposalComponent } from './body/users-update-proposal/users-update-proposal.component';
import { UsersProposalManagementComponent } from './user/users-proposal-management/users-proposal-management.component';
import { UsersDeleteProposalComponent } from './body/users-delete-proposal/users-delete-proposal.component';
import { UsersOfferProposalsListComponent } from './user/users-proposal-management/users-offer-proposals-list/users-offer-proposals-list.component';
import {CdkTreeModule} from "@angular/cdk/tree";
import { UsersDetailsItemStaticComponent } from './user/users-items-management/users-details-item-static/users-details-item-static.component';
import { UsersOfferProposalAcceptComponent } from './user/users-proposal-management/users-offer-proposal-accept/users-offer-proposal-accept.component';
import { UsersProposalOfferConcludedBoardComponent } from './user/users-proposal-management/users-proposal-offer-concluded-board/users-proposal-offer-concluded-board.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { UsersDeleteOfferComponent } from './user/users-offers-management/users-delete-offer/users-delete-offer.component';
import { UsersContractManagementComponent } from './user/users-contract-management/users-contract-management.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";
import { SubscribeComponent } from './public/subscribe/subscribe.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { InfoComponent } from './shared/info/info.component';
import { UserInfoComponent } from './public/user-info/user-info.component';
import { ProfileManagementComponent } from './user/profile-management/profile-management.component';
import {PasswordEditComponent} from "./user/profile-management/password-edit/password-edit.component";
import { PasswordResetComponent } from './public/password-reset/password-reset.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    OfferDetailsComponent,
    LoginComponent,
    UsersItemsManagementComponent,
    UsersOffersManagementComponent,
    UsersAddItemComponent,
    ImageMaximizeComponent,
    UsersDeleteItemComponent,
    UsersDetailsItemComponent,
    UsersAddOfferComponent,
    UsersAddProposalComponent,
    UsersUpdateProposalComponent,
    UsersProposalManagementComponent,
    UsersDeleteProposalComponent,
    UsersOfferProposalsListComponent,
    UsersDetailsItemStaticComponent,
    UsersOfferProposalAcceptComponent,
    UsersProposalOfferConcludedBoardComponent,
    UsersDeleteOfferComponent,
    UsersContractManagementComponent,
    SubscribeComponent,
    InfoComponent,
    UserInfoComponent,
    ProfileManagementComponent,
    PasswordEditComponent,
    PasswordResetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatListModule,
    DragDropModule,
    MatButtonModule,
    CdkTreeModule,
    ScrollingModule,
    MatRadioModule,
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-Fr' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
