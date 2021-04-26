import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<IUser[]> = new Observable();
  displayedColumns: string[] = ['id', 'name', 'lastName', 'data'];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.users$ = this.apiService.getUsers();
  }
}
