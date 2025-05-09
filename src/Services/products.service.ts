import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL ="https://fakestoreapi.com/products"
  constructor(private myHttpClient:HttpClient) { }

  getAllProducts(){
    return this.myHttpClient.get(this.URL)
  }
  getProductById(PId:any){
    return this.myHttpClient.get(`${this.URL}/${PId}`)
  }
}
