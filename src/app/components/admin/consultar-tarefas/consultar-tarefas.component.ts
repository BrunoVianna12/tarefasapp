import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})
export class ConsultarTarefasComponent implements OnInit {
  tarefas: any[] = [];
  
  ngOnInit(): void {
    
    this.tarefas = [
      {nome: 'Tarefa Exemplo 1', data: '08/04/2024', prioridade: 'Alta'},
      {nome: 'Tarefa Exemplo 2', data: '09/04/2024', prioridade: 'Média'},
      {nome: 'Tarefa Exemplo 3', data: '10/04/2024', prioridade: 'Baixa'},
      {nome: 'Tarefa Exemplo 4', data: '11/04/2024', prioridade: 'Alta'},
      {nome: 'Tarefa Exemplo 5', data: '12/04/2024', prioridade: 'Media'},
      {nome: 'Tarefa Exemplo 6', data: '13/04/2024', prioridade: 'Baixa'},

    ];
  }

}
