import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from '@app/_models';
import { OrderDetailService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less'],
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'product_quantity',
    'product_price',
    'sub_total',
    'product_name',
  ];

  orderDetails: OrderDetail[];
  id!: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new OrderDetailDataSource(this.orderDetailService, this.route.snapshot.params['id']);
  constructor(
    private orderDetailService: OrderDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
}

export class OrderDetailDataSource extends DataSource<any> {

  constructor(
    private orderDetailService: OrderDetailService,
    private id: string
  ) {
    super();
  }
  connect(): Observable<OrderDetail[]> {
    return this.orderDetailService.getById(this.id);
  }
  disconnect() {}
}
