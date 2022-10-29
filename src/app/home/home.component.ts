import { Component, ElementRef, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { Customer, Pos, Product } from '@app/_models';
import {
  CustomerService,
  OrderService,
  PosService,
  ProductService,
} from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  orderForm: FormGroup;

  submitted = false;

  timeout: any = null;
  loading = false;
  products: Product[];
  productscat: Product[];
  pos: Pos[];
  customers: Customer[];
  @ViewChild('searchParam') searchParam: ElementRef;
  @ViewChild('product_quantity') product_quantity: ElementRef;
  @ViewChild('product_price') product_price: ElementRef;
  @ViewChild('pay') pay: ElementRef;
  @ViewChild('totalvalor', { read: ElementRef, static: false }) totalvalor: ElementRef;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private posService: PosService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  public total = 0;
  public deuda = 0;
  public quantity = 0;
  private value;

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      customer_id: ['', Validators.required],
      pay: ['', Validators.required],

      payBy: ['', Validators.required],
    });

    // convenience getter for easy access to form fields

    this.loading = true;
    this.cargarCarrito();
    this.cargarClientes();

    this.productService
      .getAll()
      .pipe(first())
      .subscribe((products) => {
        this.loading = false;
        this.products = products;
      });

    // this.productService
    //   .getProductsByCat()
    //   .pipe(first())
    //   .subscribe((productscat) => {
    //     this.loading = false;
    //     this.productscat = productscat;
    //   });
  }
  get f() {
    return this.orderForm.controls;
  }
  cargarCarrito() {
    this.posService
      .getAll()
      .pipe(first())
      .subscribe((pos) => {
        this.loading = false;
        this.pos = pos;

        this.findsum(this.pos);
      });
  }

  cargarClientes() {
    this.customerService
      .getAll()
      .pipe(first())
      .subscribe((customers) => {
        this.loading = false;
        this.customers = customers;
      });
  }

  findsum(data) {
    this.total = 0;
    this.quantity = 0;
    this.value = data;

    for (let j = 0; j < data.length; j++) {
      const subt = this.value[j].sub_total;
      const sqty = this.value[j].product_quantity;
      const numsubt = Number(subt);
      const numqty = Number(sqty);
      this.total += numsubt;
      this.quantity += numqty;
    }
  }

  public deleteItem(id) {
    this.posService.delete(id).subscribe((response) => {
      this.pos = this.pos.filter((item) => item.id !== id);
    });
    this.cargarCarrito();
  }

  public incrementProduct(productid, quantity) {
    this.posService
      .increment(productid, quantity)
      .pipe(first())
      .subscribe((pos) => {
        this.loading = false;
        this.pos = pos;
      });
    this.cargarCarrito();
  }

  public onOptionsSelected(event) {
    var $this = this;
    const value = event.target.value;
    $this.executeListing(event.target.value);
    console.log(value);
  }

  public onKeySearch(event: any) {
    console.log("ejecuto");
    console.log(event.target.value);
    console.log("ejecuto");
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {

      $this.executeListing2(event.target.value);
      event.target.value = "";
    }, 1000);
  }

  public onKeySearch2(event: any, id: string) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeIncrement(id, event.target.value);
      }
    }, 1000);
  }

  public onKeySearch3(event: any, id: string) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.changePrice(id, event.target.value);
      }
    }, 1000);
  }

  private changePrice(id: string, value: string) {
    this.posService.change_price(id, value).subscribe(async (data: boolean) => {
      if (data) {
        this.cargarCarrito();
      }
    });
  }

  private executeIncrement(id: string, value: string) {
    this.posService.increment(id, value).subscribe(async (data: boolean) => {
      if (data) {
        this.cargarCarrito();
      }
    });
  }

  private executeListing2(searchParam: string) {
    console.log("executeListing2");
    console.log(searchParam);
    console.log("executeListing2");
    this.posService.create(searchParam).subscribe(async (data: Pos[]) => {
      if (data) {
        this.cargarCarrito();
      }
    });

  }

  private executeListing(value: string) {

    this.posService.createbyid(value).subscribe(async (data: Pos[]) => {
      if (data) {
        this.cargarCarrito();
      }
    });

  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.orderForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log("invalid datra");
    console.log(invalid);
    return invalid;
  }

  setDebt(event: any, total: number) {
    console.log('pay: ', total);
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        if (total > event.target.value) {
          this.deuda = total - event.target.value;

          Swal.fire('Queda una deuda de ' + this.deuda + ' pesos');
          console.log('deuda: ', total - event.target.value);
        } else {
          this.deuda = event.target.value - total;
          Swal.fire('Debe devolver ' + this.deuda + ' pesos');

          console.log('deuda: ', "no hay deuda");
        }

      }
    }, 1000);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      this.findInvalidControls();

      return;
    }

    this.loading = true;

    this.orderService
      .create(
        this.f.customer_id.value,
        this.f.pay.value,
        this.f.payBy.value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
    this.cargarCarrito();
    this.orderForm.reset();
    Swal.fire('Venta exitosa!');
  }
}
