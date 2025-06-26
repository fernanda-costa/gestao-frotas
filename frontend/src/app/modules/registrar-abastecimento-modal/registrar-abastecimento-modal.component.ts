import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MotoristaService } from '../../services/motorista.service';
import { VeiculoService } from '../../services/veiculo.service';
import { Motorista } from '../../models/motorista.model';
import { Veiculo } from '../../models/veiculo.models';
import { AbastecimentoService } from '../../services/abastecimento.service';
import { TipoCombustivel } from '../../models/abastecimento.model';

@Component({
  selector: 'app-registrar-abastecimento-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './registrar-abastecimento-modal.component.html',
  styleUrls: ['./registrar-abastecimento-modal.component.scss']
})
export class RegistrarAbastecimentoModalComponent implements OnInit {
  form: FormGroup;

  combustiveis = Object.keys(TipoCombustivel).filter(key => isNaN(Number(key)));

  motoristas: Motorista[] = [];
  veiculos: Veiculo[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrarAbastecimentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private motoristaService: MotoristaService,
    private veiculosService: VeiculoService,
    private abastecimentoService: AbastecimentoService
  ) {
    this.form = this.fb.group({
      veiculoId: ['', Validators.required],
      data: [new Date(), Validators.required],
      tipoCombustivel: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      quilometragem: [null, [Validators.required, Validators.min(0)]],
      motoristaId: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.veiculosService.listar().subscribe(e => {
      this.veiculos = e;
    });

    this.motoristaService.listar({ ativo: true }).subscribe(e => {
      this.motoristas = e;
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const abastecimento = this.form.value;

    this.abastecimentoService.salvar(abastecimento).subscribe(e => {
      alert('Abastecimento salvo com sucesso');

      this.dialogRef.close(this.form.value);
    })
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
