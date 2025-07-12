import { ComponentFixture, TestBed } from '@angular/core/testing';
import { register.component } from './register.component.ts';

describe('register', () => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ register.component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(register.component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});