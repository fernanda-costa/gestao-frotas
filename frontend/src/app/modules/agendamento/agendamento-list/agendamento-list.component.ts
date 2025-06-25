import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Agendamento } from '../../../models/agendamento.model';
import { AgendamentoService } from '../../../services/agendamento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { IniciarViagemDialogComponent } from '../iniciar-viagem-dialog/iniciar-viagem-dialog.component';
import { FinalizarViagemDialogComponent } from '../finalizar-viagem-dialog/finalizar-viagem-dialog.component';
import { DetalhesAgendamentoDialogComponent } from '../detalhes-agendamento-dialog/detalhes-agendamento-dialog.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agendamento-list',
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.scss'
})
export class AgendamentoListComponent implements OnInit {

  colunas: string[] = ['dataHoraInicio', 'veiculo', 'destino', 'status', 'acoes'];

  agendamentos: Agendamento[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private dialog: MatDialog,
    private usuarioService: AuthService
  ) { }

  ngOnInit(): void {

    this.atualizarLista();
  }

  private atualizarLista() {
    const id = this.usuarioService.usuario?.id;

    this.agendamentoService.obterAgendamentosDoUsuario(id!).subscribe((dados) => {
      console.log(dados);
      this.agendamentos = dados.sort((a, b) => new Date(a.dataHoraInicio).getTime() - new Date(b.dataHoraInicio).getTime()
      );
    });
  }

  iniciarViagem(agendamento: Agendamento) {
    const dialogRef = this.dialog.open(IniciarViagemDialogComponent, {
      width: '400px',
      data: { agendamento }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados para iniciar viagem:', result);
        this.registrarInicioViagem(agendamento, result);
      }
    });
  }

  registrarInicioViagem(agendamento: any, dados: any) {
    this.agendamentoService.iniciarViagem(agendamento.id, dados.quilometragemSaida, dados.observacoes).subscribe(e => {
      console.log(e);
      this.atualizarLista();
    })
  }

  registrarFimViagem(agendamento: any, dados: any) {
    this.agendamentoService.finalizarViagem(agendamento.id, dados.quilometragemFinal, dados.observacoes).subscribe(e => {
      console.log(e);
      this.atualizarLista();
    })
  }

  finalizarViagem(agendamento: any) {
    const dialogRef = this.dialog.open(FinalizarViagemDialogComponent, {
      width: '400px',
      data: agendamento
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        console.log('Viagem finalizada com:', resultado);
        this.registrarFimViagem(agendamento, resultado);
      }
    });
  }

  verDetalhes(agendamento: any) {
    this.dialog.open(DetalhesAgendamentoDialogComponent, {
      width: '500px',
      data: agendamento
    });
  }
}