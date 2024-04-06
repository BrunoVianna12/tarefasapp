import { HttpClient } from "@angular/common/http";
import { AutenticarUsuarioRequest } from "../models/usuarios/autenticar-usuario.request";
import { CriarUsuarioRequest } from "../models/usuarios/criar-usuario.request";
import { CriarUsuarioResponse } from "../models/usuarios/criar-usuario.response";
import { Observable } from "rxjs";
import { AutenticarUsuarioResponse } from "../models/usuarios/autenticar-usuario.response";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    
    constructor(
        private httpCliente: HttpClient
    ) {

    }




    criar(request: CriarUsuarioRequest): Observable<CriarUsuarioResponse> {
        return this.httpCliente.post<CriarUsuarioResponse>(environment.usuariosApi + '/criar', request)

    }

    autenticar(request: AutenticarUsuarioRequest): Observable<AutenticarUsuarioResponse> {
        return this.httpCliente.post<AutenticarUsuarioResponse>
            (environment.usuariosApi + "/autenticar", request);

    }
}