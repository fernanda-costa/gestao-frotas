import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Motorista } from '../../../models/motorista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-motorista',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-motorista.component.html',
  styleUrl: './lista-motorista.component.scss'
})
export class ListaMotoristaComponent {
  motoristas: Motorista[] = [
    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '1199999-9999', email: 'joao@mail.com', status: 'Ativo' },
    { id: 1, nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '1198888-8888', email: 'maria@mail.com', status: 'Ativo' }
  ];

  displayedColumns = ['nome', 'cpf', 'telefone', 'email', 'status', 'acoes'];
  
  constructor(private router: Router) {}

  cadastrar() {
    this.router.navigate(['/motoristas/cadastrar']);
  }

  editar(index: number) {
    this.router.navigate(['/motoristas/editar', index]);
  }

  inativar(index: number) {
    this.motoristas[index].status = 'Inativo';
  }
}
