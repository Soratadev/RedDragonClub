import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgListComponent } from './bg-list.component';

describe('BgListComponent', () => {
  let component: BgListComponent;
  let fixture: ComponentFixture<BgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
