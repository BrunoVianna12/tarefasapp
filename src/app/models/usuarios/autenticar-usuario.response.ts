export interface AutenticarUsuarioResponse{
    id: string;
    nome: string;
    email: string;
    acessToken: string;
    dataHoraExpiracao: string;
}