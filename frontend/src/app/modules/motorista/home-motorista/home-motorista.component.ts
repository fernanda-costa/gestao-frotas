import { Component } from '@angular/core';
import { AgendamentoListComponent } from '../../agendamento/agendamento-list/agendamento-list.component';
import { HistoricoViagensComponent } from '../../agendamento/historico-viagens/historico-viagens.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-motorista',
  imports: [AgendamentoListComponent, HistoricoViagensComponent, MatIconModule, MatButtonModule],
  templateUrl: './home-motorista.component.html',
  styleUrl: './home-motorista.component.scss'
})
export class HomeMotoristaComponent {

  registrarOcorrencia() {

  }
}
