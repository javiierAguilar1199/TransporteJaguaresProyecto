import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminHorariosService {

  private apiUrl = `${environment.API_URL}Horarios/`;


  constructor(private http: HttpClient) {}
  guardarHorario(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarHorario`, JSON.stringify(form), { headers });
  }
  actualizarHorario(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}ActualizarHorario`, JSON.stringify(form), { headers });
  }

  cambiarEstadoHorario(IdHorario: number, IdUser: string |null|undefined): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'CambiarEstadoHorario?IdHorario='+IdHorario+'&IdUsuario='+IdUser, JSON.stringify, { headers });
  }

  getHoraraiosAct():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listarHorarios');
  }
  getHorarioId(id:number) {
    return this.http.get<any>(this.apiUrl + 'ListarHorariosXID?IdHorario=' + id);
  }

}
