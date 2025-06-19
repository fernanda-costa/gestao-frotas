export interface Usuario {
    nome: string;
    tipo: 'ADMIN' | 'MOTORISTA'; 
    token: string;
}