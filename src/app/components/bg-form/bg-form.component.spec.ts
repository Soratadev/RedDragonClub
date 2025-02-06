import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgFormComponent } from './bg-form.component';

describe('BgFormComponent', () => {
  let component: BgFormComponent;
  let fixture: ComponentFixture<BgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
