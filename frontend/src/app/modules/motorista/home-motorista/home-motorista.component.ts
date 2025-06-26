import { Component } from '@angular/core';
import { AgendamentoListComponent } from '../../agendamento/agendamento-list/agendamento-list.component';
import { HistoricoViagensComponent } from '../../agendamento/historico-viagens/historico-viagens.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrarOcorrenciaModalComponent } from '../../ocorrencia/registrar-ocorrencia-modal/registrar-ocorrencia-modal.component';

@Component({
  selector: 'app-home-motorista',
  imports: [AgendamentoListComponent, HistoricoViagensComponent, MatIconModule, MatButtonModule],
  templateUrl: './home-motorista.component.html',
  styleUrl: './home-motorista.component.scss'
})
export class HomeMotoristaComponent {

  constructor(private router: Router, private dialog: MatDialog) { }

  registrarOcorrencia() {
    const dialogRef = this.dialog.open(RegistrarOcorrenciaModalComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
