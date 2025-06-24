import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finalizar-viagem-dialog',
  templateUrl: './finalizar-viagem-dialog.component.html',
  styleUrls: ['./finalizar-viagem-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class FinalizarViagemDialogComponent {
  finalizarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FinalizarViagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public viagem: any // Recebe dados da viagem
  ) {
    this.finalizarForm = this.fb.group({
      quilometragemFinal: ['', [Validators.required, Validators.min(this.viagem.quilometragemInicial || 0)]],
      observacoes: ['']
    });
  }

  onSubmit() {
    if (this.finalizarForm.valid) {
      const dadosFinalizacao = {
        quilometragemFinal: this.finalizarForm.value.quilometragemFinal,
        observacoes: this.finalizarForm.value.observacoes,
        dataHoraRetorno: new Date(),
        status: 'FINALIZADO'
      };
      this.dialogRef.close(dadosFinalizacao);
    }
  }

  onCancelar() {
    this.dialogRef.close(null);
  }
}
