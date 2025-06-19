import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gerenciar-motoristas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './gerenciar-motoristas.component.html',
  styleUrl: './gerenciar-motoristas.component.scss'
})
export class GerenciarMotoristasComponent {

  form: FormGroup;
  index: number | null = null;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cnh: ['', Validators.required],
      validadeCnh: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: [''],
      cidade: [''],
      uf: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      status: ['Ativo']
    });

    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.index = +params['id'];
        this.carregarDados(this.index);
      }
    });
  }

  carregarDados(index: number) {
    const motoristaMock = {
      nome: 'Maria Oliveira',
      cpf: '98765432100',
      cnh: '123456789',
      validadeCnh: '2025-12-31',
      telefone: '11999999999',
      cep: '01001000',
      endereco: 'Praça da Sé',
      cidade: 'São Paulo',
      uf: 'SP',
      email: 'maria@mail.com',
      senha: '',
      status: 'Ativo'
    };

    this.form.patchValue(motoristaMock);
  }

  buscarEndereco() {

  }

  salvar() {
    if (this.form.invalid) return;

    const dados = this.form.value;

    alert('Motorista salvo com sucesso!');
    this.router.navigate(['/motoristas']);
  }
}