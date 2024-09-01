import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHomeComponent } from './seek-home.component';

describe('SeekHomeComponent', () => {
  let component: SeekHomeComponent;
  let fixture: ComponentFixture<SeekHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeekHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
