import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(params): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(environment.apiUrl + '/auth/login', params);
  }

  logout(): Observable<void>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authKey'));
    return this.http.get<void>(environment.apiUrl + '/auth/logout', { headers });
  }

  signup(params): Observable<AuthResponse>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<AuthResponse>(environment.apiUrl + '/auth/signup', params, {headers});
  }
}
