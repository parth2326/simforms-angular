import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/PaginatedResponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authKey') );
    return this.http.get<User[]>(environment.apiUrl + '/users', {headers});
  }

  searchUsers(params): Observable<PaginatedResponse<User[]>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authKey') );
    return this.http.post<PaginatedResponse<User[]>>(environment.apiUrl + '/users/search', params, {headers});
  }

  update(userId, params): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authKey') );
    return this.http.put<User>(environment.apiUrl + '/users/' + userId, params, {headers});
  }

  updateStatus(userId, params): Observable<User>{
    return this.http.put<User>(environment.apiUrl + '/users/status/' + userId, params);
  }
}
