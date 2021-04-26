import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private users$: Observable<IUser[]> | undefined;

  constructor(private api: ApiService) { }

  getUsers$(): Observable<IUser[]> {
    if (this.users$ === undefined) {
      this.users$ = this.api.getUsers();
      return this.users$;
    }
    return this.users$;
  }

  getUser$(id: string): Observable<IUser> {
    return this.api.getUser(id);
  }
}
