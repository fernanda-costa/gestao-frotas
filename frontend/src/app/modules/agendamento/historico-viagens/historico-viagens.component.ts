import { Viagem } from '../../../models/viagem.model';
import { ViagemService } from '../../../services/viagem.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-historico-viagens',
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './historico-viagens.component.html',
  styleUrl: './historico-viagens.component.scss'
})
export class HistoricoViagensComponent {

 colunas: string[] = ['veiculo', 'dataSaida', 'dataRetorno', 'destino', 'kmInicial', 'kmFinal'];
  viagens: Viagem[] = [];

  constructor(private viagemService: ViagemService) {}

  ngOnInit(): void {
    this.viagemService.obterHistorico().subscribe((dados) => {
      this.viagens = dados.sort((a, b) =>
        new Date(b.dataSaida).getTime() - new Date(a.dataSaida).getTime()
      );
    });
  }
}