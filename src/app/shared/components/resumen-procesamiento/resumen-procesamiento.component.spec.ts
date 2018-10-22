import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProcesamientoComponent } from './resumen-procesamiento.component';

describe('ResumenProcesamientoComponent', () => {
  let component: ResumenProcesamientoComponent;
  let fixture: ComponentFixture<ResumenProcesamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenProcesamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenProcesamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
