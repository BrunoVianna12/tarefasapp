import { Injectable } from "@angular/core";
import { AutenticarUsuarioResponse } from "../models/usuarios/autenticar-usuario.response";
import { CryptoHelper } from "./crypto.helper";

@Injectable({
    providedIn:'root'
})
export class AuthHelper{
    constructor(
        private cryptoHelper: CryptoHelper
    ){}

    key: string = 'auth-user';

    signIn(data: AutenticarUsuarioResponse): void{
        const content = JSON.stringify(data);
        localStorage.setItem(this.key,this.cryptoHelper.encrypt(content));
    }

    getUser(): AutenticarUsuarioResponse | null {
        const data = localStorage.getItem(this.key);
        if (data != null){
            const usuario = this.cryptoHelper.decrypt(data);
            const dataHoraAtual = new Date();
            const dataHoraExpiracao = new Date(JSON.parse(usuario)
                                              .dataHoraExpiracao);
            if(dataHoraAtual <= dataHoraExpiracao){
                return JSON.parse(usuario);
            }                                          
        }

        return null;
    }

    signOut(): void{
        localStorage.removeItem(this.key);
    }
}