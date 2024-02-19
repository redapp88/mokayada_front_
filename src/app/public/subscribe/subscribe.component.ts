import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {UsersDeleteOfferComponent} from "../../user/users-offers-management/users-delete-offer/users-delete-offer.component";
import {InfoComponent} from "../../shared/info/info.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  formInfo: FormGroup;
  formAuth: FormGroup;
  formContact: FormGroup;
  today: Date = new Date();
  oldestDate = new Date("01/01/1900");
  passwordText = "";
  isLoading = false;
  popUpWith: string = "60%";
  isLinear = true;

  ngOnInit(): void {

    this.formInfo = this._formBuilder.group({
      firstName: ['', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.maxLength(20), this.lettresSeulementValidator]}],
      lastName: ['', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.maxLength(20), this.lettresSeulementValidator]}],
      sex: ['Masculin', Validators.required],
      birthDate: [{
        value: new Date(),
        disabled: true
      }, {validators: [Validators.required, this.dateValidator.bind(this)]}],

    });


    this.formAuth = new FormGroup({
      username: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{4,}$/)]}),
      password: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),
      repassword: new FormControl({
        value: "",
        disabled: false
      }, {validators: [Validators.required, this.confirmationMotDePasseValidator.bind(this)]}),

    });

    this.formContact = this._formBuilder.group({
      phone: ['', {updateOn: 'change', validators: [Validators.required, Validators.pattern(/^0[5-7]\d{8}$/)]}],
      email: ['', {validators: [Validators.required, Validators.email]}]
    });

    this.formAuth.controls["password"].valueChanges.forEach(value => this.passwordText = value);
  }


  constructor(private _formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog,private router:Router) {
  }

  // Fonction de validation personnalisée pour la confirmation du mot de passe
  confirmationMotDePasseValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // console.log(control.parent)
    const motDePasse = this.passwordText
    const confirmationMotDePasse = control.value;

    return motDePasse === confirmationMotDePasse ? null : {'nonCorrespondant': true};
  }


  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateRegex = /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\d{4}$/;
    const date = control.value;

    if (!dateRegex.test(date)) {
      return {'formatInvalide': true};
    }

    const [day, month, year] = date.split('/').map(Number);
    const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day) &&
      month >= 1 && month <= 12 &&
      day >= 1 && day <= new Date(year, month, 0).getDate();

    return isValidDate ? null : {'dateInvalide': true};
  }

  showDate() {
    console.log(this.formInfo.controls["birthDate"].value)
  }

  lettresSeulementValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const nom = control.value;
    const lettresRegex = /^[a-zA-ZÀ-ÿ\- ]+$/;

    if (!lettresRegex.test(nom)) {
      return {'lettresSeulement': true};
    }

    return null; // Retourne null si la validation réussit
  }

  valuechange() {
    console.log(this.passwordText)
  }

  onSubscibe() {

    this.isLoading = true;
    let infoControls = this.formInfo.controls;
    let contactControls = this.formContact.controls;
    let authtControls = this.formAuth.controls;
    this.usersService.addUser(
      infoControls["firstName"].value, infoControls["lastName"].value, infoControls["sex"].value, infoControls["birthDate"].value,
      contactControls["email"].value, contactControls["phone"].value, authtControls["username"].value, authtControls["password"].value
    ).subscribe(
      (res) => {
        const dialogRef = this.dialog.open(InfoComponent, {
          data: {
            title: "Confirmation",
            message: "Inscription reussi, consulter votre adresse Mail pour confirmer votre inscription",
            style: "success"
          },
          width: this.popUpWith,
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(["/login"])
        });
        this.isLoading = false;

      },
      (error) => {
        this.isLoading = false;
        console.log(error)
        const dialogRef = this.dialog.open(InfoComponent, {
          data: {title: "Erreur", message: "Erreur d'incription, " + error.message, style: "error"},
          width: this.popUpWith,
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == "success") {

          }
        });
      }
    )
  }
}
