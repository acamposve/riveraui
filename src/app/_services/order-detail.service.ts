import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { OrderDetail } from '@app/_models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class OrderDetailService {
  private url = `${environment.apiUrl}/order-detail`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<OrderDetail[]>(`${environment.apiUrl}/order-detail/`);
  }

  getById(order_id: string,) {
    return this.http.get<OrderDetail[]>(`${environment.apiUrl}/order-detail/` + order_id);
  }

  public create(
    customer_id: string,
    pay: string,
    payBy: string
  ): Observable<object> {
    const apiUrl: string = `${environment.apiUrl}/order`;

    return this.http.post<any>(`${environment.apiUrl}/order`, {
      customer_id,
      pay,
      payBy,
    });
  }
}
