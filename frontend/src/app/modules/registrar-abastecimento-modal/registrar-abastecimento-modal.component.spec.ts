import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAbastecimentoModalComponent } from './registrar-abastecimento-modal.component';

describe('RegistrarAbastecimentoModalComponentComponent', () => {
  let component: RegistrarAbastecimentoModalComponent;
  let fixture: ComponentFixture<RegistrarAbastecimentoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarAbastecimentoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAbastecimentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
