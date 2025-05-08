import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar las respuestas asíncronas

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Reemplaza con la URL base de tu API

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Asume que tu endpoint de login es '/api/login' y espera un objeto con 'email' y 'password'
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    // Asume que tu endpoint de registro es '/api/register' y espera un objeto con 'nombre', 'email' y 'password'
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

}
