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

  // editar(index: number) {
  //   this.form.setValue(this.veiculos[index]);
  //   this.editIndex = index;
  // }

  inativar(index: number) {
    this.veiculos[index].status = 'Inativo';
  }
}
