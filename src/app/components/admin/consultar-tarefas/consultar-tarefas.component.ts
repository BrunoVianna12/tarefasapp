import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../../../services/tarefas.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsultarTarefasRespose } from '../../../models/tarefas/consultar-tarefas.response';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})
export class ConsultarTarefasComponent implements OnInit {
  tarefas: ConsultarTarefasRespose [] = [];
  paginador: number = 1;
  constructor(
    private tarefasService: TarefasService
  ){}
  
  ngOnInit(): void {
    
    this.tarefasService.consultar()
      .subscribe({
        next : (data) => {
          this.tarefas = data;
        },
        error: (e) =>{
          console.log(e);
        }
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

  handlePageChange(event: any): void {
    this.paginador = event;
  }

}
