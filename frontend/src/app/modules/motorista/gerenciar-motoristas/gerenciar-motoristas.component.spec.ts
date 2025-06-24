import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMotoristasComponent } from './gerenciar-motoristas.component';

describe('GerenciarMotoristasComponent', () => {
  let component: GerenciarMotoristasComponent;
  let fixture: ComponentFixture<GerenciarMotoristasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarMotoristasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarMotoristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
