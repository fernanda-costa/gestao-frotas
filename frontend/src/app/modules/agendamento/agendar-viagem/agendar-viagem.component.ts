import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-agendar-viagem',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './agendar-viagem.component.html',
  styleUrl: './agendar-viagem.component.scss'
})
export class AgendarViagemComponent {
  form: FormGroup;

  veiculos = ['Veículo 1', 'Veículo 2', 'Veículo 3'];
  motoristas = ['João Silva', 'Maria Oliveira', 'Carlos Souza'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      veiculo: ['', Validators.required],
      motorista: ['', Validators.required],
      dataHora: ['', Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required],
      status: ['AGENDADO']
    });
  }

  salvar() {
    if (this.form.valid) {
      const dados = this.form.value;
      console.log('Agendamento salvo:', dados);

      // Aqui você pode chamar um service para persistir os dados via API
    }
  }
}