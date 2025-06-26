import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { Ocorrencia } from '../../../models/ocorrencia.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ocorrencia-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './ocorrencia-list.component.html',
  styleUrl: './ocorrencia-list.component.scss'
})
export class OcorrenciaListComponent {

  ocorrencias: Ocorrencia[] = [];
  displayedColumns: string[] = ['veiculo', 'motorista', 'descricao', 'data'];

  constructor(private ocorrenciaService: OcorrenciaService) { }

  ngOnInit(): void {
    this.carregarOcorrencias();
  }

  carregarOcorrencias(): void {
    this.ocorrenciaService.listarTodos().subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar ocorrências:', erro);
      }
    });
  }
}