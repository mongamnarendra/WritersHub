import { ComponentFixture, TestBed } from '@angular/core/testing';
import { login.component } from './login.component.ts';

describe('login', () => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ login.component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(login.component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});