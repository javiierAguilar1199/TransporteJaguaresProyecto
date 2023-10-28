import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuariosService {
  private apiUrl = `${environment.API_URL}Usuario/`;


  constructor(private http: HttpClient) {}
  getUsuarios():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listaUsuarioActivo');
}

cambiarEstadUsuario(IdUsuario: string, IdUser: string |null|undefined): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(this.apiUrl + 'CambiarEstadoUsuario?IdUsuario='+IdUsuario+'&IdUsuarioModifi='+IdUser, JSON.stringify, { headers });
}

  guardarUsuario(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}RegistrarUsuario`, JSON.stringify(form), { headers });
  }
  actualizarUSuario(form:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}ActualizarUsuario`, JSON.stringify(form), { headers });
  }
  deleteUsr(IdUsuario: string, UsuarioModificacion: string |null|undefined): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'CambiarEstadoUsuario?IdUsuario='+IdUsuario+'&UsuarioModificacion='+UsuarioModificacion, JSON.stringify, { headers });
  }
  getUsuarioId(id:string) {
    return this.http.get<any>(this.apiUrl + 'ListarUsuariosXId?IdUsuario=' +id );
  }
}
