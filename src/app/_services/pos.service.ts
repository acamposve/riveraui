import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Pos } from '@app/_models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PosService {
  private url = `${environment.apiUrl}/pos`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Pos[]>(`${environment.apiUrl}/pos`);
  }

  public createbyid(product_id: string): Observable<object> {
    console.log('valor del productos');
    console.log(product_id);
    const apiUrl: string = `${environment.apiUrl}/pos`;

    return this.http.post<Pos[]>(`${environment.apiUrl}/pos`, { product_id });
  }



  public create(searchParam: string): Observable<object> {
    console.log('sku code');
    console.log(searchParam);
    const apiUrl: string = `${environment.apiUrl}/pos`;

    return this.http.post<Pos[]>(`${environment.apiUrl}/pos`, { searchParam });
  }

  public increment(id: string, quantity: string) {
    const apiUrl: string = `${environment.apiUrl}/pos`;

    return this.http.post<any>(`${environment.apiUrl}/pos/increment`, {
      id,
      quantity,
    });
  }

  public delete(id: string) {
    console.log(this.url + '/' + id);
    return this.http.delete(this.url + '/' + id);
  }

  public change_price(id: string, price: string) {
    console.log('id en servicio');
    console.log(id);
    console.log('precio en servicio');
    console.log(price);
    const apiUrl: string = `${environment.apiUrl}/pos`;

    return this.http.post<any>(`${environment.apiUrl}/pos/change_price`, {
      id,
      price,
    });
  }
}
