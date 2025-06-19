import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarManutencaoModalComponent } from './registrar-manutencao-modal.component';

describe('RegistrarManutencaoModalComponent', () => {
  let component: RegistrarManutencaoModalComponent;
  let fixture: ComponentFixture<RegistrarManutencaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarManutencaoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarManutencaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
