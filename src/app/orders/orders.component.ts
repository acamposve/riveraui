import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '@app/_models';
import { OrderService } from '@app/_services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'qty',
    'total',
    'due',
    'payBy',
    'order_date',
    'order_time',
    'acciones',
  ];

  orders: Order[];
  //dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new UserDataSource(this.orderService);

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}
}

export class UserDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }
  connect(): Observable<Order[]> {
    return this.orderService.getAll();
  }
  disconnect() {}
}
