import { Component, Input, OnInit } from '@angular/core';
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
  @Input() userConfiguration!: UserConfiguration;
  
  userForm!: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  previewImage: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  OnSubmit() {
    console.log("Insert method called"); 
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value.firstName);
  }
}
