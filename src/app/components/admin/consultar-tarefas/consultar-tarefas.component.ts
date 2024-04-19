import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../../../services/tarefas.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsultarTarefasRespose } from '../../../models/tarefas/consultar-tarefas.response';
import { error } from 'highcharts';
import { MessagesComponent } from '../../layout/messages/messages.component';
import { RouterModule } from '@angular/router';
import { NgArrayPipesModule } from 'ngx-pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    MessagesComponent,
    RouterModule,
    NgArrayPipesModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})
export class ConsultarTarefasComponent implements OnInit {
  tarefas: ConsultarTarefasRespose [] = [];
  paginador: number = 1;
  mensagem: string = '';
  filtro: string = '';

  constructor(
    private tarefasService: TarefasService,
    private spinnerService: NgxSpinnerService
  ){}
  
  ngOnInit(): void {
    this.spinnerService.show();
    this.tarefasService.consultar()
      .subscribe({
        next : (data) => {
          this.tarefas = data;
        },
        error: (e) =>{
          console.log(e);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
    /*this.tarefas = [
      {nome: 'Tarefa Exemplo 1', data: '08/04/2024', prioridade: 'Alta'},
      {nome: 'Tarefa Exemplo 2', data: '09/04/2024', prioridade: 'Média'},
      {nome: 'Tarefa Exemplo 3', data: '10/04/2024', prioridade: 'Baixa'},
      {nome: 'Tarefa Exemplo 4', data: '11/04/2024', prioridade: 'Alta'},
      {nome: 'Tarefa Exemplo 5', data: '12/04/2024', prioridade: 'Media'},
      {nome: 'Tarefa Exemplo 6', data: '13/04/2024', prioridade: 'Baixa'},

    ];*/
  }

  onDelete(id: string) : void {
    if(confirm('Deseja realmente excluir a tarefa selecionada?')){
      this.spinnerService.show();
      this.tarefasService.excluir(id)
        .subscribe({
          next: (data) => {
            this.mensagem = `A tarefa "${data.nome}" foi excluída com sucesso.`;
            this.ngOnInit();
          },
          error: (e) => {
            console.log(e.error);            
          }
        }).add(() => {
          this.spinnerService.hide();
        })
    }
  }

  handlePageChange(event: any): void {
    this.paginador = event;
  }

}
