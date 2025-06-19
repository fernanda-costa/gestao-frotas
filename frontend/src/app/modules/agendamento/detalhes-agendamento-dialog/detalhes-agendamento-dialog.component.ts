import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detalhes-agendamento-dialog',
  templateUrl: './detalhes-agendamento-dialog.component.html',
  styleUrls: ['./detalhes-agendamento-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    CommonModule
  ]
})
export class DetalhesAgendamentoDialogComponent {
  agendamento: any;

  constructor(
    private dialogRef: MatDialogRef<DetalhesAgendamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.agendamento = data;
  }

  fechar() {
    this.dialogRef.close();
  }
}
