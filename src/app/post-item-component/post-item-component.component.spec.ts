import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponentComponent } from './post-item-component.component';

describe('PostItemComponentComponent', () => {
  let component: PostItemComponentComponent;
  let fixture: ComponentFixture<PostItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
