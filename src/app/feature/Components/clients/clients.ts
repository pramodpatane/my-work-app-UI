import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DropdownModel } from '../../../auth/Models/dropdown.model';
import { FilterData } from '../../../core/Models/FilterData';
import { ClientsModel } from '../../Models/clients.model';
import { ClientsService } from '../../Services/clients.service';
import { SwalService } from '../../../global/swal.service';

@Component({
  selector: 'app-clients',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, 
    MatFormFieldModule, MatDatepickerModule, FormsModule,],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})

export class Clients implements OnInit {
  clientForm!: FormGroup;
  IsDefaultView: boolean = true;
  HeaderText: string = "Add Client";
  ButtonText: string = "Insert";
  displayedColumns: string[] = ['actions', 'clientCode', 'name', 'clientType', 'email', 'contactPerson', 'mobile', 'alternateMobile', 'createdDate' ];
  clientsData = new MatTableDataSource<any>([]);
  totalCount: number = 0;
  fromDate!: Date;
  DepartmentsList: DropdownModel[] = [];
  filterdata: FilterData = new FilterData();

  constructor(private formBuilder: FormBuilder, private clientsService: ClientsService, private cdr: ChangeDetectorRef,
    private swalService: SwalService, 
  ) {}

  ngOnInit() {
    this.GetData();
    this.DeclareForm();
  }

  DeclareForm() {
    this.clientForm = this.formBuilder.group({
      recordId: [''],
      name: ['', Validators.required],
      clientCode: ['', Validators.required],
      clientType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.min(10)]],
      alternateMobile: [null, [Validators.required, Validators.min(10)]],
      contactPerson: [null, Validators.required],
      taxId: ["null", Validators.required],
      address: [null, Validators.required],
      category: [null, Validators.required],
      isActive: [true],
      isDeleted: [false]
    });
  }

  ConvertFormToModel() {
    const model = new ClientsModel();
    model.recordId = this.clientForm.value.recordId;
    model.name = this.clientForm.value.name;
    model.clientCode = this.clientForm.value.clientCode;
    model.clientType = this.clientForm.value.clientType;
    model.email = this.clientForm.value.email;
    model.contactPerson = this.clientForm.value.contactPerson;
    model.mobile = this.clientForm.value.mobile;
    model.alternateMobile = this.clientForm.value.alternateMobile;
    model.category = this.clientForm.value.category;
    model.taxId = this.clientForm.value.taxId;
    model.address = this.clientForm.value.address;
    model.isActive = this.clientForm.value.isActive;
    model.isDeleted = this.clientForm.value.isDeleted;
    //console.log(model);
    return model;
  }

  onPageChange(event: PageEvent) {
    this.filterdata.pagesize = event.pageSize;
    this.filterdata.skip = event.pageIndex;
    //this.GetData();
  }

  toggleIsDefaultView() {
    this.IsDefaultView = !this.IsDefaultView;
  }

  OpenForm() {
    this.ClearForm();
    this.toggleIsDefaultView();
    this.HeaderText = "Add Farmer";
    this.ButtonText = "Insert";
  }

  ClearForm() {
    this.DeclareForm();
  }

  public async GetData() {
    try{
      const today = new Date();
      const dateBefore120Days = new Date();
      dateBefore120Days.setDate(today.getDate() - 120);
      this.filterdata.fromDate = dateBefore120Days;
      this.filterdata.toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      
       (await this.clientsService.GetAllData(this.filterdata)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res));
            //console.log(response)
            this.clientsData = response.data;
            this.totalCount = response.totalCount;
            this.cdr.detectChanges();
          },
          error: () => {
            this.swalService.ShowAlert("error", "");
          }
        });
      //} ✅
    }
    catch(err) {
      throw err;
    }
  }

  public async Insert() {
    try {
      let datamodel = this.ConvertFormToModel();

      this.HeaderText = "Add Farmer";
      this.toggleIsDefaultView();
      
       (await this.clientsService.InsertData(datamodel)).subscribe({
          next: (res) => {
            if(res == 1) {
              this.swalService.ShowAlert("success", "Record Inserted Successfully!");
            }
            this.GetData();
          },
          error: () => {
            this.swalService.ShowAlert("error", "");
          }
        });
    }
    catch(err) {
      throw err;
    }
  }

  public async Update() {
    try {
      let datamodel = this.ConvertFormToModel();
      this.HeaderText = "Edit Farmer";
      this.toggleIsDefaultView();
      
       (await this.clientsService.UpdateData(datamodel)).subscribe({
          next: (res) => {            
            if(res == 1) {
              this.swalService.ShowAlert("success", "Record Updated Successfully!");
            }
            this.GetData();
          },
          error: () => {
            this.swalService.ShowAlert("error", "");
          }
        });
    }
    catch(err) {
      throw err;
    }
  }

  public async Edit(recordId: string) {
    try {
      this.HeaderText = "Edit Farmer";
      this.ButtonText= "Update";
      this.toggleIsDefaultView();
      
       (await this.clientsService.GetById(recordId)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res))
            console.log(response)
            this.clientForm.get('recordId')?.setValue(response.recordId);
            this.clientForm.get('name')?.setValue(response.name);
            this.clientForm.get('clientType')?.setValue(response.clientType);
            this.clientForm.get('clientCode')?.setValue(response.clientCode);
            this.clientForm.get('email')?.setValue(response.email);
            this.clientForm.get('contactPerson')?.setValue(response.contactPerson);
            this.clientForm.get('mobile')?.setValue(response.mobile);
            this.clientForm.get('category')?.setValue(response.category);
            this.clientForm.get('alternateMobile')?.setValue(response.alternateMobile);
            this.clientForm.get('address')?.setValue(response.address);
            this.clientForm.get('isActive')?.setValue(response.isActive);
            this.clientForm.get('isDeleted')?.setValue(response.isDeleted);
          },
          error: () => {
            this.swalService.ShowAlert("error", "");
          }
        });
    }
    catch(err){
      throw err;
    }
  }

  public async Delete(recordId: string) {
    try {
      const isConfirmed = await this.swalService.
          confirmDelete('Are you sure to delete?','You will not be able to recover this record.');

      if (isConfirmed) {
        (await this.clientsService.Delete(recordId)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res));
            if(response.isSuccess) {
              this.swalService.ShowAlert("success", response.message);
              this.GetData();
            } else {
              this.swalService.ShowAlert("error", response.message);
            }
          },
          error: () => {
            this.swalService.ShowAlert("error", "");
          }
        });
      }
    }
    catch (err) {
      throw err;
    }
  }
}
