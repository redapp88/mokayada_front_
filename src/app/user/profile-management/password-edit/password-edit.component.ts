import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {
  form: FormGroup;
  passwordText = "";

  ngOnInit(): void {




    this.form = new FormGroup({
      oldPassword: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),

      password: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),

      repassword: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, this.confirmationMotDePasseValidator.bind(this)]}),

    });


    this.form.controls["password"].valueChanges.forEach(value => this.passwordText = value);
  }


  constructor(private _formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog,private router:Router) {
  }


  confirmationMotDePasseValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control.parent)
    const motDePasse = this.passwordText
    const confirmationMotDePasse = control.value;

    return motDePasse === confirmationMotDePasse ? null : {'nonCorrespondant': true};
  }
}
