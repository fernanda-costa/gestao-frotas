import { Component } from '@angular/core';
import { AgendamentosComponent } from '../../agendamento/agendamentos-admin/agendamentos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarManutencaoModalComponent } from '../../registrar-manutencao-modal/registrar-manutencao-modal.component';
import { RegistrarAbastecimentoModalComponent } from '../../registrar-abastecimento-modal/registrar-abastecimento-modal.component';

@Component({
  selector: 'app-home-admin',
  imports: [AgendamentosComponent, MatButtonModule, MatIconModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

  constructor(private router: Router, private dialog: MatDialog) { }

  agendarViagem() {
    this.router.navigate(['/viagem']);
  }

  gerenciarVeiculos() {
    this.router.navigate(['/veiculos']);
  }

  gerenciarMotoristas() {
    this.router.navigate(['/motoristas']);
  }

  visualizarOcorrencias() {
    this.router.navigate(['/ocorrencias']);
  }

  registrarAbastecimento() {
    const dialogRef = this.dialog.open(RegistrarAbastecimentoModalComponent, {
      width: '800px',
      data: {}
    });


  }



}
