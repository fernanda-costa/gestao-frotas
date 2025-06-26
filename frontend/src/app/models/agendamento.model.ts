import { Motorista } from "./motorista.model";
import { Veiculo } from "./veiculo.models";

export interface Agendamento {
  id: string;
  dataHoraInicio: Date;
  veiculo: Veiculo;
  destino: string;
  status: 'AGENDADO' | 'EM_USO' | 'CONCLUIDO' | 'CANCELADO';
  motorista: Motorista;
}