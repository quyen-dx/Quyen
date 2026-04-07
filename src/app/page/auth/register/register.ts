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
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  useform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user')
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
    this.http.post(`http://localhost:3000/register`, userdata).subscribe({
      next: () => {
        this.router.navigate(['/login'])
        this.message.success(' dang ki thanh cong')
      },
      error: (err) => {
        console.log(err)
        this.message.error("dang ki khong thanh cong")
      }
    })
  }
}
