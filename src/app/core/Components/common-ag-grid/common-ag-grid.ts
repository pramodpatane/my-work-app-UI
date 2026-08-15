import { Component, effect, EventEmitter, input, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridConfigurationModel } from '../../Models/grid-configuration.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-ag-grid',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './common-ag-grid.html',
  styleUrl: './common-ag-grid.css',
})
export class CommonAgGrid {
  totalCount: number = 0;
  @Input() gridConfiguration = new GridConfigurationModel();
  recordCount = input<number>(0);
  @Output() gridEvent = new EventEmitter<any>();

  constructor() {
    effect(() => {
      this.totalCount = this.recordCount();
    });
  }

  totalPages(): number {
    return Math.ceil(
      this.totalCount / this.gridConfiguration.gridFilter.pagesize
    );
  }

  goToFirstPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber === 1) {
      return;
    }

    this.gridConfiguration.gridFilter.pageNumber = 1;
    this.gridConfiguration.gridFilter.skip = 0;
    this.emitPageChange();
  }

  goToPreviousPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber <= 1) {
      return;
    }

    this.gridConfiguration.gridFilter.pageNumber--;
    this.gridConfiguration.gridFilter.skip = (this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize;
    this.emitPageChange();
  }

  goToNextPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber >= this.totalPages()) {
      return;
    }
    this.gridConfiguration.gridFilter.pageNumber++;
    this.gridConfiguration.gridFilter.skip = (this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize;

    this.emitPageChange();
  }

  goToLastPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber === this.totalPages()) {
      return;
    }
    this.gridConfiguration.gridFilter.pageNumber = this.totalPages();
    this.gridConfiguration.gridFilter.skip = (this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize;

    this.emitPageChange();
  }

  get startRecord(): number {
    if (this.recordCount() === 0) {
      return 0;
    }

    return ((this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize) + 1;
  }

  get endRecord(): number {
    return Math.min(
      this.gridConfiguration.gridFilter.pageNumber * this.gridConfiguration.gridFilter.pagesize,
      this.recordCount()
    );
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.gridConfiguration.gridFilter.pagesize = Number(select.value);
    // Usually go back to page 1
    this.gridConfiguration.gridFilter.pageNumber = 1;

    this.emitPageChange();
  }

  nextPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber < this.totalPages()) {
      this.gridConfiguration.gridFilter.pageNumber++;
      this.gridConfiguration.gridFilter.skip = (this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize;
      this.gridEvent.emit(this.gridConfiguration.gridFilter);
    }
  }

  previousPage(): void {
    if (this.gridConfiguration.gridFilter.pageNumber > 1) {
      this.gridConfiguration.gridFilter.pageNumber--;
      this.gridConfiguration.gridFilter.skip = (this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize;
      this.gridEvent.emit(this.gridConfiguration.gridFilter);
    }
  }

  get currentStart(): number {
    return ((this.gridConfiguration.gridFilter.pageNumber - 1) * this.gridConfiguration.gridFilter.pagesize) + 1;
  }

  get currentEnd(): number {
    return Math.min(
      this.gridConfiguration.gridFilter.pageNumber * this.gridConfiguration.gridFilter.pagesize,
      this.totalCount
    );
  }

  emitPageChange(): void {
    this.gridEvent.emit(this.gridConfiguration.gridFilter);
  }
}
