import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  totalCount: number = 0;
  fromDate!: Date;
  DepartmentsList: DropdownModel[] = [];
  filterdata: FilterData = new FilterData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  firstDay: any;
  
  constructor(private swalservice: SwalService, private employeeService: EmployeeService, private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder, private departmentService: DepartmentService
  ) {
    this.IsDefaultView = true;
  }

  ngOnInit() {
    this.GetData();
    this.DeclareForm();  
    this.GetDepartmentDropdown();
  }

  ngAfterViewInit() {
    this.employeesData.paginator = this.paginator;
  }

  OpenAddEmployeeForm() {
    this.ClearForm();
    this.toggleIsDefaultView();
    this.HeaderText = "Add Employee";
    this.ButtonText = "Insert";
  }

  toggleIsDefaultView() {
    this.IsDefaultView = !this.IsDefaultView;
  }

  DeclareForm() {
    this.employeeForm = this.formBuilder.group({
      recordId: [''],
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
    model.recordId = this.employeeForm.value.recordId;
    model.firstName = this.employeeForm.value.firstName;
    model.lastName = this.employeeForm.value.lastName;
    model.email = this.employeeForm.value.email;
    model.salary = this.employeeForm.value.salary;
    model.departmentId = this.employeeForm.value.departmentId;
    model.isActive = this.employeeForm.value.isActive;
    model.isDeleted = this.employeeForm.value.isDeleted;

    model.departmentId = Number(model.departmentId);
    //console.log(model);
    return model;
  }
  
  onPageChange(event: PageEvent) {
    this.filterdata.pagesize = event.pageSize;
    this.filterdata.skip = event.pageIndex;
    this.GetData();
  }

  async GetData() {
    try{
      const today = new Date();
      const dateBefore120Days = new Date();
      dateBefore120Days.setDate(today.getDate() - 120);
      this.filterdata.fromDate = dateBefore120Days;
      this.filterdata.toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      
       (await this.employeeService.GetAllData(this.filterdata)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res));
            //console.log(response)
            this.employeesData = response.data;
            this.totalCount = response.totalCount;
            this.cdr.detectChanges();
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
      //} ✅
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
      this.toggleIsDefaultView();
      
       (await this.employeeService.InsertData(datamodel)).subscribe({
          next: (res) => {
            if(res == 1) {
              this.swalservice.ShowAlert("success", "Record Inserted Successfully!");
            }
            this.GetData();
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

  // update form data method
  public async Update() {
    try {
      let datamodel = this.ConvertFormToModel();
      this.HeaderText = "Edit Employee";
      this.toggleIsDefaultView();
      
       (await this.employeeService.UpdateData(datamodel)).subscribe({
          next: (res) => {            
            if(res == 1) {
              this.swalservice.ShowAlert("success", "Record Updated Successfully!");
            }
            this.GetData();
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

  public async Edit(recordId: string) {
    try {
      this.HeaderText = "Edit Employee";
      this.ButtonText= "Update";
      this.toggleIsDefaultView();
      
       (await this.employeeService.GetById(recordId)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res))
            //console.log(response)
            this.employeeForm.get('recordId')?.setValue(response.recordId);
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

  public async Delete(recordId: string) {
    try {
      const isConfirmed = confirm("Are you sure you want to delete this record?");

      if (isConfirmed) {
        (await this.employeeService.Delete(recordId)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res));
            if(response.isSuccess) {
              this.swalservice.ShowAlert("success", response.message);
              this.GetData();
            } else {
              this.swalservice.ShowAlert("error", response.message);
            }
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
      }
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
            //console.log("Departments" + this.DepartmentsList)
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
