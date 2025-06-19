import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {

  obterAgendamentosDoUsuario(): Observable<any[]> { //todo: mudar tipagem dps
    return of([
      {
        id: '1',
        dataHoraInicio: new Date('2025-06-20T10:00:00'),
        veiculo: 'Caminhão A',
        destino: 'São Paulo',
        status: 'EM_USO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date('2025-06-18T09:00:00'),
        veiculo: 'Van B',
        destino: 'Rio de Janeiro',
        status: 'AGENDADO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date(),
        veiculo: 'SUV X',
        destino: 'Ribeirão Preto',
        status: 'CONCLUIDO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date(),
        veiculo: 'SUV X',
        destino: 'Ribeirão Preto',
        status: 'CANCELADO',
        motorista: { nome : '', id: 1}
      }
    ]);
  }

obterTodosAgendamentos(): Observable<any[]> {//todo: mudar tipagem dps
    return of([
      {
        id: '1',
        dataHoraInicio: new Date('2025-06-20T10:00:00'),
        veiculo: 'Caminhão A',
        destino: 'São Paulo',
        status: 'EM_USO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date('2025-06-18T09:00:00'),
        veiculo: 'Van B',
        destino: 'Rio de Janeiro',
        status: 'AGENDADO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date(),
        veiculo: 'SUV X',
        destino: 'Ribeirão Preto',
        status: 'CONCLUIDO',
        motorista: { nome : '', id: 1}
      },
      {
        id: '2',
        dataHoraInicio: new Date(),
        veiculo: 'SUV X',
        destino: 'Ribeirão Preto',
        status: 'CANCELADO',
        motorista: { nome : '', id: 1}
      }
    ]);
  }

}