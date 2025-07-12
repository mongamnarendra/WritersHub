import { ComponentFixture, TestBed } from '@angular/core/testing';
import { navbar.component } from './navbar.component.ts';

describe('navbar', () => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ navbar.component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(navbar.component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});