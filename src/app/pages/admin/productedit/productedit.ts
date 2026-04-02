import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProduct } from '../../../interface/product';
// import { ProductService } from '../services/product';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-productedit',
  imports: [FormsModule, NzButtonModule, NzInputModule, NzFormModule, RouterLink, ReactiveFormsModule],
  templateUrl: './productedit.html',
  styleUrl: './productedit.css',
})
export class Productedit {
  // productService = inject(ProductService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  product: IProduct = {} as IProduct
  changdt = inject(ChangeDetectorRef)
  message = inject(NzMessageService);
  http = inject(HttpClient)
  productform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl<null | number>(null, [Validators.required, Validators.min(100)]),
    image: new FormControl('', [Validators.required])
  })
  id = this.route.snapshot.params['id']
  async ngOnInit() {
   
    this.http.get<IProduct>(`http://localhost:3000/products/${this.id}`).subscribe({
      next: (data) => {
        this.productform.controls.name.setValue(data.name)
        this.productform.controls.image.setValue(data.image)
        this.productform.controls.price.setValue(data.price)
        this.productform.controls.category.setValue(data.category)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  onclick() {
    if (!this.productform.valid) {
      this.productform.markAllAsTouched()
      this.message.error("thong tin can nhap day du")
      return
    }
    const data = this.productform.value;

    this.http.put(`http://localhost:3000/products/${this.id}`, data).subscribe({
      next: (data) => {
        this.productform.reset();
        this.router.navigate(['/admin/products']);
        this.message.success("sua thanh cong")
      },
      error: (err) => {
        console.log("Lỗi", err);
        this.message.error("sua that bai")
      }
    })
  }
}
