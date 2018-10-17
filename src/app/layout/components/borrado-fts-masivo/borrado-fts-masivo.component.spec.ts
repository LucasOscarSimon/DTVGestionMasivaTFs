import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorradoFtsMasivoComponent } from './borrado-fts-masivo.component';

describe('BorradoFtsMasivoComponent', () => {
  let component: BorradoFtsMasivoComponent;
  let fixture: ComponentFixture<BorradoFtsMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorradoFtsMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorradoFtsMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
