import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../global/swal.service';
import { UserService } from '../../Services/user-service';
import { FilterData } from '../../Models/FilterData';

@Component({
  selector: 'app-users-component',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})

export class UsersComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'email', 'phone', 'role' ];
  usersData = new MatTableDataSource<any>([]);
  userRoles: [] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private swalservice: SwalService, private userService: UserService, private cdr: ChangeDetectorRef,
    
  ) {
    
  }

  ngOnInit(): void {
    this.GetData();
  }

  ngAfterViewInit() {
    this.usersData.paginator = this.paginator;
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
            console.log(this.usersData);
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

  public Edit(id: number) {
    console.log('Edit', id);
  }

  public Delete(id: number) {
    console.log('Delete', id);
  }
}