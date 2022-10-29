import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Product } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    }

    getProductsByCat() {
      return this.http.get<Product[]>(`${environment.apiUrl}/productsbycat`);
  }
}
