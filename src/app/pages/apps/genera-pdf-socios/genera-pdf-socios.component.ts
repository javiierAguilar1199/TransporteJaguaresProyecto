import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';

@Component({
  selector: 'app-genera-pdf-socios',
  templateUrl: './genera-pdf-socios.component.html',
  styleUrls: ['./genera-pdf-socios.component.scss']
})
export class GeneraPdfSociosComponent {
  form: FormGroup;
  public IdPiloto: number| undefined | null = null;
  public Usuario: string | undefined | null = null;
  public socios: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private Router:Router,
    private AuthServiceService:AuthServiceService,
    private admi:AdminSociosServiceService) {

    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;


    })
    this.form = this.formBuilder.group({
      pIdSocio: ['', Validators.required],
      tipoMes: [null, Validators.required],
    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }

   async ngOnInit() {
    const gen = await this.admi.getSocios().toPromise();
    this.socios = gen.response
  }

  onSubmit() {
    const pIdSociovalue = this.form.get('pIdSocio')?.value;
    const pMes = this.form.get('tipoMes')?.value;
    this.Router.navigate(['/pdf', pIdSociovalue,pMes ])
  }
  regresar(){
    this.Router.navigate(['/lista-sociso']);
  }
}
