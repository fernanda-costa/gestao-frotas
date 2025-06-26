import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaListComponent } from './ocorrencia-list.component';

describe('OcorrenciaListComponent', () => {
  let component: OcorrenciaListComponent;
  let fixture: ComponentFixture<OcorrenciaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcorrenciaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcorrenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
