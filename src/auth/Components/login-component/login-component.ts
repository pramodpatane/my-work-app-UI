import { Component } from '@angular/core';
import { LoginModel } from '../../Models/login-model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRolesService } from '../../../core/Services/user.roles.service';
import { SwalService } from '../../../global/swal.service';
import { DropdownModel } from '../../Models/dropdown.model';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  isLoginView:boolean = true;
  loginModel: LoginModel = new LoginModel();
  showPassword: boolean = false;
  userRoles: DropdownModel[] = [];

  constructor(private authService: AuthService, private router: Router, private userRolesService: UserRolesService,
    private swalservice: SwalService,
  ) {}

  ngOnInit() {
    this.isLoginView = true;
    this.GetUserRolesDropdown();
  }

  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    try{
      let response = "";
      if(this.loginModel.useremail != "" && this.loginModel.password != "") {
        this.authService.login(this.loginModel).subscribe({
          next: (res) => {
            response = JSON.stringify(res);
            if(JSON.parse(response).isSuccess == true) {
              localStorage.setItem("UserData", response);
              localStorage.setItem("IsUserLoggedIn", "True");

              this.router.navigate(['/core']);   // navigate to navbar
            }
            else {
              this.ShowAlert("error", JSON.parse(response).message);
            }
          },
          error: (err) => {
            this.ShowAlert("error", "Invalid email or password!");
            // to clear fields
            this.ClearFormFields();
          }
        });
      }
    }
    catch (error) {
      throw error;
    }
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
  onSignup () {

  }

  // method to show alert popup
  ShowAlert(alerttext: string, message: string) {
    const key = alerttext.toLowerCase();

    let icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info';

    if (key.includes('success')) icon = 'success';
    else if (key.includes('error') || key.includes('failed')) icon = 'error';
    else if (key.includes('warning') || key.includes('alert')) icon = 'warning';
    else if (key.includes('info')) icon = 'info';
    else if (key.includes('confirm')) icon = 'question';

    Swal.fire({
      title: alerttext,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

  public async GetUserRolesDropdown() {
    try {
      (await this.userRolesService.GetUserRolesDropdown()).subscribe({
          next: (res) => {            
            this.userRoles = JSON.parse(JSON.stringify(res));
            //console.log("UserRolesList", this.userRoles);
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
    }
    catch (err) {
      throw err;
    }
  }

  ClearFormFields() {
    this.loginModel.useremail = "";
    this.loginModel.password = "";
  }
}
