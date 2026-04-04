import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICategory } from '../../../interface/all';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productadd',
  imports: [FormsModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule,NgFor],
  templateUrl: './productadd.html',
  styleUrl: './productadd.css',
})
export class Productadd {
  router = inject(Router)
  http = inject(HttpClient)
  message = inject(NzMessageService)
  category: ICategory[] = []
  chan = inject(ChangeDetectorRef)
  productform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(50000)]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required])
  })
  ngOnInit() {
    this.http.get<ICategory[]>("http://localhost:3000/categories").subscribe({
      next: (data) => {
        this.category = data
        this.chan.markForCheck()
      },
      error:(err) =>{
        console.log(err);
        this.message.error("lay category loi")
      }
    })
  }

  add() {
    if (!this.productform.valid) {
      this.productform.markAllAsTouched()
      this.message.error("thong tin can nhap day du")
      return
    }
    const data = this.productform.value

    this.http.post("http://localhost:3000/products", data).subscribe({
      next: () => {
        this.message.success("them thanh cong")
        this.router.navigate(["admin/product"])
      },
      error: (err) => {
        console.log(err)
        this.message.error("them thât bai")
      }
    })
  }
}
