import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMotoristaComponent } from './lista-motorista.component';

describe('ListaMotoristaComponent', () => {
  let component: ListaMotoristaComponent;
  let fixture: ComponentFixture<ListaMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMotoristaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
