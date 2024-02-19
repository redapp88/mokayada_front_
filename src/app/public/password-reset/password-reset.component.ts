import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersAddItemComponent} from "../../user/users-items-management/users-add-item/users-add-item.component";
import {LoginComponent} from "../../login/login.component";
import {AppUser} from "../../models/AppUser.model";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {


  emailForm: FormGroup;
  tokenForm: FormGroup;
  errorMessage:string=""
  istokenFormVisible=false;
  passwordText:string=""
  isLoading:boolean= false;

  constructor(private formBuilder: FormBuilder,private usersService:UsersService,public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private data: { email: string}) {

  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: [{value:this.data.email, disabled:this.istokenFormVisible}, [Validators.required]]
    });

    this.tokenForm = this.formBuilder.group({
      code: ['', {validators: [Validators.required, Validators.minLength(12)]}],
      newPassword: ['', {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}],
      confirmPassword: ['', {validators: [Validators.required, this.confirmationMotDePasseValidator.bind(this)]}]
    });


    this.tokenForm.controls["newPassword"].valueChanges.forEach(value => {this.passwordText = value;console.log(this.passwordText)});
  }

  confirmationMotDePasseValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control.parent)
    const motDePasse = this.passwordText
    const confirmationMotDePasse = control.value;

    return motDePasse === confirmationMotDePasse ? null : {'nonCorrespondant': true};
  }
  onRequestToken(){
    this.isLoading=true;
    this.usersService.passwordResetRequest(this.emailForm.controls["email"].value).subscribe(
      (resData)=>{
        this.istokenFormVisible = true
        this.isLoading=false;



      },
      (error)=>{
        this.errorMessage=error
        this.isLoading=false;
      }
    )
  }

  onvalidatResetRequest(){
    this.isLoading = true;
    this.usersService.validatResetRequest(this.emailForm.controls["email"].value,this.tokenForm.controls["code"].value,this.tokenForm.controls["newPassword"].value).subscribe(
      (resData)=>{
        this.istokenFormVisible = true
        this.isLoading=false;
        this.dialogRef.close('dismiss');


      },
      (error)=>{
        this.errorMessage=error
        this.isLoading=false;
      }
    )
  }

  onChange(){
    console.log(this.passwordText)
  }

}
