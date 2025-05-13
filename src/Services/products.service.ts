import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../app/interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly URL = "https://fakestoreapi.com/products";

  constructor(private myHttpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.myHttpClient.get<Product[]>(this.URL);
  }

  getProductById(PId: number): Observable<Product> {
    return this.myHttpClient.get<Product>(`${this.URL}/${PId}`);
  }
}