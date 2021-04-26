import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/model/user.interface';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(take(1))
      .subscribe(params => {
        const id = params.get('id');

        if (id) {
          this.user$ = this.store.getUser$(id);
        }

      });

    this.user$.subscribe(response => {
      this.userForm.setValue(response);
    })
  }
}
