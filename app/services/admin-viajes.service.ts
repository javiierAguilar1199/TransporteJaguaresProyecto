import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminViajesService {

  private apiUrl = `${environment.API_URL}Bitacora/`;
  constructor(private http: HttpClient) {}

  guardarViaje(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarBitacora`, JSON.stringify(form), { headers });
  }

  ActualizarViaje(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}ActualizarBitacora`, JSON.stringify(form), { headers });
  }

  getViajesAct():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listarBitacoraViajes');
  }

  cambiarEstadoViaje(IdBitacora: number, IdUser: string |null|undefined): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'CambiarEstadoBitacora?IdBitacora='+IdBitacora+'&IdUsuario='+IdUser, JSON.stringify, { headers });
  }

  getBitacoraID(id:number) {
    return this.http.get<any>(this.apiUrl + 'ListarBitacoraViajeXID?IdBitacora=' + id);
  }
}
