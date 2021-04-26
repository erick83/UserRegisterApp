import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:44319';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get(this.baseUrl + '/api/User') as Observable<IUser[]>;
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get(this.baseUrl + '/api/User/' + id) as Observable<IUser>;
  }

  createUser(user: IUser) {
    return this.http.post(this.baseUrl + '/api/User', user) as Observable<IUser>;
  }

  updateUser(user: IUser) {
    return this.http.put(this.baseUrl + '/api/User/' + user.id, user) as Observable<IUser>;
  }

  deleteUser(id: number): Observable<IUser[]> {
    return this.http.delete(this.baseUrl + '/api/User/' + id) as Observable<IUser[]>;
  }
}
