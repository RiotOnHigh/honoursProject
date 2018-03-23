import {
  Injectable,
  Inject
} from '@angular/core';
import {
  AuthenticationService
} from '../authentication.service';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
import {
  Item
} from "../shop-items/shared/shop.model";
import {
  LOCAL_STORAGE,
  WebStorageService
} from "angular-webstorage-service";


@Injectable()
export class StoreService {


  public data: any = [];
  userCart: AngularFireList < any[] > ;
  email: string;
  check;
  fireRef;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private firebase: AngularFireDatabase, private auth: AuthenticationService) {

    this.check = auth.getUserDetails();
    this.fireRef = this.firebase.database;


  }

  getCartData() {

    this.userCart = this.firebase.list('carts/userCarts/' + this.check.name + '/userCart');
    return this.userCart;

  }

  getCartTotal() {
    let total = 0;
    this.fireRef.ref('carts/userCarts/' + this.check.name + '/userCart').on('value', function(snapshot) {


      snapshot.forEach(function(childSnapshot) {

        total += (childSnapshot.val().price) * childSnapshot.val().count;

      });
    });
    return total;

  }

  public createOrder() {

    let basket = this.fireRef.ref('carts/userCarts/' + this.check.name);
    let order = this.fireRef.ref('orders/userOrders/' + this.check.name);

    basket.on('value', function(snapshot) {

      order.set(snapshot.val());

    });
    basket.remove();

  }

  public removeItem(key) {

    this.firebase.database.ref('carts/userCarts/' + this.check.name + '/userCart/' + key).once("value").then((snapshot) => {

      if (snapshot.val().count > 1) {

        this.firebase.object('carts/userCarts/' + this.check.name + '/userCart/' + key + '/count').query.ref.transaction(count => {

          return count - 1;

        });

        this.firebase.object('items/' + key + '/count').query.ref.transaction(count => {

          return count + 1;
        });

      } else {

        this.firebase.object('carts/userCarts/' + this.check.name + '/userCart/' + key).remove();
        this.firebase.object('items/' + key + '/count').query.ref.transaction(count => {

          return count + 1;
        });
      }

    });


  }


  public addItem(cartitem: Item) {



    this.firebase.database.ref('carts/userCarts/').child(this.check.name).once("value").then((snapshot) => {


      if (snapshot.hasChild("userCart/" + cartitem.$key) == true) {

        let itemCount = snapshot.child(cartitem.$key + "/count").val();
        let updateCount = itemCount + 1;

        this.firebase.object('/carts/userCarts/' + this.check.name + '/userCart/' + cartitem.$key + '/count').query.ref.transaction(count => {

          return count + 1;
        })


      } else {

        let newItem = {

          name: cartitem.name,
          price: cartitem.price,
          count: 1

        };


        this.fireRef.ref('carts/userCarts/' + this.check.name + '/userCart/').child(cartitem.$key).set(JSON.parse(JSON.stringify(newItem)));

      }

    });

    this.firebase.object('items/' + cartitem.$key + '/count').query.ref.transaction(count => {

      return count - 1;
    })

  }



}
