import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgItemComponent } from './bg-item.component';

describe('BgItemComponent', () => {
  let component: BgItemComponent;
  let fixture: ComponentFixture<BgItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
