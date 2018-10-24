import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutogridComponent } from './autogrid.component';

describe('AutogridComponent', () => {
  let component: AutogridComponent;
  let fixture: ComponentFixture<AutogridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutogridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
