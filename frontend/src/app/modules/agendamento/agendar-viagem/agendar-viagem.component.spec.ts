import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarViagemComponent } from './agendar-viagem.component';

describe('AgendarViagemComponent', () => {
  let component: AgendarViagemComponent;
  let fixture: ComponentFixture<AgendarViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
