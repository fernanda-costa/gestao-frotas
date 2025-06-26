import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarOcorrenciaModalComponent } from './registrar-ocorrencia-modal.component';

describe('RegistrarOcorrenciaModalComponent', () => {
  let component: RegistrarOcorrenciaModalComponent;
  let fixture: ComponentFixture<RegistrarOcorrenciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarOcorrenciaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarOcorrenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
