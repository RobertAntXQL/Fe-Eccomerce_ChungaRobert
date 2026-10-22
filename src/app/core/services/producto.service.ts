import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Producto } from '../../models/producto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = `${environment.apiUrl}/api/productos`;

  private getHeaders() {
    const token = this.authService.getToken();
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL, this.getHeaders());
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto, this.getHeaders());
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${id}`, producto, this.getHeaders());
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, this.getHeaders());
  }
}