import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CriarTarefasRequest } from "../models/tarefas/criar-tarefas.request";
import { Observable } from "rxjs";
import { CriarTarefasResponse } from "../models/tarefas/criar-tarefas.response";
import { environment } from "../../environments/environment";
import { AuthHelper } from "../helpers/auth.helper";
import { ConsultarTarefasRespose } from "../models/tarefas/consultar-tarefas.response";
import { EditarTarefasRequest } from "../models/tarefas/editar-tarefas.request";
import { EditarTarefasResponse } from "../models/tarefas/editar-tarefas.response";


@Injectable({
    providedIn: 'root'
})
export class TarefasService {


    constructor(
        private httpClient: HttpClient,
        private authHelper: AuthHelper
    ) {}


    /*
        Função para executar a criação de uma tarefa
        na api HTTP POST /api/tarefas/criar
    */
   criar(request: CriarTarefasRequest) : Observable<CriarTarefasResponse> {
        return this.httpClient.post<CriarTarefasResponse>
            (environment.tarefasApi + "/criar", request, {
                headers: this.getHttpHeader()
            });
   }

   consultar() : Observable<ConsultarTarefasRespose[]>{
    return this.httpClient.get<ConsultarTarefasRespose[]>
        (environment.tarefasApi + "/consultar", {
            headers: this.getHttpHeader()
        });
   }

   obter(id: string) : Observable<ConsultarTarefasRespose> {
    return this.httpClient.get<ConsultarTarefasRespose>
        (environment.tarefasApi + "/obter/" + id,
            {headers: this.getHttpHeader()
        })
   }

   excluir(id: string) : Observable<ConsultarTarefasRespose> {
    return this.httpClient.delete<ConsultarTarefasRespose>
        (environment.tarefasApi + "/excluir/" + id, {
            headers: this.getHttpHeader()
        })
   }

   editar(request: EditarTarefasRequest) : Observable<EditarTarefasResponse> {
    return this.httpClient.put<EditarTarefasResponse>
        (environment.tarefasApi + "/alterar/ ", request, {
            headers: this.getHttpHeader()
        })
   }

   private getHttpHeader(): HttpHeaders{
        //capturando os dados do usuário autenticado
        const usuario = this.authHelper.getUser();
        //criando o cabeçalho da requisição (HEADER)
        const httpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + usuario?.accessToken
        });
        return httpHeaders;
   }




}



