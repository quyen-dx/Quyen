import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICategory, IProduct } from '../../interface/all';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Categoryuser {
  isOpen = false;

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  route = inject(ActivatedRoute)
  http = inject(HttpClient)
  products: IProduct[] = []
  category: ICategory | null = null
  chan = inject(ChangeDetectorRef)
  router = inject(Router)
  categories: ICategory[] = []
  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
      this.router.navigate(['/category', value])
    } else {
      this.router.navigate(['/category'])
    }

  }
  ngOnInit() {
    this.http.get<ICategory[]>(`http://localhost:3000/categories`).subscribe({
      next: (data) => {
        this.categories = data
        this.chan.markForCheck()
      }
    })
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.http.get<ICategory>(`http://localhost:3000/categories/${id}`).subscribe({
          next: (data) => {
            this.category = data
            this.chan.markForCheck()
          }
        }),
          this.http.get<IProduct[]>(`http://localhost:3000/products?categoryId=${id}&_expand=category`).subscribe({
            next: (data) => {
              this.products = data
              this.chan.markForCheck()
            }
          })
      } else {
        this.http.get<IProduct[]>(`http://localhost:3000/products?_expand=category`).subscribe({
          next: (data) => {
            this.products = data
            this.chan.markForCheck()
          }
        })
      }


    })
  }
}