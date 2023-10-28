import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lista } from 'src/models/listas.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private apiUrl = `${environment.API_URL}Catalogo/`;

  constructor(private http: HttpClient) { }
  getDepartamento(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'ListDeptos');
  }
  getMunicipio(departamento: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'ListarMunicipio?departamento=' + departamento);
  }
  getMarca(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listaMarcas');
  }
  getUsrOrgani(IdUsur: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'UsuarioOrganizacion?IdUsuario=' + IdUsur);
  }
  getInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'ListaOperacion');
  }

  getViajesDetpto(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'ListaViajesDetpt');
  }

  getRolUsr(IdUsur: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'UsuarioRoles?IdUsuario=' + IdUsur);
  }
  getRoles(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'listaRoles');
  }
}
