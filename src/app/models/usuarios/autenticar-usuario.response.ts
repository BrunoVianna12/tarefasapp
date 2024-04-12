export interface AutenticarUsuarioResponse{
    id: string;
    nome: string;
    email: string;
    accessToken: string;
    dataHoraExpiracao: string;
}