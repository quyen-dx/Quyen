import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule, } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProduct } from '../../../interface/all';
import { log } from 'console';


@Component({
  selector: 'app-categoriesadd',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './categoryedit.html',
  styleUrl: './categoryedit.css',
})
export class Categoryedit {
  http = inject(HttpClient)
  router = inject(Router)
  message = inject(NzMessageService)
  route = inject(ActivatedRoute)

  categoryform = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
  id = this.route.snapshot.params['id']
  ngOnInit() {
    this.http.get<IProduct>(`http://localhost:3000/categories/${this.id}`).subscribe({
      next: (data) => {
        this.categoryform.controls.name.setValue(data.name)
      },
      error:(err) =>{
        this.message.error("sua that bai")
        console.log(err)
      }
    })
  }
  edit() {
    const data = this.categoryform.value
    this.http.put(`http://localhost:3000/categories/${this.id}`, data).subscribe({
      next: () => {
        this.message.success("sua thanh cong")
        this.router.navigate(["admin/category"])
      }, error: (err) => {
        console.log(err)
        this.message.error("sua that bai")
      }
    })
  }
}
