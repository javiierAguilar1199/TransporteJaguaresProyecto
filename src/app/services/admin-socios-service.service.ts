import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lista } from 'src/models/listas.model';
@Injectable({
  providedIn: 'root'
})
export class AdminSociosServiceService {
  private apiUrl = `${environment.API_URL}Socios/`;


  constructor(private http: HttpClient) {}
  guardarSocio(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarSocio`, JSON.stringify(form), { headers });
  }
  getSocios():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listaSocios');
}
getSociosActivos():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'listaSociosActivos');
}

actualizarSocio(form:any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(`${this.apiUrl}ActualizarSocios`, JSON.stringify(form), { headers });
}
getSocioID(id:number) {
  return this.http.get<any>(this.apiUrl + 'ListarSocioXId?IdSocio=' + id);
}

deleteSoCIO(IdSocio: number, IdUser: string |null|undefined): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(this.apiUrl + 'CambiarEstadoSocio?IdSocio='+IdSocio+'&IdUsuario='+IdUser, JSON.stringify, { headers });
}
getViajesSocio(id:number,tipoMes:number) {
  return this.http.get<any>(this.apiUrl + 'ListaViajesXSocio?IdSocio=' + id+'&TipMes='+tipoMes);

}
topSocios():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'CantidadViajeXSocio');
}

}

