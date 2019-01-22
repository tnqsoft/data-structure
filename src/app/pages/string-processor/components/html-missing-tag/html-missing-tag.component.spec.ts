import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlMissingTagComponent } from './html-missing-tag.component';

describe('HtmlMissingTagComponent', () => {
  let component: HtmlMissingTagComponent;
  let fixture: ComponentFixture<HtmlMissingTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlMissingTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlMissingTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
