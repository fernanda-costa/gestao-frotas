import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMotoristaComponent } from './home-motorista.component';

describe('HomeMotoristaComponent', () => {
  let component: HomeMotoristaComponent;
  let fixture: ComponentFixture<HomeMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMotoristaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
