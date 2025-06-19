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
export class RegistrarAbastecimentoModalComponent {
  form: FormGroup;

  veiculos = ['Carro A', 'Van B', 'Caminhão C']; // substitua pelos dados reais
  combustiveis = ['Gasolina', 'Álcool', 'Diesel', 'GNV'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrarAbastecimentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      veiculo: ['', Validators.required],
      data: [new Date(), Validators.required],
      tipoCombustivel: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      quilometragem: [null, [Validators.required, Validators.min(0)]],
      motorista: ['', Validators.required]
    });
  }

  salvar() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
