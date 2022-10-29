import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Order, Pos } from '@app/_models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = `${environment.apiUrl}/pos`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Order[]>(`${environment.apiUrl}/order`);
}


  public create(customer_id: string, pay: string,  payBy: string): Observable<object> {
    const apiUrl: string = `${environment.apiUrl}/order`;

    return this.http.post<any>(`${environment.apiUrl}/order`, { customer_id, pay, payBy});
  }

}
