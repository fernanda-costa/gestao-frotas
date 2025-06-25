import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../models/veiculo.models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

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
export class GerenciarVeiculosComponent implements OnInit {
  form: FormGroup;
  editando = false;

  tipos = ['CARRO', 'VAN', 'CAMINHONETE', 'CAMINHAO', 'FURGAO', 'ONIBUS', 'SUV', 'UTILITARIO'];
  statusOptions = ['DISPONIVEL', 'INATIVO', 'EM_MANUTENCAO'];

  constructor(
    private fb: FormBuilder,
    private veiculosService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [],
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      quilometragemAtual: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      marca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editando = true;
      this.veiculosService.buscarPorId(+id).subscribe((veiculo) => {
        this.form.patchValue(veiculo);
      });
    }
  }

  salvarOuEditar() {
    if (this.editando) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  salvar() {
    this.veiculosService.cadastrar(this.form.value).subscribe(() => {
      this.router.navigate(['/veiculos']);
    });
  }

  editar() {
    const veiculo = this.form.value as Veiculo;
    this.veiculosService.editar(veiculo.id, veiculo).subscribe(() => {
      this.router.navigate(['/veiculos']);
    });
  }

  voltar() {
    this.router.navigate(['/veiculos']);
  }
}
