import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablefieldsComponent } from './tablefields.component';

describe('TablefieldsComponent', () => {
  let component: TablefieldsComponent;
  let fixture: ComponentFixture<TablefieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablefieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablefieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
