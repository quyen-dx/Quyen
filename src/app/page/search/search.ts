import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../interface/all';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  route = inject(ActivatedRoute)
  http = inject(HttpClient)
  products: IProduct[] = []
  chan = inject(ChangeDetectorRef)
  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      const q = params['q']
      if(q){
        this.http.get<IProduct[]>(`http://localhost:3000/products?name_like=${q}&_expand=category`).subscribe({
          next:(data) =>{
            this.products = data
            this.chan.markForCheck()
          }
        })
      }
    })
  }
}
