import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {BodyComponent} from "./body/body.component";
import {FooterComponent} from "./footer/footer.component";
import {OfferDetailsComponent} from "./offers/offer-details/offer-details.component";
import {LoginComponent} from "./login/login.component";
import {UsersOffersManagementComponent} from "./user/users-offers-management/users-offers-management.component";
import {UserGuard} from "./guards/user.guard";
import {UsersItemsManagementComponent} from "./user/users-items-management/users-items-management.component";
import {UsersProposalManagementComponent} from "./user/users-proposal-management/users-proposal-management.component";
import {UsersContractManagementComponent} from "./user/users-contract-management/users-contract-management.component";
import {SubscribeComponent} from "./public/subscribe/subscribe.component";

const routes: Routes = [
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },
  // public Area
  {path: 'public/home',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: BodyComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'offers/details/:offerId',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: OfferDetailsComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'login',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: LoginComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},

  {path: 'subscribe',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: SubscribeComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'user/offers-management',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: UsersOffersManagementComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  {path: 'user/items-management',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: UsersItemsManagementComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},

  {path: 'user/proposales-management',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: UsersProposalManagementComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},

  {path: 'user/contracts-management',canActivate:[UserGuard],
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: UsersContractManagementComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
