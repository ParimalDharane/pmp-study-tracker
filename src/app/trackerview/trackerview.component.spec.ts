import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerviewComponent } from './trackerview.component';

describe('TrackerviewComponent', () => {
  let component: TrackerviewComponent;
  let fixture: ComponentFixture<TrackerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
