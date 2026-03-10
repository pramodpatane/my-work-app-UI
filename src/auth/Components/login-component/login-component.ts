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
import { EmailService } from '../../Services/email-service';
import { EmailModel, VerifyOtpModel } from '../../Models/email.model';
import { UserModel } from '../../Models/user-model';
import { UserService } from '../../../core/Services/user-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  isLoginView:boolean = true;
  loginModel: LoginModel = new LoginModel();
  userModel: UserModel = new UserModel();
  showPassword: boolean = false;
  isOTPEnabled: boolean = false;
  userRoles: DropdownModel[] = [];
  emailConfiguration: any;
  IsPasswordEnabled: boolean = true;
  OTP: string = "";
  OTPSendMessage: string = "";

  constructor(private authService: AuthService, private router: Router, private userRolesService: UserRolesService,
    private emailService: EmailService, private swalservice: SwalService, private swalService: SwalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoginView = true;
    this.isOTPEnabled = false;
    this.IsPasswordEnabled = true;
    this.GetUserRolesDropdown();
    this.GetEmailConfiguration();
  }

  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  IsChecked(event: Event, RButton: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(RButton == 'IsPassword') {
      this.IsPasswordEnabled = true;
      this.isOTPEnabled = false;
    }
    else if(RButton == 'IsOtp') {
      this.isOTPEnabled = true;
      this.IsPasswordEnabled = false;
    }
  }

  public onLogin() {
    try{
      let response = "";
      if(!this.loginModel.useremail) {
        this.swalservice.ShowAlert("error", "Useremail is required");
        return;
      }
      if(!this.loginModel.password && !this.loginModel.isOtpVerified) {
        this.swalservice.ShowAlert("error", "password is required");
        return;
      }
      
      this.authService.login(this.loginModel).subscribe({
        next: (res) => {
          response = JSON.stringify(res);
          if(JSON.parse(response).isSuccess == true) {
            localStorage.setItem("UserData", response);
            localStorage.setItem("IsUserLoggedIn", "True");

            this.router.navigate(['/core']);   // navigate to navbar
          }
          else {
            this.swalService.ShowAlert("error", JSON.parse(response).message);
          }
        },
        error: (err) => {
          this.swalService.ShowAlert("error", "Invalid email or password!");
          // to clear fields
          this.ClearFormFields();
        }
      });
      
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

  public async GetEmailConfiguration() {
    try {
      (await this.emailService.GetEmailConfiguration("UOTP")).subscribe({
          next: (res: any) => {
            if(res.isSuccess) {
              this.emailConfiguration = JSON.parse(res.message);
            }         
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

  public async SendOTP() {
    try {
       // Validate email configuration
    if (!this.emailConfiguration) {
      this.swalservice.ShowAlert("error", "Email configuration not loaded");
      return;
    }

    if (!this.emailConfiguration.FromEmail) {
      this.swalservice.ShowAlert("error", "FromEmail is required");
      return;
    }

    if (!this.emailConfiguration.Subject) {
      this.swalservice.ShowAlert("error", "Subject is required");
      return;
    }

    if (!this.emailConfiguration.Body) {
      this.swalservice.ShowAlert("error", "Body is required");
      return;
    }

    // Validate user email
    if (!this.loginModel || !this.loginModel.useremail) {
      this.swalservice.ShowAlert("error", "User email is required");
      return;
    }

      let emailModel: EmailModel = new EmailModel();
      emailModel.fromEmail = this.emailConfiguration.FromEmail;
      emailModel.toEmail = this.loginModel.useremail;
      emailModel.subject = this.emailConfiguration.Subject;
      emailModel.body = this.emailConfiguration.Body;
      (await this.emailService.SendOTP(emailModel)).subscribe({
          next: (res) => {                       
            let response = JSON.parse(JSON.stringify(res));
            if(response.isSuccess) {
              this.OTPSendMessage = response.message;
              console.log(this.OTPSendMessage)
            }
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

  public async VerifyOTP() {
    try {
      let otpmodel: VerifyOtpModel = new VerifyOtpModel();
      let response = "";

      otpmodel.Email = this.loginModel.useremail;
      otpmodel.OTP = this.OTP;
      (await this.emailService.VerifyOTP(otpmodel)).subscribe({
          next: (res) => {
            response = JSON.stringify(res);
            if(response == 'true') {
              this.loginModel.isOtpVerified = true;
              this.onLogin();
            } else {
              this.swalService.ShowAlert("error", "Invalid or expired OTP");
            }            
          },
          error: () => {
            this.swalservice.ShowAlert("error", "Invalid email or OTP!");
            // to clear fields
            this.ClearFormFields();
          }
        });
    }
    catch(error) {
      throw error;
    }
  }

  public async InsertUser() {
    try {
      let response = "";
      this.userModel.roleId = Number(this.userModel.roleId);
      this.userService.Insert(this.userModel).subscribe({
        next: (res) => {
          response = JSON.stringify(res);
          if(JSON.parse(response).isSuccess == true) {
            this.swalService.ShowAlert("success", JSON.parse(response).message);
          }
          else {
            this.swalService.ShowAlert("error", JSON.parse(response).message);
          }
        },
        error: (err) => {
          this.swalService.ShowAlert("error", "User not created!");          
        }
      });
    }
    catch(error) {
      throw error;
    }
  }

  ClearFormFields() {
    this.loginModel.useremail = "";
    this.loginModel.password = "";
  }
}
