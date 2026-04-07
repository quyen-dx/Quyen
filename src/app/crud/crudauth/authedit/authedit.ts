import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormItemComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IUser } from '../../../interface/all';
@Component({
  selector: 'app-register',
  imports: [NzFormItemComponent, NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule, NzSelectModule, FormsModule],
  templateUrl: './authedit.html',
  styleUrl: './authedit.css',
})
export class Authedit {
  useform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  })
  message = inject(NzMessageService)
  http = inject(HttpClient)
  router = inject(Router)
  users: IUser[] = []
  route = inject(ActivatedRoute)
  id = this.route.snapshot.params['id']

  ngOnInit(){
    this.http.get<IUser>(`http://localhost:3000/users/${this.id}`).subscribe({
      next:(data) =>{
        this.useform.controls.name.setValue(data.name),
        this.useform.controls.email.setValue(data.email),
        this.useform.controls.password.setValue(data.password),
        this.useform.controls.role.setValue(data.role)
      }
    })
  }
  onSubmit() {
    if (!this.useform.valid) {
      this.useform.markAsTouched()
      this.message.error("nhap day du thong tin")
      return
    }
    const userdata = this.useform.value
    this.http.put(`http://localhost:3000/users/${this.id}`, userdata).subscribe({
      next: () => {
        this.message.success(' sua thanh cong')
        this.router.navigate(['/admin/auth'])
      },
      error: (err) => {
        console.log(err)
        this.message.error("sua that bai")
      }
    })
  }
}
