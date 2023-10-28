import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';

@Component({
  selector: 'app-genera-pdf',
  templateUrl: './genera-pdf.component.html',
  styleUrls: ['./genera-pdf.component.scss']
})
export class GeneraPDFComponent {
  form: FormGroup;
  public IdPiloto: number| undefined | null = null;
  public Usuario: string | undefined | null = null;
  public pilotos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private Router:Router,
    private AuthServiceService:AuthServiceService,
    private admi:AdminiPilotosService) {
    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;


    })
    this.form = this.formBuilder.group({
      pIdPiloto: ['', Validators.required],
      tipoMes: [null, Validators.required],
    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }

   async ngOnInit() {
    const gen = await this.admi.getPilotos().toPromise();
    this.pilotos = gen.response
  }

  onSubmit() {
    const pIdPilotoValue = this.form.get('pIdPiloto')?.value;
    const pMes = this.form.get('tipoMes')?.value;

    this.Router.navigate(['/pdf-socio', pIdPilotoValue, pMes])
  }
  regresar(){
    this.Router.navigate(['/lista-pilotos']);
  }
}
