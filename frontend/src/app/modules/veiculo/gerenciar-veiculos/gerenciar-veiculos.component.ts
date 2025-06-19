import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gerenciar-veiculos',
  standalone: true,
  templateUrl: './gerenciar-veiculos.component.html',
  styleUrls: ['./gerenciar-veiculos.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
  ]
})
export class GerenciarVeiculosComponent {
  form: FormGroup;

  tipos = ['Carro', 'Van', 'Caminhão'];
  statusOptions = ['Disponível', 'Inativo', 'Em Manutenção'];

  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1900)]],
      quilometragem: [null, [Validators.required, Validators.min(0)]],
      status: ['Disponível', Validators.required]
    });
  }

  salvar() {

  }

}
