import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasswordResetComponent} from "../public/password-reset/password-reset.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = ""
  hide = true;
  form: FormGroup;
  isLoading: boolean=false;

  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,private _snackBar: MatSnackBar) {
  }



  ngOnInit() {

    this.form = new FormGroup({
      username: new FormControl({value:'',disabled:this.isLoading}, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(4)]
      }),
      password: new FormControl({value:'',disabled:this.isLoading}, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(4)]
      }),



    })
    if (this.authService.curentUser){

      this.roleRedirecte();
    }

    else {

      this.authService.autoLogin().subscribe(
        (resData) => {
          if (resData) {
            this.roleRedirecte();
          }
        }
      )
    }
  }
  public onLogin(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      console.log("login")
      this.login(this.form.value['username'],this.form.value['password'])
    }
  }

  private login(username: string, password: string) {

    this.isLoading=true;
    this.authService.login(username, password).subscribe(
      () => {
      },
      (error) => {
        this.isLoading=false;
        this.errorMessage = error.error;
      },
      () => {
        this.isLoading=false;
        this._snackBar.open("connexion réussie", "",{
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.roleRedirecte();

      })
  }



  private authCodeToError(message: string) {
    if (message === 'Unauthorized')
      return "Unauthorized"

    else {
      return 'Auth_error'
    }

  }

  private roleRedirecte() {
    if (this.authService.isUser())
      this.router.navigate(['public/home']);
    else if (this.authService.isManager())
      this.router.navigate(['adminArea']);
  }

  loginValid() {
    return (this.form.controls.username.valid && this.form.controls.password.valid);
  }



  onResetPassword() {

    const dialogRef = this.dialog.open(PasswordResetComponent, {
      data: {email:this.form.controls["username"].value},
      width: '60%',
    })
  }
}
