import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarViagemDialogComponent } from './iniciar-viagem-dialog.component';

describe('IniciarViagemDialogComponent', () => {
  let component: IniciarViagemDialogComponent;
  let fixture: ComponentFixture<IniciarViagemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarViagemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarViagemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
