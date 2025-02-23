import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:8090/api/empleados'; 

  constructor(private http: HttpClient) { }

  listarEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearEmpleado(request: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obtenerEmpleadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  editarEmpleado(id: number, request: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, request);
  }
}
