import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MotoristaService } from '../../../services/motorista.service';
import { VeiculoService } from '../../../services/veiculo.service';
import { Motorista } from '../../../models/motorista.model';
import { Veiculo } from '../../../models/veiculo.models';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-agendar-viagem',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
  ],
  templateUrl: './agendar-viagem.component.html',
  styleUrl: './agendar-viagem.component.scss'
})
export class AgendarViagemComponent implements OnInit {
  form: FormGroup;

  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  agendamentos: Agendamento[] = [];

  constructor(private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private veiculosService: VeiculoService,
    private router: Router,
    private agendamentoService: AgendamentoService) {
    this.form = this.fb.group({
      veiculoId: ['', Validators.required],
      motoristaId: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required],
      status: ['AGENDADO']
    });
  }

  ngOnInit(): void {
    this.motoristaService.listar({ ativo: true }).subscribe(e => {
      this.motoristas = e;
    })

    this.veiculosService.listar().subscribe(e => {
      this.veiculos = e;
    })
  }

  salvar() {
    if (this.form.valid) {
      var dados = this.form.value;
      const [horas, minutos] = dados.hora.split(':').map(Number);

      const dataOriginal = new Date(dados.data);
      const dataHoraSaida = new Date(
        dataOriginal.getFullYear(),
        dataOriginal.getMonth(),
        dataOriginal.getDate(),
        horas,
        minutos
      );

      dados.dataHoraSaida = dataHoraSaida.toISOString();

      console.log('Agendamento salvo:', dados);

      this.agendamentoService.salvar(dados).subscribe(e => {
        console.log(e);
        this.router.navigate(['/admin']);

      })
    }
  }

  voltar() {
    this.router.navigate(['/admin']);
  }
}