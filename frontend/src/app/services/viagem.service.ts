import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viagem } from '../models/viagem.model';

@Injectable({ providedIn: 'root' })
export class ViagemService {
  obterHistorico(): Observable<Viagem[]> {
    return of([
      {
        id: '1',
        veiculo: 'Caminhão A',
        dataSaida: new Date('2025-05-10T08:00:00'),
        dataRetorno: new Date('2025-05-12T18:00:00'),
        destino: 'São Paulo',
        kmInicial: 10200,
        kmFinal: 10560
      },
      {
        id: '2',
        veiculo: 'Van B',
        dataSaida: new Date('2025-04-03T07:30:00'),
        dataRetorno: new Date('2025-04-05T17:15:00'),
        destino: 'Campinas',
        kmInicial: 30000,
        kmFinal: 30320
      }
    ]);
  }
}
