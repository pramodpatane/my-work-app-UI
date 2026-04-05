import { Component, Input, OnInit } from '@angular/core';
import { UserRolesService } from '../../../core/Services/user.roles.service';
import { DropdownModel } from '../../Models/dropdown.model';
import { SwalService } from '../../../global/swal.service';
import { UserConfiguration, UserModel } from '../../Models/user-model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  userRoles: DropdownModel[] = [];
  userForm!: FormGroup;
  userModel: UserModel = new UserModel();
  HeaderText: string = "Add User";
  @Input() userConfiguration!: UserConfiguration;
  
  constructor(private userRolesService: UserRolesService, private swalservice: SwalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.GetUserRolesDropdown();
    this.DeclareForm();
  }

  DeclareForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [null, [Validators.required, Validators.min(10)]],
      roleId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // isEmailVerified: [null, Validators.required],
      // isActive: [true],
      // isDeleted: [false]
    });
  }

  ConvertFormToModel() {
    const model = new UserModel();
    model.firstName = this.userForm.value.firstName;
    model.lastName = this.userForm.value.lastName;
    model.email = this.userForm.value.email;
    return model;
  }

   toggleView() {
  //   this.userConfiguration.defaultView = !this.userConfiguration.defaultView;
   }

  public async InsertData() {
    try {
      alert("insert button called")
    }
    catch (err) {
      throw err;
    }
  }

  public async GetUserRolesDropdown() {
    try {
      (await this.userRolesService.GetUserRolesDropdown()).subscribe({
          next: (res) => {            
            this.userRoles = JSON.parse(JSON.stringify(res));
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
}
