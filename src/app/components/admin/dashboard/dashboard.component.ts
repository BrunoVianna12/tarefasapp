import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  graficoColunas : Chart = new Chart();
  graficoLinhas : Chart = new Chart();
  graficoDonut : Chart = new Chart();
  graficoBarras : Chart = new Chart();

  constructor(
    private spinnerService: NgxSpinnerService
  ){}
  
  ngOnInit(): void {
    // MOC////////////////////////////////////////////////////////////
  this.spinnerService.show();
    const dados = [
      ['Exemplo 1',100],
      ['Exemplo 2',150],
      ['Exemplo 3',50],
      ['Exemplo 4',250],
    ];
    const nomes = ['Exemplo 1','Exemplo 2','Exemplo 3','Exemplo 4'];

    this.criarGraficoColunas(dados,nomes);
    this.criarGraficoLinhas(dados,nomes);
    this.criarGraficoDonut(dados,nomes);
    this.criarGraficoBarras(dados,nomes);

    this.spinnerService.hide();

    //////////////////////////////////////////////////////////////////
  }

  criarGraficoColunas(dados: any[], nomes: any[]) : void {
    this.graficoColunas = new Chart({
      chart: { type : 'column'},
      title: { text : 'Resumo de tarefas por tipo'},
      subtitle: {text : 'Quantidade de tarefas por tipo selecionado.'},
      series: [{ data: dados, type: undefined as any }],
      xAxis: { categories: nomes },
      legend: {enabled : false},
      credits: {enabled : false }
    });
  }

  criarGraficoLinhas(dados: any[], nomes: any[]) : void {
    this.graficoLinhas = new Chart({
      chart: { type : 'line'},
      title: { text : 'Resumo de tarefas por periodo'},
      subtitle: {text : 'Quantidade de tarefas cadstradas por período.'},
      series: [{ data: dados, type: undefined as any }],
      xAxis: { categories: nomes },
      legend: {enabled : false},
      credits: {enabled : false }
    });
  }

  criarGraficoDonut(dados: any[], nomes: any[]) : void {
    this.graficoDonut = new Chart({
      chart: { type : 'pie'},
      title: { text : 'Resumo de tarefas por prioridade.'},
      subtitle: {text : 'Quantidade de tarefas cadstradas por prioridade.'},
      plotOptions : {
        pie : {
          innerSize: '50%',
          allowPointSelect: true,
          cursor: 'pointer',
          
        }
      },
      series: [{ data: dados, type: undefined as any }],
      legend: {enabled : false},
      credits: {enabled : false }
    });
  }

  criarGraficoBarras(dados: any[], nomes: any[]) : void {
    this.graficoBarras = new Chart({
      chart: { type : 'bar'},
      title: { text : 'Resumo de tarefas por categoria'},
      subtitle: {text : 'Quantidade de tarefas cadstradas por categoria.'},
      series: [{ data: dados, type: undefined as any }],
      xAxis: { categories: nomes },
      legend: {enabled : false},
      credits: {enabled : false }
    });
    
  }
  
}
