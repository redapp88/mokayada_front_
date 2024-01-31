import {Component, OnInit} from '@angular/core';
import {OffersService} from "../../services/offers.service";
import {AuthService} from "../../services/auth.service";
import {Offer} from "../../models/Offer.model";
import {FormControl, FormGroup} from "@angular/forms";
import {UsersProposalOfferConcludedBoardComponent} from "../users-proposal-management/users-proposal-offer-concluded-board/users-proposal-offer-concluded-board.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-users-contract-management',
  templateUrl: './users-contract-management.component.html',
  styleUrls: ['./users-contract-management.component.css']
})
export class UsersContractManagementComponent implements OnInit {
  errorMessages:Array<string> = ["",""];
  loadedpwosPages:Array<any>=[];
  mode:string="mines";
  pages: Array<number> = [0,0];
  sizes: Array<number> = [5,5];
  form: FormGroup;
  popUpWith :string= "80%";
  constructor(public offersService:OffersService,public authService:AuthService,private dialog: MatDialog){}

  ngOnInit() {
    this.form = new FormGroup({
      modeCnt: new FormControl({value: '', disabled: false},{
        validators:[]
      }),

    })
    for(let i=0;i<2;i++)
    {
      this.offersService.offerWithPropositionSubjetcs[i].subscribe(
        (resData)=>{
          this.loadedpwosPages[i]=resData;
        }
      )
    }


    this.fetchContracts("mines",0);
   this.fetchContracts("received",1);
  }

  fetchContracts(mode,order){
   this.mode=mode;

    this.offersService.getContracts(this.authService.curentUser.username,this.mode,this.pages[order],this.sizes[order],order).subscribe(
      ()=>{},
    (error)=>{this.errorMessages[order]=error},
      ()=>{}
    );
  }


  onPaginatorChange($event: any,order:number) {
    this.pages[order] = $event.pageIndex;
    this.sizes[order] = $event.pageSize;
    this.fetchContracts(this.mode,order);


  }

  onDetailsContract(offer,proposal,mode){
    const dialogRefBoard = this.dialog.open(UsersProposalOfferConcludedBoardComponent, {
      data: {proposal,offer,mode},
      width: this.popUpWith,
    });
  }
}
