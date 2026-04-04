import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ICategory, IProduct } from '../../../interface/all';

@Component({
  selector: 'app-productadd',
  imports: [FormsModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule, NgFor],
  templateUrl: './productedit.html',
  styleUrl: './productedit.css',
})
export class Productedit {
  route = inject(ActivatedRoute)
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
  id = this.route.snapshot.params['id']
  ngOnInit() {
    this.http.get<ICategory[]>("http://localhost:3000/categories").subscribe({
      next: (data) => {
        this.category = data
        this.chan.markForCheck()
      }
    })
    this.http.get<IProduct>(`http://localhost:3000/products/${this.id}`).subscribe({
      next: (data) => {
        this.productform.controls.name.setValue(data.name),
          this.productform.controls.price.setValue(data.price),
          this.productform.controls.image.setValue(data.image),
          this.productform.controls.description.setValue(data.description),
          this.productform.controls.categoryId.setValue(data.categoryId)
      },
      error: (err) => {
        console.log(err);
        this.message.error("lay category loi")
      }
    })
  };


  add() {
    if (!this.productform.valid) {
      this.productform.markAllAsTouched()
      this.message.error("thong tin can nhap day du")
      return
    }
    const data = this.productform.value

    this.http.put(`http://localhost:3000/products/${this.id}`, data).subscribe({
      next: () => {
        this.message.success("sua thanh cong")
        this.router.navigate(["admin/product"])
      },
      error: (err) => {
        console.log(err)
        this.message.error("sua thât bai")
      }
    })
  }
}
