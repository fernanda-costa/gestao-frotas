import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Motorista } from '../../../models/motorista.model';
import { Router } from '@angular/router';
import { MotoristaService } from '../../../services/motorista.service';

@Component({
  selector: 'app-lista-motorista',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-motorista.component.html',
  styleUrl: './lista-motorista.component.scss'
})
export class ListaMotoristaComponent {
  motoristas: Motorista[] = [];

  displayedColumns = ['nome', 'telefone', 'email', 'ativo', 'acoes'];

  constructor(private router: Router, private motoristaService: MotoristaService) { }

  ngOnInit(): void {
    this.carregarMotoristas();
  }

  carregarMotoristas(): void {
    this.motoristaService.listar().subscribe({
      next: (dados) => {
        this.motoristas = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar motoristas:', erro);
      }
    });
  }

  cadastrar() {
    this.router.navigate(['/motoristas/cadastrar']);
  }

  editar(motorista: Motorista) {
    this.router.navigate(['/motoristas/editar', motorista.id]);
  }

  inativar(motorista: Motorista): void {
    this.motoristaService.inativar(motorista.id).subscribe(e => this.carregarMotoristas());
  }
}
