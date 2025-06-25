export interface Usuario {
    nome: string;
    perfil: 'ADMINISTRADOR' | 'MOTORISTA'; 
    token: string;
}