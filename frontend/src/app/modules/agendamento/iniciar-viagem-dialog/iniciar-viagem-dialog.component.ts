import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-viagem-dialog',
  templateUrl: './iniciar-viagem-dialog.component.html',
  styleUrls: ['./iniciar-viagem-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class IniciarViagemDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IniciarViagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      quilometragemSaida: ['', [Validators.required, Validators.min(0)]],
      observacoes: ['']
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
