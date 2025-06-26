import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { MotoristaService } from '../../../services/motorista.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gerenciar-motoristas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './gerenciar-motoristas.component.html',
  styleUrl: './gerenciar-motoristas.component.scss'
})
export class GerenciarMotoristasComponent {

  form: FormGroup;
  index: number | null = null;
  editando = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      id: [],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: [''],
      senha: [''],
      ativo: [true],

      cnh: this.fb.group({
        numCnh: ['', Validators.required],
        categoria: ['', Validators.required],
        dataEmissao: ['', Validators.required],
        validade: ['', Validators.required],
        orgaoEmissor: ['', Validators.required]
      }),

      endereco: this.fb.group({
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
        cep: ['']
      })
    });

    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.editando = true;
        this.index = +params['id'];
        this.carregarDados(this.index);
      }
    });
  }

  carregarDados(id: number) {
    this.motoristaService.buscarPorId(id).subscribe(m => {
      console.log(m);
      this.form.patchValue(m);
    })

  }

  buscarCep() {
    const cep = this.form.get('endereco.cep')?.value;

    if (!cep || cep.length < 8) return;

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (res) => {
        if (res.erro) {
          alert('CEP não encontrado!');
          return;
        }

        this.form.patchValue({
          endereco: {
            logradouro: res.logradouro,
            bairro: res.bairro,
            cidade: res.localidade,
            estado: res.uf
          }
        });
      },
      error: () => {
        alert('Erro ao buscar CEP');
      }
    });
  }

  voltar() {
    this.router.navigate(['/motoristas']);
  }

  salvar() {
    if (this.form.invalid) return;

    const dados = this.form.value;

    this.motoristaService.cadastrar(dados).subscribe(e => {
      alert('Motorista salvo com sucesso!');
      this.router.navigate(['/motoristas']);
    })

  }
}