import { Component, OnInit } from '@angular/core';
import { GridConfigurationModel } from '../../../core/Models/grid-configuration.model';
import { CommonAgGrid } from '../../../core/Components/common-ag-grid/common-ag-grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [CommonAgGrid, CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection implements OnInit {
  IsDefaultView: boolean = true;
  gridConfiguration: GridConfigurationModel = new GridConfigurationModel();
  totalCount: number = 0;

  constructor() { 
    this.gridConfiguration.gridColumns = [
      { headerName: 'Action', width: 110, pinned: 'left', sortable: false, filter: false, resizable: false, 
        cellRenderer: (params: any) => { return ` <div class="d-flex align-items-center justify-content-center gap-2 h-100"> 
          <button type="button" class="btn btn-sm btn-outline-primary edit-btn" title="Edit" data-action="edit"> <i class="bi bi-pencil"></i> </button> 
          <button type="button" class="btn btn-sm btn-outline-danger delete-btn" title="Delete" data-action="delete"> <i class="bi bi-trash"></i> </button> </div> `; }, 
        onCellClicked: (params: any) => { const target = params.event?.target as HTMLElement; 
          const button = target.closest('button'); if (!button) { return; } 
          const action = button.getAttribute('data-action'); 
          if (action === 'edit') { this.Edit(params.data.recordId); } 
          if (action === 'delete') { this.Delete(params.data.recordId); } } }, 
      { field: 'firstName', width: 100, headerName: 'First Name', flex: 1, sortable: true, filter: true, resizable: true },
      { field: 'lastName', width: 100, headerName: 'Last Name', flex: 1, sortable: true, filter: true, resizable: true },
      { field: 'email', width: 300, headerName: 'Email', flex: 1, sortable: true, filter: true, resizable: true },
      { field: 'salary', width: 100, headerName: 'Salary', flex: 1, sortable: true, filter: true, resizable: true },
      { field: 'department', width: 100, headerName: 'Department', flex: 1, sortable: true, filter: true, resizable: true },
      { field: 'createdDate', width: 150, headerName: 'Created Date', flex: 1, sortable: true, filter: true, resizable: true }
    ];
    this.gridConfiguration.gridTitle = 'Collection Master';
  }

  ngOnInit() {
    this.GetData();
  }

  onGridEvent(gridFilter: any): void {
    this.gridConfiguration.gridFilter = gridFilter;
    this.GetData();
  }

  public async GetData() {
    throw new Error('Method not implemented.');
  }

  Delete(recordId: any) {
    throw new Error('Method not implemented.');
  }

  Edit(recordId: any) {
    throw new Error('Method not implemented.');
  }

  onSearch(event: Event): void {
    throw new Error('Method not implemented.');
  }

  OpenForm() {
    throw new Error('Method not implemented.');
  }
}
