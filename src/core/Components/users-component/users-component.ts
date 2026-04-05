import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../global/swal.service';
import { UserService } from '../../Services/user-service';
import { FilterData } from '../../Models/FilterData';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserConfiguration, UserModel } from '../../../auth/Models/user-model';
import { UserRolesService } from '../../Services/user.roles.service';
import { DropdownModel } from '../../../auth/Models/dropdown.model';
import { SignUp } from '../../../auth/Components/sign-up/sign-up';

@Component({
  selector: 'app-users-component',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})

export class UsersComponent implements OnInit, AfterViewInit {
  HeaderText: string = "Add User";
  isLoginView: boolean = true;
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'email', 'phone', 'role' ];
  usersData = new MatTableDataSource<any>([]);
  userRoles: DropdownModel[] = [];
  userForm!: FormGroup;
  userModel: UserModel = new UserModel();
  userConfiguration = new UserConfiguration();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(SignUp) signUp!: SignUp;
  
  constructor(private swalservice: SwalService, private userService: UserService, private cdr: ChangeDetectorRef ) {
    //this.userConfiguration.defaultView = true;
  }

  ngOnInit(): void {
    this.GetData();
  }

  ngAfterViewInit() {
    this.usersData.paginator = this.paginator;
  }

  // toggleView() {
  //   this.userConfiguration.defaultView = !this.userConfiguration.defaultView;
  // }

  openForm(text: string, recordId: string) {
    //this.toggleView();
    this.HeaderText = text;
    if(text == 'Add User' && recordId == '') {
      
    }
    if(text == 'Edit User' && recordId != '') {
      this.Edit(recordId);
    }
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
}