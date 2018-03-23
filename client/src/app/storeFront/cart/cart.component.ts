import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Cart } from "../store/cart.model";
import { CartItem } from "../store/cartItem.model";
import { Item } from '../../shop-items/shared/shop.model';
import { StoreService } from "../../services/store.service";

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  private cartList: Item[];
  private cartTotal: number;
  private finalAmout;

  constructor(private storeService: StoreService) { }

  ngOnInit() {


    var z = this.storeService.getCartData();
    z.snapshotChanges().subscribe( item => {


      this.cartList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.cartList.push(y as Item);

      });
      //console.log(this.cartList);
    });

    this.getTotal();

  }

  getTotal() {

    this.finalAmout = this.storeService.getCartTotal();

  }



  addScript: boolean = false;
  paypalLoad: boolean = true;



  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'Acgcwy06cbjc-QuGSkqz1XHKD993yt-Q86C5iWdR-toCrkB3VLLlNM7C4DqEZLu_syCuwTVDLBTWLLAL',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmout, currency: 'GBP' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
      //this.storeService.createOrder()
      });

    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }



  public removeItem(key: Item) {

    this.storeService.removeItem(key);

  }

  public destroyCart( ) {

    console.log(this.finalAmout);
     //this.storeService.destroyCart();

  }

}
