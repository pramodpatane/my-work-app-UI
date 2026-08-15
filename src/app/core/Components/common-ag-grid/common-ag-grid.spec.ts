import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAgGrid } from './common-ag-grid';

describe('CommonAgGrid', () => {
  let component: CommonAgGrid;
  let fixture: ComponentFixture<CommonAgGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonAgGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonAgGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
