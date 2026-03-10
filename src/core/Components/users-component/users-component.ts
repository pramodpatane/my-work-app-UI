import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../global/swal.service';
import { UserService } from '../../Services/user-service';
import { FilterData } from '../../Models/FilterData';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../auth/Models/user-model';
import { UserRolesService } from '../../Services/user.roles.service';
import { DropdownModel } from '../../../auth/Models/dropdown.model';

@Component({
  selector: 'app-users-component',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})

export class UsersComponent implements OnInit, AfterViewInit {
  HeaderText: string = "Add User";
  DefaultView: boolean = true;
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'email', 'phone', 'role' ];
  usersData = new MatTableDataSource<any>([]);
  userRoles: DropdownModel[] = [];
  userForm!: FormGroup;
  userModel: UserModel = new UserModel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private swalservice: SwalService, private userService: UserService, private cdr: ChangeDetectorRef,
    private userRolesService: UserRolesService, private formBuilder: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.DeclareForm();
    this.GetData();
    this.GetUserRolesDropdown();
  }

  ngAfterViewInit() {
    this.usersData.paginator = this.paginator;
  }

  toggleView() {
    this.DefaultView = !this.DefaultView;
  }

  openForm(text: string, recordId: string) {
    this.toggleView();
    this.HeaderText = text;
    if(text == 'Add User' && recordId == '') {
      // clear form
    }
    if(text == 'Edit User' && recordId != '') {
      this.Edit(recordId);
    }
  }

  DeclareForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.min(10)]],
      roleId: [null, Validators.required],
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
  
  public async GetData() {
    try{
      let filterdata: FilterData = new FilterData();
      filterdata.fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      filterdata.toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      filterdata.pagesize = 10;
      filterdata.skip = 0;
      filterdata.filterString = "";
      filterdata.sortString = "";
      
      //if(this.loginModel.useremail != "" && this.loginModel.password != "") {
        this.userService.GetUserData(filterdata).subscribe({
          next: (res) => {            
            this.usersData = JSON.parse(JSON.stringify(res));
            //console.log(this.usersData);
            this.cdr.detectChanges();
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
      //}
      // this.userService.GetUserData({}).subscribe((res: any[] | any) => {
      //   // ✅ Assign ONLY to .data
      //   this.usersData.data = res;
      // });
    }
    catch(err) {
      throw err;
    }
  }

  public async InsertData() {
    try {

    }
    catch (err) {
      throw err;
    }
  }

  public async Edit(id: string) {
    try{
      (await this.userService.GetById(id)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res))
            //console.log(response)
            this.userForm.get('firstName')?.setValue(response.firstName);
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
    }
    catch(err){
      throw err;
    }
  }

  public Delete(id: number) {
    console.log('Delete', id);
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