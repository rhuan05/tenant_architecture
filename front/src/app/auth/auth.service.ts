import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/signup';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: string, senha: string): Observable<any>{
    return this.http.post<any>(this.apiUrl, { usuario, senha })
  }
}
