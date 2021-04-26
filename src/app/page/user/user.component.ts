import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/model/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$: Observable<IUser> = new Observable();
  userForm = this.fb.group({
    id: [''],
    userId: [''],
    name: [''],
    lastName: [''],
    photoURL: [''],
    data: [''],
  });
  photoURL: string = '';
  id: string | null | undefined = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: StoreService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(take(1))
      .subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          if (this.id !== 'new') {
            this.user$ = this.api.getUser(this.id);
            this.user$
              .pipe(take(1))
              .subscribe(response => {
                this.init(response);
              })
          }
        }
      });
  }

  submitHandler() {
    if (this.id && this.id === 'new') {
      const payload = {...this.userForm.value}
      delete payload.id;
      this.api.createUser(payload)
        .pipe(take(1))
        .subscribe(response => {
          this.init(response);
        })
    } else {
      this.api.updateUser(this.userForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.init(response);
        });
    }
  }

  private init(data: IUser) {
    this.userForm.setValue(data);
    this.photoURL = data.photoURL || '';
  }
}
