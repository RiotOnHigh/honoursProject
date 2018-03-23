import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import { Item } from "../shop-items/shared/shop.model";



@Injectable()
export class ShopService {

    itemList: AngularFireList<any>;
    selectedItem: Item = new Item();

  constructor( private firebase :AngularFireDatabase ) { }

  getData(){
    this.itemList = this.firebase.list('items');
    return this.itemList;
  }




  insertItem(item : Item)
  {

    this.itemList.push({
      name: item.name,
      description: item.description,
      price: item.price,
      count: item.count,
      type: item.type
    });
  }

  getItem ($key: string) {

    return this.firebase.database.ref('/items/'+$key);

  }


  updateItem(item : Item){
    this.itemList.update(item.$key,
      {
        name: item.name,
        description: item.description,
        price: item.price,
        count: item.count,
        type: item.type
      });
  }

  deleteItem($key : string){
    this.itemList.remove($key);
  }

}
