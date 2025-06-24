import { Component } from '@angular/core';
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
export class AgendamentosComponent {
  filtroForm: FormGroup;

  agendamentos: Agendamento[] = [];
  agendamentosFiltrados: Agendamento[] = [];

  constructor(private fb: FormBuilder, private agendamentosService: AgendamentoService) {
    this.filtroForm = this.fb.group({
      motorista: [''],
      status: [''],
      dataInicio: [''],
      dataFim: ['']
    });

    this.agendamentosService.obterTodosAgendamentos().subscribe(result => {
      this.agendamentos = result;
      this.agendamentosFiltrados = result;
    });
    console.log(this.agendamentosFiltrados);

    this.filtroForm.valueChanges.subscribe(() => this.aplicarFiltros());
  }

  aplicarFiltros() {
    const { motorista, status, dataInicio, dataFim } = this.filtroForm.value;

    this.agendamentosFiltrados = this.agendamentos!.filter(ag => {
      const matchMotorista = motorista ? ag.motorista.nome.toLowerCase().includes(motorista.toLowerCase()) : true;
      const matchStatus = status ? ag.status === status : true;
      const matchDataInicio = dataInicio ? ag.dataHoraInicio >= new Date(dataInicio) : true;
      const matchDataFim = dataFim ? ag.dataHoraInicio <= new Date(dataFim) : true;
      return true;
      // return matchMotorista && matchStatus && matchDataInicio && matchDataFim;
    });

  }

  agendarViagem(ag: any) {
    console.log('Agendar viagem:', ag);
  }

  registrarAbastecimento(ag: any) {
    console.log('Registrar abastecimento:', ag);
  }

  registrarManutencao(ag: any) {
    console.log('Registrar manutenção:', ag);
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'PENDENTE':
        return 'primary';   // azul
      case 'EM_USO':
        return 'accent';    // rosa
      case 'FINALIZADO':
        return 'warn';      // vermelho
      default:
        return 'primary';
    }
  }

}
