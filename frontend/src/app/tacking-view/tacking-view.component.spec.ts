import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TackingViewComponent } from './tacking-view.component';

describe('TackingViewComponent', () => {
  let component: TackingViewComponent;
  let fixture: ComponentFixture<TackingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TackingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TackingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
