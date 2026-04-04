import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule , } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-categoriesadd',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './categoryadd.html',
  styleUrl: './categoryadd.css',
})
export class Categoryadd {
  http = inject(HttpClient)
  router = inject(Router)
  message = inject(NzMessageService)


  categoryform = new FormGroup({
    name: new FormControl('',[Validators.required])
  })
  add(){
    if(!this.categoryform.valid){
      this.categoryform.markAllAsTouched()
      this.message.error("tat ca khong de trong")
      return
    }
    const data = this.categoryform.value
    this.http.post("http://localhost:3000/categories", data).subscribe({
      next:()=>{
        this.message.success("them thanh cong")
        this.router.navigate(["admin/category"])
      },error:(err) =>{
        console.log(err)
        this.message.error("them that bai")
      }
    })
  }
}
