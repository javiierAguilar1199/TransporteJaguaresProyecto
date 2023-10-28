import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pdf-socio',
  templateUrl: './pdf-socio.component.html',
  styleUrls: ['./pdf-socio.component.scss']
})
export class PdfSocioComponent {

  id: number = 0;
  tipmes: number = 0;
  public Viajes: any[] = [];
  public pNOmbre: any[] = [];
  public pSNombre: any[] = [];
  public PApellido: any[] = [];
  public pDireccion: any[] = [];
  public pSApellido: any[] = [];
  public pNoTelefono: any[] = [];
  public pNoDPI: any[] = [];

  @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef;
  @ViewChild('imageElement', { static: false }) imageElement: ElementRef;
  @ViewChild('pdfcontent') pdfcontent: ElementRef;
  @ViewChild('pdfcomponent', { static: false }) pdfcomponent: ElementRef;

  constructor(private renderer: Renderer2,
    private route: ActivatedRoute, private router:
     Router, private Admin: AdminiPilotosService) { }

  async ngOnInit() {
    this.route.params.subscribe((params) => {

      this.id = +params['id'];
       this.tipmes =+params['tipoMes'];
    });

this.Admin.getSocioID(this.id).subscribe((data) => {
  if (data.ok) {
    console.log(data)
    this.pNOmbre = data.response[0].pNombre
    this.pSNombre = data.response[0].pSNombre
    this.PApellido = data.response[0].pPApellido
    this.pSApellido = data.response[0].pSApellido
    this.pDireccion = data.response[0].pDireccion
    this.pNoDPI = data.response[0].pNoDPI
    this.pNoTelefono = data.response[0].pNoTelefono
  }
});

console.log(this.tipmes)
    const gen = await this.Admin.getViajesPilotoId(this.id,this.tipmes).toPromise();
    this.Viajes = gen.response;
    console.log(this.Viajes)

    if (Array.isArray(this.Viajes)) {
      const tabla = document.querySelector('#tabla-body') as HTMLTableSectionElement;

      // Limpia el contenido anterior de la tabla
      while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
      }

      // Itera a través de los objetos en 'data.response' y crea filas en la tabla
      this.Viajes.forEach((item: any) => {
        const row = tabla.insertRow();
        row.insertCell(0).textContent = item.pNoEntrega;
        row.insertCell(1).textContent = item.pCodigoUnidad;
        row.insertCell(2).textContent = item.pDepartamento;
        row.insertCell(3).textContent = item.pMunicipio;
        row.insertCell(4).textContent = item.pDiaEntrega;
        row.insertCell(5).textContent = item.pLugarEntrega;
        row.insertCell(6).textContent = item.pNombreSocio;
        row.insertCell(7).textContent = item.pObservaciones;
        row.insertCell(8).textContent = item.pFechaEntrego;
        row.insertCell(9).textContent = item.pUsuario;


      });
    } else {
      console.error('Los datos no son un array');
    }

  }

  regresar(){
    this.router.navigate(['/genera-pdf']);
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
        pdf.save('ViajesPilotos.pdf');
      });
    } else {
      console.error("El elemento con ID 'pdfcomponent' no fue encontrado.");
    }
  }
  generateExcel() {
  // Crea un nuevo libro de trabajo
  const wb = XLSX.utils.book_new();

  // Define un estilo para el encabezado
  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: 'center' },
  };

  // Agrega una hoja de cálculo al libro de trabajo
  const ws = XLSX.utils.aoa_to_sheet([
    // Encabezado
    [{ v: 'Reporte de Viajes por Piloto', s: headerStyle }],
    [{ v: 'Transportes Jaguares', s: headerStyle }],
    // Deja una fila en blanco
    [],
    // Datos del piloto
    ['Nombre del Piloto', this.pNOmbre, this.pSNombre, this.PApellido, this.pSApellido],
    ['Dirección', this.pDireccion],
    ['Número de Identificación', this.pNoDPI],
    ['Número Teléfono', this.pNoTelefono],
    // Deja dos filas en blanco
    [],
    [],
    // Datos de la tabla
    [
      'No.Entrega',
      'Unidad',
      'Departamento',
      'Municipio',
      'Día',
      'Lugar',
      'Socio',
      'Observaciones',
      'Fecha',
      'Usuario',
    ],
    // Itera a través de los datos y agrégalos a la hoja de cálculo
    ...this.Viajes.map((item) => [
      item.pNoEntrega,
      item.pCodigoUnidad,
      item.pDepartamento,
      item.pMunicipio,
      item.pDiaEntrega,
      item.pLugarEntrega,
      item.pNombreSocio,
      item.pObservaciones,
      item.pFechaEntrego,
      item.pUsuario,
    ]),
  ]);

  // Agrega la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(wb, ws, 'ViajesPiloto');

  // Crea un archivo Excel binario
  const excelBuffer: any = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
  });

  // Guarda el archivo Excel
  this.saveExcelFile(excelBuffer, 'ViajesPilotos.xlsx');
}

// Función para guardar el archivo Excel
saveExcelFile(buffer: any, fileName: string) {
  const data: Blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(data);
  a.download = fileName;
  a.click();
}
}



