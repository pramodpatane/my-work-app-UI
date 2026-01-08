import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SwalService } from '../../../global/swal.service';
import { EmployeeService } from '../../Services/employee-service';
import { FilterData } from '../../../core/Models/FilterData';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../../Models/employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DepartmentService } from '../../../core/Services/departments.service';
import { DropdownModel } from '../../../auth/Models/dropdown.model';

@Component({
  selector: 'app-employees-component',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, 
    MatFormFieldModule, MatDatepickerModule, FormsModule],
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.css',
})
export class EmployeesComponent implements OnInit {
  employeeForm!: FormGroup;
  IsDefaultView: boolean = true;
  HeaderText: string = "Add Employee";
  ButtonText: string = "Insert";
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'email', 'salary', 'department', 'createdDate' ];
  employeesData = new MatTableDataSource<any>([]);
  fromDate!: Date;
  DepartmentsList: DropdownModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  firstDay: any;
  
  constructor(private swalservice: SwalService, private employeeService: EmployeeService, private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder, private departmentService: DepartmentService
  ) {
    this.IsDefaultView = true;
  }

  ngOnInit(): void {
    this.GetData();
    this.DeclareForm();  
    this.GetDepartmentDropdown();
  }

  ngAfterViewInit() {
    this.employeesData.paginator = this.paginator;
  }

  OpenAddEmployeeForm() {
    this.ClearForm();
    this.toggleIsDefaultVies();
    this.HeaderText = "Add Employee";
    this.ButtonText = "Insert";
  }

  toggleIsDefaultVies() {
    this.IsDefaultView = !this.IsDefaultView;
  }

  DeclareForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [null, [Validators.required, Validators.min(0)]],
      departmentId: [null, Validators.required],
      isActive: [true],
      isDeleted: [false]
    });
  }

  ConvertFormToModel() {
    const model = new EmployeeModel();
    model.firstName = this.employeeForm.value.firstName;
    model.lastName = this.employeeForm.value.lastName;
    model.email = this.employeeForm.value.email;
    model.salary = this.employeeForm.value.salary;
    model.departmentId = this.employeeForm.value.departmentId;
    console.log(model);
    return model;
  }
  
  async GetData() {
    try{
      let filterdata: FilterData = new FilterData();
      filterdata.fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      filterdata.toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      filterdata.pagesize = 10;
      filterdata.skip = 0;
      filterdata.filterString = "";
      filterdata.sortString = "";
      
      //if(this.loginModel.useremail != "" && this.loginModel.password != "") {
       (await this.employeeService.GetAllData(filterdata)).subscribe({
          next: (res) => {            
            this.employeesData = JSON.parse(JSON.stringify(res));
            //console.log(this.employeesData)
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

  // insert form data method
  public async Insert() {
    try {
      let datamodel = this.ConvertFormToModel();
      this.HeaderText = "Add Employee";
      this.toggleIsDefaultVies();
      
       (await this.employeeService.InsertData(datamodel)).subscribe({
          next: (res) => {            
            
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
    }
    catch(err) {
      throw err;
    }
  }

  public async Edit(id: number) {
    try {
      this.HeaderText = "Edit Employee";
      this.ButtonText= "Update";
      this.toggleIsDefaultVies();
      
       (await this.employeeService.GetById(id)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res))
            console.log(response)
            this.employeeForm.get('firstName')?.setValue(response.firstName);
            this.employeeForm.get('lastName')?.setValue(response.lastName);
            this.employeeForm.get('email')?.setValue(response.email);
            this.employeeForm.get('salary')?.setValue(response.salary);
            this.employeeForm.get('departmentId')?.setValue(response.departmentId);
            this.employeeForm.get('isActive')?.setValue(response.isActive);
            this.employeeForm.get('isDeleted')?.setValue(response.isDeleted);
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

  public async Delete(id: number) {
    console.log('Delete', id);
    try {
       
    }
    catch (err) {
      throw err;
    }
  }

  ClearForm() {
    this.DeclareForm();
  }

  public async GetDepartmentDropdown() {
    try {
      (await this.departmentService.GetDepartmentDropdown()).subscribe({
          next: (res) => {            
            this.DepartmentsList = JSON.parse(JSON.stringify(res));
            console.log("Departments" + this.DepartmentsList)
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
