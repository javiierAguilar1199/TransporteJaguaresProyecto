    import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    import { ActivatedRoute, Router } from '@angular/router';
    import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
    import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
    import * as ExcelJS from 'exceljs';

    @Component({
      selector: 'app-pdf-unidades',
      templateUrl: './pdf-unidades.component.html',
      styleUrls: ['./pdf-unidades.component.scss']
    })
    export class PdfUnidadesComponent {

      id: number = 0;
      tipmes: number = 0;
      public ViajesUnidad: any[] = [];
      public pCodigoUnidad: any[] = [];
      public pColor: any[] = [];
      public pModelo: any[] = [];
      public pNoPlaca: any[] = [];
      public pNombreSocio: any[] = [];

      @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef;
      @ViewChild('imageElement', { static: false }) imageElement: ElementRef;
      @ViewChild('pdfcontent') pdfcontent: ElementRef;
      @ViewChild('pdfcomponent', { static: false }) pdfcomponent: ElementRef;

      constructor(
        private renderer: Renderer2,
        private route: ActivatedRoute,
      private router:Router,
      private Admin: AdminiPilotosService,
      private adminUnidades:AdminUnidadesService
      ) { }

      async ngOnInit() {
        this.route.params.subscribe((params) => {
          this.id = +params['id'];
          this.tipmes =+params['tipoMes'];

        });

    this.adminUnidades.getUnidadXID(this.id).subscribe((data) => {
      if (data.ok) {

        this.pCodigoUnidad = data.response[0].pCodigoUnidad
        this.pColor = data.response[0].pColor
        this.pModelo = data.response[0].pModelo
        this.pNoPlaca = data.response[0].pNoPlaca
        this.pNombreSocio = data.response[0].pNombreSocio

      }
    });


        const gen = await this.adminUnidades.getUnidadViajes(this.id, this.tipmes).toPromise();
        this.ViajesUnidad= gen.response;

        if (Array.isArray(this.ViajesUnidad)) {
          const tabla = document.querySelector('#tabla-body') as HTMLTableSectionElement;

          // Limpia el contenido anterior de la tabla
          while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
          }

          // Itera a través de los objetos en 'data.response' y crea filas en la tabla
          this.ViajesUnidad.forEach((item: any) => {
            const row = tabla.insertRow();
            row.insertCell(0).textContent = item.pNoEntrega;
            row.insertCell(1).textContent = item.pNombrePiloto;
            row.insertCell(2).textContent = item.pDepartamento;
            row.insertCell(3).textContent = item.pMunicipio;
            row.insertCell(4).textContent = item.pDiaEntrega;
            row.insertCell(5).textContent = item.pLugarEntrega;
            row.insertCell(6).textContent = item.pObservaciones;
            row.insertCell(7).textContent = item.pFechaEntrego;
            row.insertCell(8).textContent = item.pUsuario;


          });
        } else {
          console.error('Los datos no son un array');
        }

      }

      generatePDF() {
        const content = document.getElementById('pdfcomponent');
        const header = document.getElementById('pdf-header'); // Obtener el elemento del encabezado

        if (content) {
          const margin = 10;
          html2canvas(content).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210 - 2 * margin;
            const pageHeight = 297 - 2 * margin;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = margin; // Ajusta la posición inicial para aplicar el margen

            if (header) {
              const headerText = header.textContent || ''; // Si es nulo, usa una cadena de texto vacía
              const fontSize = 12; // Tamaño de fuente para el encabezado
              const textWidth = pdf.getStringUnitWidth(headerText) * fontSize;
              const pageWidth = pdf.internal.pageSize.getWidth();
              const textX = (pageWidth - textWidth) / 2; // Centra horizontalmente el texto
              const textY = margin + fontSize; // Coloca el texto al inicio de la página

              pdf.setFontSize(fontSize);
              pdf.text(headerText, textX, textY);
              position = textY + fontSize; // Ajusta la posición para que el contenido comience debajo del encabezado
            }

            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight + margin;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }

            // Guarda o muestra el PDF como desees
            pdf.save('ViajesUnidad.pdf');
          });
        } else {
          console.error("El elemento con ID 'pdfcomponent' no fue encontrado.");
        }
      }

      generateExcel() {
      //   // Crea un nuevo libro de trabajo y una hoja de cálculo
      //   const workbook = new ExcelJS.Workbook();
      //   const worksheet = workbook.addWorksheet('ViajesUnidad');

      //   // Obtén el contenido de la tabla
      //   const table = document.getElementById('tabla-body') as HTMLTableSectionElement;
      //   const rows = table.querySelectorAll('tr');

      //   // Itera a través de las filas y celdas de la tabla y agrega los datos a la hoja de cálculo
      //   rows.forEach((row) => {
      //     const rowData: string[] = []; // Declarar rowData como string[]
      //     const cells = row.querySelectorAll('td');
      //     cells.forEach((cell) => {
      //       rowData.push(cell.textContent ?? '');
      //     });
      //     worksheet.addRow(rowData);
      //   });

      //   // Genera el archivo Excel
      //   workbook.xlsx.writeBuffer().then((data) => {
      //     const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //     const url = window.URL.createObjectURL(blob);
      //     const a = document.createElement('a');
      //     a.href = url;
      //     a.download = 'ViajesUnidad.xlsx'; // Nombre del archivo Excel
      //     a.click();
      //     window.URL.revokeObjectURL(url);
      //   });
      // }
      }
    }

