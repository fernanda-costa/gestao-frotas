export interface Abastecimento {
    id: number;
    veiculoId: number;
    motoristaId: number;
    quilometragem: number;
    valor: number;
    tipoCombustivel: TipoCombustivel;
    data: Date;
}

export enum TipoCombustivel {
    GASOLINA,
    ETANOL,
    DIESEL,
    GNV,
    ELETRICO,
    FLEX
}