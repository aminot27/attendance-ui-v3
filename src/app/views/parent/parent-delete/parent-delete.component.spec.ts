import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDeleteComponent } from './parent-delete.component';

describe('ParentDeleteComponent', () => {
  let component: ParentDeleteComponent;
  let fixture: ComponentFixture<ParentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
