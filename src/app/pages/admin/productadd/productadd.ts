import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-productadd',
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzButtonModule, NzInputModule],
  templateUrl: './productadd.html',
  styleUrl: './productadd.css',
})

export class Productadd {
  http = inject(HttpClient)
  router = inject(Router)
  message = inject(NzMessageService)
  productform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(100)]),
    image: new FormControl('', [Validators.required])
  })
  onclick() {
    if (!this.productform.valid) {
      this.productform.markAllAsTouched()
      this.message.error("thong tin can nhap day du")
      return
    }
    const data = this.productform.value;
    this.http.post("http://localhost:3000/products", data).subscribe({
      next: () => {
        this.productform.reset();
        this.router.navigate(['/admin/products']);
        this.message.success("them thanh cong")
      },
      error: (err) => {
        console.log("Lỗi", err);
        this.message.error("them that bai")
      }
    })
  }
}
