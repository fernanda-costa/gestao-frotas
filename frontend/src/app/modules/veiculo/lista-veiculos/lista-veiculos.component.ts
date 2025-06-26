import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Veiculo } from '../../../models/veiculo.models';
import { VeiculoService } from '../../../services/veiculo.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/app-bar/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lista-veiculos',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule],
  templateUrl: './lista-veiculos.component.html',
  styleUrl: './lista-veiculos.component.scss'
})
export class ListaVeiculosComponent {
  displayedColumns: string[] = ['placa', 'modelo', 'tipo', 'ano', 'km', 'status', 'acoes'];
  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculoService.listar().subscribe({
      next: (dados) => {
        this.veiculos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar veículos:', erro);
      }
    });
  }

  adicionarVeiculo() {
    this.router.navigate(['/veiculos/cadastrar']);
  }

  editar(veiculo: Veiculo) {
    this.router.navigate(['/veiculos/editar/', veiculo.id]);
  }

  inativar(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmação',
        mensagem: `Você concorda em remover o veiculo ${veiculo.modelo}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veiculoService.inativar(veiculo.id).subscribe(e => this.carregarVeiculos());
      }
    });
  }
}