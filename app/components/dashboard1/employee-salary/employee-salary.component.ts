import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
} from 'ng-apexcharts';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  templateUrl: './employee-salary.component.html',
})
export class AppEmployeeSalaryComponent {
  public barChartOptions: Partial<ChartOptions> | any;

  constructor() {
    this.barChartOptions = {
      series: [
        {
          name: 'Salaries',
          data: [45000, 62000, 55000, 72000, 60000, 58000],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5', 'Employee 6'],
      },
    };
  }
}

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
}
