import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {
  form: FormGroup;
  passwordText = "";
  errorMessage = ""
  isSaving = false;

  ngOnInit(): void {


    this.form = new FormGroup({
      password: new FormControl({
        value: "",
        disabled: this.isSaving
      }, {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),

      newPassword: new FormControl({
        value: "",
        disabled: this.isSaving
      }, {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),

      repassword: new FormControl({
        value: "",
        disabled: this.isSaving
      }, {validators: [Validators.required, this.confirmationMotDePasseValidator.bind(this)]}),

    });


    this.form.controls["newPassword"].valueChanges.forEach(value => this.passwordText = value);
  }


  constructor(private _formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog, private router: Router, private authService: AuthService,
              private sharedService: SharedService) {
  }


  confirmationMotDePasseValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control.parent)
    const motDePasse = this.passwordText
    const confirmationMotDePasse = control.value;

    return motDePasse === confirmationMotDePasse ? null : {'nonCorrespondant': true};
  }

  onUpdate() {
    this.isSaving=true;
    this.usersService.updatePassword(this.form.controls["password"].value, this.form.controls["newPassword"].value, this.authService.curentUser.username).subscribe(
      (resData) => {
        this.isSaving=false;
        this.sharedService.openDialogInfo("Information", "Mot de pass modifier avec success", "success", "disconnect")
      },
      (error) => {
        this.isSaving=false;
        console.log(error);
        this.errorMessage = error

      }
    )
  }
}
