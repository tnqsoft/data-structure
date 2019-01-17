import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackTableComponent } from './stack-table.component';

describe('StackTableComponent', () => {
  let component: StackTableComponent;
  let fixture: ComponentFixture<StackTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
