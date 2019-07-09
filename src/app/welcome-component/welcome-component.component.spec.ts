import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponentComponent } from './welcome-component.component';

describe('DashboardComponentComponent', () => {
  let component: WelcomeComponentComponent;
  let fixture: ComponentFixture<WelcomeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
