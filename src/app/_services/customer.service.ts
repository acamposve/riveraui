import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Customer } from '@app/_models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class CustomerService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
    }


}
