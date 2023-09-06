import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'http://localhost:3000/products';
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.apiUrl).subscribe(data => {
      this.products$.next(data);
    });
    return this.products$;
  }

  create(prod: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, prod);
  }

  update(prod: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${prod.id}`, prod);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
