import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // necessário para datepicker funcionar com native date
import { MatIconModule } from '@angular/material/icon'; // se quiser ícones
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';
import { RegistrarManutencaoModalComponent } from '../../registrar-manutencao-modal/registrar-manutencao-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrarAbastecimentoModalComponent } from '../../registrar-abastecimento-modal/registrar-abastecimento-modal.component';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {
  filtroForm: FormGroup;

  agendamentos: Agendamento[] = [];
  agendamentosFiltrados: Agendamento[] = [];
  motoristas: Motorista[] = [];

  constructor(
    private fb: FormBuilder,
    private agendamentosService: AgendamentoService,
    private motoristaService: MotoristaService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.filtroForm = this.fb.group({
      motoristaId: [''],
      status: [''],
      dataInicio: [''],
      dataFim: ['']
    });

    this.agendamentosService.obterTodosAgendamentos().subscribe(result => {
      this.agendamentos = result;
      this.agendamentosFiltrados = result;
    });
  }

  ngOnInit(): void {
    this.motoristaService.listar().subscribe(e => {
      this.motoristas = e;
    })
  }

  aplicarFiltros() {
    const { motoristaId, status, dataInicio, dataFim } = this.filtroForm.value;
    this.agendamentosService.obterTodosAgendamentosComFiltros(
      motoristaId,
      status,
      dataInicio,
      dataFim
    ).subscribe(result => {
      this.agendamentos = result;
      this.agendamentosFiltrados = result;
    });
  }

  limparFiltros() {
    this.agendamentosService.obterTodosAgendamentos().subscribe(result => {
      this.agendamentos = result;
      this.agendamentosFiltrados = result;
    });
  }

  agendarViagem(ag: Agendamento) {
    this.router.navigate(['/viagem']);
  }

  registrarAbastecimento(ag: Agendamento) {
      const dialogRef = this.dialog.open(RegistrarAbastecimentoModalComponent, {
          width: '800px',
          data: {}
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
        });
  }

  registrarManutencao(ag: Agendamento) {
    const dialogRef = this.dialog.open(RegistrarManutencaoModalComponent, {
      width: '400px',
      data: { veiculoId: ag.veiculo.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Manutenção registrada:', result);
      }
    });
  }

}
