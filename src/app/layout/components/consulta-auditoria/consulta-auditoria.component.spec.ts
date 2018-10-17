import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAuditoriaComponent } from './consulta-auditoria.component';

describe('ConsultaAuditoriaComponent', () => {
  let component: ConsultaAuditoriaComponent;
  let fixture: ComponentFixture<ConsultaAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
