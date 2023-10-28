import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminiPilotosService {
  private apiUrl = `${environment.API_URL}Pilotos/`;


  constructor(private http: HttpClient) {}
  guardarPiloto(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarPiloto`, JSON.stringify(form), { headers });
  }
  getPilotos():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listaPilotos');
}
getPilotosAct():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'listaPilotosActivos');
}
getSocioID(id:number) {
  return this.http.get<any>(this.apiUrl + 'ListarPilotXId?IdPiloto=' + id);
}
getViajesPilotoId(id:number,Mes:number) {
  return this.http.get<any>(this.apiUrl + 'ListaViajesXPiloto?IdPiloto=' + id+'&TipMes='+Mes);
}
AcutalizarPiloto(form:any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(`${this.apiUrl}ActualizarPiloto`, JSON.stringify(form), { headers });
}

cambiarEstadPiloto(IdPiloto: number, IdUser: string |null|undefined): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(this.apiUrl + 'CambiarEstadoPiloto?IdPiloto='+IdPiloto+'&IdUsuario='+IdUser, JSON.stringify, { headers });
}

topPilotos():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'ListaPilotosViajes');
}
}
