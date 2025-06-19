import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAgendamentoDialogComponent } from './detalhes-agendamento-dialog.component';

describe('DetalhesAgendamentoDialogComponent', () => {
  let component: DetalhesAgendamentoDialogComponent;
  let fixture: ComponentFixture<DetalhesAgendamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesAgendamentoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesAgendamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
