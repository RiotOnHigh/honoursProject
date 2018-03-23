import { Component, OnInit } from '@angular/core';

import { ShopService } from '../services/shop.service'
@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css'],
  providers :[ShopService]
})
export class ShopItemsComponent implements OnInit {

  constructor(private shopService : ShopService) { }

  ngOnInit() {
  }

}
