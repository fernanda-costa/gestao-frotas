export interface Manutencao {
    id: number;
    data: Date;
    veiculoId: number;
    quilometragem: number;
    valor: number;
    tipo: TipoManutencao;
    descricao: string;
}


    
export enum TipoManutencao {
    PREVENTIVA,
    CORRETIVA
}