export interface Viagem {
  id: string;
  veiculo: string;
  dataSaida: Date;
  dataRetorno: Date;
  destino: string;
  kmInicial: number;
  kmFinal: number;
}
