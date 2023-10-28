import { Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {

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

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
   private router:Router,
    private Admin: AdminiPilotosService,
    private admiSocios:AdminSociosServiceService
    ) { }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.tipmes =+params['tipoMes'];

    });

this.admiSocios.getSocioID(this.id).subscribe((data) => {
  if (data.ok) {

    this.pNOmbre = data.response[0].pNombre
    this.pSNombre = data.response[0].pSNombre
    this.PApellido = data.response[0].pPApellido
    this.pSApellido = data.response[0].pSApellido
    this.pDireccion = data.response[0].pDireccion
    this.pNoDPI = data.response[0].pNoDPI
    this.pNoTelefono = data.response[0].pNoTelefono
  }
});


    const gen = await this.admiSocios.getViajesSocio(this.id,  this.tipmes).toPromise();
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
        row.insertCell(6).textContent = item.pNombrePiloto;
        row.insertCell(7).textContent = item.pObservaciones;
        row.insertCell(8).textContent = item.pFechaEntrego;
        row.insertCell(9).textContent = item.pUsuario;


      });
    } else {
      console.error('Los datos no son un array');
    }

  }

  regresar(){
    this.router.navigate(['/genera-pdf-socios']);
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
        pdf.save('ViajesDeSocios.pdf');
      });
    } else {
      console.error("El elemento con ID 'pdfcomponent' no fue encontrado.");
    }
  }
}

