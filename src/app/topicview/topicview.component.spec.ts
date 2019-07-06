import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicviewComponent } from './topicview.component';

describe('TopicviewComponent', () => {
  let component: TopicviewComponent;
  let fixture: ComponentFixture<TopicviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
