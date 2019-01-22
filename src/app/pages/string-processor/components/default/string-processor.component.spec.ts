import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringProcessorComponent } from './string-processor.component';

describe('StringProcessorComponent', () => {
  let component: StringProcessorComponent;
  let fixture: ComponentFixture<StringProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
