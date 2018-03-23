import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../authentication.service";
import { ShopService } from '../../services/shop.service';
import { StoreService } from "../../services/store.service";
import { Item } from '../../shop-items/shared/shop.model';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers :[ShopService]
})
export class StoreComponent implements OnInit {
  private itemList : Item[];

  constructor(private shopService : ShopService, public storeService: StoreService, public auth: AuthenticationService) {


  }

  ngOnInit() {

    var z = this.shopService.getData();
    z.snapshotChanges().subscribe(item => {

        this.itemList = [];
        item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.itemList.push(y as Item);
        //console.log(this.itemList);

     });
    });

  }



 public addToCart(item: Item ) {

   if (this.auth.isLoggedIn()) this.storeService.addItem(item);

 }


}
