import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Product } from '../app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly FAKE_API_URL = "https://fakestoreapi.com/products";
  private readonly LOCAL_JSON_URL = "http://localhost:3000/products"; // json-server

  constructor(private http: HttpClient) {}

  /** 🔹 Combines remote + local products */
  getAllCombinedProducts(): Observable<Product[]> {
    return forkJoin([
      this.http.get<Product[]>(this.FAKE_API_URL),
      this.http.get<Product[]>(this.LOCAL_JSON_URL)
    ]).pipe(
      map(([fakeApi, localJson]) => {
        const localProducts = localJson.map(p => ({ ...p, source: 'local' }));
        const remoteProducts = fakeApi.map(p => ({ ...p, source: 'remote' }));
        return [...localProducts, ...remoteProducts];
      })
    );
  }

  /** 🔹 Local-only methods */
  getLocalProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.LOCAL_JSON_URL);
  }

  getLocalProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.LOCAL_JSON_URL}/${id}`);
  }

  deleteLocalProduct(id: number): Observable<any> {
    return this.http.delete(`${this.LOCAL_JSON_URL}/${id}`);
  }

  updateLocalProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.LOCAL_JSON_URL}/${id}`, product);
  }

  /** 🔹 Remote-only methods */
  getFakeProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.FAKE_API_URL);
  }

  getFakeProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.FAKE_API_URL}/${id}`);
  }
}
