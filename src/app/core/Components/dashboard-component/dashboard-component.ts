import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterData } from '../../Models/FilterData';
import { ClientsService } from '../../../feature/Services/clients.service';
import { SwalService } from '../../../global/swal.service';

@Component({
  selector: 'app-dashboard-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  string1: string = "";
  string2: string = "";
  filterdata: FilterData = new FilterData();
  clientsData: any[] = [];
  totalClients: number = 0;
  thisMonthClients: number = 0;

  constructor(private clientsService: ClientsService, private cdr: ChangeDetectorRef,
    private swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.GetData();
  }

  // checkCharacterCount(): boolean {

  //   if (this.string1.length !== this.string2.length) {
  //     return false;
  //   }

  //   const charMap: { [key: string]: number } = {};

  //   // Count chars from first string
  //   for (const char of this.string1) {
  //     charMap[char] = (charMap[char] || 0) + 1;
  //   }

  //   // Decrease count using second string
  //   for (const char of this.string2) {

  //     if (!charMap[char]) {
  //       return false;
  //     }

  //     charMap[char]--;
  //   }

  //   return true;
  // }

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
            this.clientsData = response.data;
            this.totalClients = response.totalCount;
            this.thisMonthClients = response.thisMonthTotal;            ;
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
}
