import { Motorista } from "./motorista.model";

export interface Agendamento {
  id: string;
  dataHoraInicio: Date;
  veiculo: string;
  destino: string;
  status: 'AGENDADO' | 'EM_USO' | 'CONCLUIDO' | 'CANCELADO';
  motorista: Motorista;
}