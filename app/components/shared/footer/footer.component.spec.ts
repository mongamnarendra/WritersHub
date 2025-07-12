import { ComponentFixture, TestBed } from '@angular/core/testing';
import { footer.component } from './footer.component.ts';

describe('footer', () => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ footer.component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(footer.component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});