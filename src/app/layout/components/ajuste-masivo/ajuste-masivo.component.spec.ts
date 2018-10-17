import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteMasivoComponent } from './ajuste-masivo.component';

describe('AjusteMasivoComponent', () => {
  let component: AjusteMasivoComponent;
  let fixture: ComponentFixture<AjusteMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjusteMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
