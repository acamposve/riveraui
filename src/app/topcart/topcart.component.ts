import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pos, Product } from '@app/_models';
import { PosService, ProductService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-topcart',
  templateUrl: './topcart.component.html',
  styleUrls: ['./topcart.component.less']
})
export class TopcartComponent implements OnInit {
  loading = false;
  timeout: any = null;
  pos: Pos[];
  products: Product[];
  @ViewChild('searchParam') searchParam: ElementRef;

  constructor(    private posService: PosService,    private productService: ProductService,) { }

  ngOnInit(): void {
    this.productService
    .getAll()
    .pipe(first())
    .subscribe((products) => {
      this.loading = false;
      this.products = products;
    });
  }

  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 1000);
  }
  public onOptionsSelected(event) {
    const value = event.target.value;
  }
  private executeListing(value: string) {
    console.log('value');
    console.log(value);
    console.log('value2');
    console.log(this.searchParam.nativeElement.value);
    this.posService.create(value).subscribe(async (data: boolean) => {
      if (data) {
        console.log('refresh');
        this.pos = await this.posService
          .getAll()
          .pipe(first())
          .subscribe((pos) => {
            this.loading = false;
            this.pos = pos;
            console.log(pos);
          });
      }
    });
  }
}
