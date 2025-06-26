import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Veiculo } from '../../../models/veiculo.models';
import { VeiculoService } from '../../../services/veiculo.service';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registrar-ocorrencia-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './registrar-ocorrencia-modal.component.html',
  styleUrl: './registrar-ocorrencia-modal.component.scss'
})
export class RegistrarOcorrenciaModalComponent implements OnInit {

  form: FormGroup;
  veiculos: Veiculo[] = [];

  constructor(private fb: FormBuilder,
    private ocorrenciaService: OcorrenciaService,
    private veiculosService: VeiculoService,
    private router: Router,
    private dialogRef: MatDialogRef<RegistrarOcorrenciaModalComponent>,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      veiculoId: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.veiculosService.listar().subscribe(e => {
      this.veiculos = e;
    })
  }

  salvar() {
    if (this.form.valid) {
      const dados = this.form.value;
      dados.motoristaId = this.authService.usuario?.id;

      this.ocorrenciaService.salvar(dados).subscribe(e => {
        console.log(e);
        this.dialogRef.close(this.form.value);
        alert("Ocorrência cadastrada com sucesso")
      })
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
