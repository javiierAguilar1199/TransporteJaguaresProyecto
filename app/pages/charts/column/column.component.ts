  import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexXAxis,
    ApexTooltip,
    ApexTheme,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    NgApexchartsModule,
  } from 'ng-apexcharts';
  import { MaterialModule } from '../../../material.module';
  import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
  import { CatalogoService } from 'src/app/services/catalogo.service';
  import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
  import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';

  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: any;
    theme: ApexTheme;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
    markers: any;
    grid: ApexGrid;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    labels: string[];
  };

  @Component({
    selector: 'app-column',
    standalone: true,
    imports: [NgApexchartsModule, MaterialModule, CommonModule],
    templateUrl: './column.component.html',
  })

  export class AppColumnChartComponent implements OnInit {
    @ViewChild('chart1') chart1: ChartComponent = Object.create(null);
    @ViewChild('chart2') chart2: ChartComponent = Object.create(null);
    @ViewChild('chart3') chart3: ChartComponent = Object.create(null);
    @ViewChild('chart4') chart4: ChartComponent = Object.create(null); // Agregamos el chart4
    public columnChartOptions1: Partial<ChartOptions> | any;
    public columnChartOptions2: Partial<ChartOptions> | any;
    public columnChartOptions3: Partial<ChartOptions> | any;
    public columnChartOptions4: Partial<ChartOptions> | any; // Definimos la configuración para chart4

    constructor(
      private adminPiloto: AdminiPilotosService,
      private catalog: CatalogoService,
      private adminSocios: AdminSociosServiceService,
      private adminUnidad: AdminUnidadesService,
    ) {}

    ngOnInit() {
      this.adminPiloto.topPilotos().subscribe((data: any) => {
        if (data.ok) {
          const responseData: any[] = data.response;
          const categories: string[] = [];
          const seriesData: number[] = [];

          responseData.forEach((item: any) => {
            categories.push(item.pNombre);
            seriesData.push(item.pCantidad);
          });

          this.columnChartOptions1 = {
            // Configuración del primer gráfico
            series: [
              {
                name: 'Cantidad',
                data: seriesData,
              },
            ],
            chart: {
              fontFamily: 'DM Sans, sans-serif',
              foreColor: '#a1aab2',
              height: 300,
              type: 'bar',
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                columnWidth: '35%',
                barHeight: '20%',
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 3,
            },
            stroke: {
              curve: 'straight',
              width: '0',
            },
            colors: ['#06d79c'],
            legend: {
              show: true,
            },
            grid: {
              show: true,
              strokeDashArray: 0,
              borderColor: 'rgba(0,0,0,0.1)',
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              categories: categories,
            },
            tooltip: {
              theme: 'dark',
            },
          };

          // Llamado al servicio para obtener datos del segundo gráfico
          this.catalog.getViajesDetpto().subscribe((data2: any) => {
            if (data2.ok) {
              const responseData2: any[] = data2.response;
              const categories2: string[] = [];
              const seriesData2: number[] = [];

              responseData2.forEach((item: any) => {
                categories2.push(item.pNombre);
                seriesData2.push(item.pCantidad);
              });

              this.columnChartOptions2 = {
                // Configuración del segundo gráfico
                series: [
                  {
                    name: 'Cantidad',
                    data: seriesData2,
                  },
                ],
                chart: {
                  fontFamily: 'DM Sans, sans-serif',
                  foreColor: '#a1aab2',
                  height: 300,
                  type: 'bar',
                  stacked: true,
                  toolbar: {
                    show: false,
                  },
                },
                plotOptions: {
                  bar: {
                    columnWidth: '35%',
                    barHeight: '20%',
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                markers: {
                  size: 3,
                },
                stroke: {
                  curve: 'straight',
                  width: '0',
                },
                colors: ['#398bf7'],
                legend: {
                  show: true,
                },
                grid: {
                  show: true,
                  strokeDashArray: 0,
                  borderColor: 'rgba(0,0,0,0.1)',
                  xaxis: {
                    lines: {
                      show: true,
                    },
                  },
                  yaxis: {
                    lines: {
                      show: true,
                    },
                  },
                },
                xaxis: {
                  categories: categories2,
                },
                tooltip: {
                  theme: 'dark',
                },
              };

              // Llamado al servicio para obtener datos del tercer gráfico (chart3)
              this.adminSocios.topSocios().subscribe((data3: any) => {
                if (data3.ok) {
                  const responseData3: any[] = data3.response;
                  const categories3: string[] = [];
                  const seriesData3: number[] = [];

                  responseData3.forEach((item: any) => {
                    categories3.push(item.pNombre);
                    seriesData3.push(item.pCantidad);
                  });

                  this.columnChartOptions3 = {
                    // Configuración del tercer gráfico
                    series: [
                      {
                        name: 'Cantidad',
                        data: seriesData3,
                      },
                    ],
                    chart: {
                      fontFamily: 'DM Sans, sans-serif',
                      foreColor: '#a1aab2',
                      height: 300,
                      type: 'bar',
                      stacked: true,
                      toolbar: {
                        show: false,
                      },
                    },
                    plotOptions: {
                      bar: {
                        columnWidth: '30%',
                        barHeight: '20%',
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    markers: {
                      size: 3,
                    },
                    stroke: {
                      curve: 'straight',
                      width: '0',
                    },
                    colors: ['#FFD233'],
                    legend: {
                      show: true,
                    },
                    grid: {
                      show: true,
                      strokeDashArray: 0,
                      borderColor: 'rgba(0,0,0,0.1)',
                      xaxis: {
                        lines: {
                          show: true,
                        },
                      },
                      yaxis: {
                        lines: {
                          show: true,
                        },
                      },
                    },
                    xaxis: {
                      categories: categories3,
                    },
                    tooltip: {
                      theme: 'dark',
                    },
                  };
                  // Llamado al servicio para obtener datos del cuarto gráfico (chart4)
                  this.adminUnidad.TopUnidades().subscribe((data4: any) => {
                    console.log(data4)
                    if (data4.ok) {
                      const responseData4: any[] = data4.response;
                      const categories4: string[] = [];
                      const seriesData4: number[] = [];

                      responseData4.forEach((item: any) => {
                        categories4.push(item.codigoUnidad);
                        seriesData4.push(item.pCantidad);
                      });

                      this.columnChartOptions4 = {
                        // Configuración del cuarto gráfico
                        series: [
                          {
                            name: 'Cantidad',
                            data: seriesData4,
                          },
                        ],
                        chart: {
                          fontFamily: 'DM Sans, sans-serif',
                          foreColor: '#a1aab2',
                          height: 300,
                          type: 'bar',
                          stacked: true,
                          toolbar: {
                            show: false,
                          },
                        },
                        plotOptions: {
                          bar: {
                            columnWidth: '30%',
                            barHeight: '20%',
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        markers: {
                          size: 3,
                        },
                        stroke: {
                          curve: 'straight',
                          width: '0',
                        },
                        colors: ['#A1AAB2'],
                        legend: {
                          show: true,
                        },
                        grid: {
                          show: true,
                          strokeDashArray: 0,
                          borderColor: 'rgba(0,0,0,0.1)',
                          xaxis: {
                            lines: {
                              show: true,
                            },
                          },
                          yaxis: {
                            lines: {
                              show: true,
                            },
                          },
                        },
                        xaxis: {
                          categories: categories4,
                        },
                        tooltip: {
                          theme: 'dark',
                        },
                      };
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }
