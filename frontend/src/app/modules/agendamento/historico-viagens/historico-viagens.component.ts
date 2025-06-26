import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-historico-viagens',
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './historico-viagens.component.html',
  styleUrl: './historico-viagens.component.scss'
})
export class HistoricoViagensComponent {

  colunas: string[] = ['veiculo', 'dataSaida', 'dataRetorno', 'destino', 'kmInicial', 'kmFinal'];
  agendamentos: Agendamento[] = [];

  constructor(
    private agendamentoService: AgendamentoService, private usuarioService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.usuarioService.usuario?.id;

    this.agendamentoService.obterAgendamentosDoUsuarioConcluidos(id!).subscribe((dados) => {
      this.agendamentos = dados;
      console.log(dados)
    });
  }
}