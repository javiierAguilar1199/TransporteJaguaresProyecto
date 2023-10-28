import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUnidadesService {

  private apiUrl = `${environment.API_URL}Unidades/`;


  constructor(private http: HttpClient) {}
  guardarUnidad(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarUnidad`, JSON.stringify(form), { headers });
  }
  actualizarUnidad(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}ActualizarUnidad`, JSON.stringify(form), { headers });
  }

  cambiarEstadoUnidad(IdUnidad: number, IdUser: string |null|undefined): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'CambiarEstadoUnidad?IdUnidad='+IdUnidad+'&IdUsuario='+IdUser, JSON.stringify, { headers });
  }

  getUnidades(id:number):Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listarUnidades?IdSocio='+id);
}
getUnidadXID(id:number) {
  return this.http.get<any>(this.apiUrl + 'ListarUnidadesXId?IdUnidad=' + id);
}

getUnidadesAct():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'listarUnidadesActivas');
}
getUnidadViajes(id:number,Mes:number) {
  return this.http.get<any>(this.apiUrl + 'ListaViajesUnidad?IdUnidad=' + id+'&TipMes='+Mes);
}
TopUnidades():Observable<any> {
  return this.http.get<any>(this.apiUrl + 'ListaCantidadViajeUnidad');
}

}
