import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../../interface/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient)
  api = 'http://localhost:3000/products'
  
  getAll() {
    return this.http.get<IProduct[]>(this.api)
  }
  add(data:  Omit<IProduct,'id'>): Observable<IProduct>{
    return this.http.post<IProduct>(this.api,data)
  }
  delete(id: number | string): Observable<void>{
    return this.http.delete<void>(`${this.api}/${id}`)
  }
  update(id: number | number, data: IProduct): Observable<IProduct>{
    return this.http.put<IProduct>(`${this.api}/${id}`,data)
  }
}
