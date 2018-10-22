import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPreliminarComponent } from './resumen-preliminar.component';

describe('ResumenPreliminarComponent', () => {
  let component: ResumenPreliminarComponent;
  let fixture: ComponentFixture<ResumenPreliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenPreliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPreliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
