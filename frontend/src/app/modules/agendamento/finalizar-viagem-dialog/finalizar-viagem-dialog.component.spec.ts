import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarViagemDialogComponent } from './finalizar-viagem-dialog.component';

describe('FinalizarViagemDialogComponent', () => {
  let component: FinalizarViagemDialogComponent;
  let fixture: ComponentFixture<FinalizarViagemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarViagemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarViagemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
