import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IUser } from '../../../interface/all';

@Component({
  selector: 'app-register',
  imports: [NzFormItemComponent, NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  useform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  message = inject(NzMessageService)
  http = inject(HttpClient)
  router = inject(Router)
  users: IUser[] = []
  onSubmit() {
    if (!this.useform.valid) {
      this.useform.markAsTouched()
      this.message.error("nhap day du thong tin")
      return
    }
    const userdata = this.useform.value
    this.http.post(`http://localhost:3000/login`, userdata).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('user', JSON.stringify(data.user))
        if (data.user.role === "admin") {
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate(['/'])
        }
      },
      error: (err) => {
        console.log(err)
        this.message.error("dang nhap khong thanh cong")
      }
    })
  }
}
