import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../models/AppUser.model";
import {UsersService} from "../../services/users.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {InfoComponent} from "../../shared/info/info.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {

  loadedUser: AppUser;

  formInfo: FormGroup;
  formAuth: FormGroup;
  formContact: FormGroup;
  today: Date = new Date();
  oldestDate = new Date("01/01/1900");
  passwordText = "";
  isLoading = false;
  isSaving= false;
  popUpWith: string = "60%";
  isLinear = false;
  errorMessage: string;


  constructor(private _formBuilder: FormBuilder, private usersService: UsersService, private dialog: MatDialog, private router: Router, private authService: AuthService,private sharedService:SharedService) {
  }

  ngOnInit(): void {
    this.formInfo = this._formBuilder.group({
      username: new FormControl({
        value: this.loadedUser?.username,
        disabled: true
      }),
      firstName: [{value: "", disabled: this.isSaving}, {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.maxLength(20), this.lettresSeulementValidator]}],
      lastName: [{value: "", disabled: this.isSaving}, {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.maxLength(20), this.lettresSeulementValidator]}],
      sex: [{value: "", disabled: this.isSaving}, Validators.required],
      birthDate: [{value: "", disabled: this.isSaving}, {validators: [Validators.required, this.dateValidator.bind(this)]}],

    });


    this.formContact = this._formBuilder.group({
      phone: [{value: "", disabled: this.isSaving}, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern(/^0[5-7]\d{8}$/)]
      }],
      email: [{value: "", disabled: this.isSaving}, {validators: [Validators.required, Validators.email]}]
    });


    this.isLoading = true;


    this.loadUser(this.authService.curentUser.username).subscribe(
      (resData: any) => {
        this.isLoading = false;
        this.loadedUser = resData;
        this.fillCases(this.loadedUser);

      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    )
  }

  fillCases(user: AppUser) {
    let infoControls = this.formInfo.controls;
    let contactControls = this.formContact.controls;
    infoControls["username"].setValue(user.username);
    infoControls["firstName"].setValue(user.firstName);
    infoControls["lastName"].setValue(user.lastName);
    infoControls["sex"].setValue(user.sex);
    infoControls["birthDate"].setValue(user.birthDate);

    contactControls["email"].setValue(user.email);
    contactControls["phone"].setValue(user.phone);

  }

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


  lettresSeulementValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const nom = control.value;
    const lettresRegex = /^[a-zA-ZÀ-ÿ\- ]+$/;

    if (!lettresRegex.test(nom)) {
      return {'lettresSeulement': true};
    }

    return null; // Retourne null si la validation réussit
  }


  onUpdate() {

    this.isSaving = true;
    let infoControls = this.formInfo.controls;
    let contactControls = this.formContact.controls;
   // console.log(infoControls)
    this.usersService.updateUser(
      infoControls["firstName"].value, infoControls["lastName"].value, infoControls["sex"].value, infoControls["birthDate"].value,
      contactControls["email"].value, contactControls["phone"].value, infoControls["username"].value
    ).subscribe(
      (res) => {
        this.isSaving = false;
        this.sharedService.openSnackBar("Profile mis à jour", "")
      },
      (error) => {
        this.isSaving = false;
        this.errorMessage = error;
        this.sharedService.openSnackBar(this.errorMessage, "")
      }
    )


  }

  loadUser(username: string) {
    return this.usersService.getUser(username);
  }

}
