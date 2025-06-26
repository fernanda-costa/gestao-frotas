import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ManutencaoService } from '../../services/manutencao.service';
import { TipoManutencao } from '../../models/manutencao.model';

@Component({
  selector: 'app-registrar-manutencao-modal',
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
  templateUrl: './registrar-manutencao-modal.component.html',
  styleUrls: ['./registrar-manutencao-modal.component.scss']
})
export class RegistrarManutencaoModalComponent {
  form: FormGroup;

  tipos = Object.keys(TipoManutencao).filter(key => isNaN(Number(key)));

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrarManutencaoModalComponent>,
    private manutencaoService: ManutencaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      data: [new Date(), Validators.required],
      tipo: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      quilometragem: [null, [Validators.required, Validators.min(0)]],
      veiculoId: [],
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const manutencao = this.form.value;
    manutencao.veiculoId = this.data.veiculoId;

    this.manutencaoService.salvar(manutencao).subscribe(e => {
      alert('Manutenção salva com sucesso');
      this.dialogRef.close(manutencao);
    })

  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
