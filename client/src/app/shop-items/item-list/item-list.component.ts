import { Component, OnInit } from '@angular/core';

import { ShopService } from '../../services/shop.service';
import { Item } from '../shared/shop.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

    itemList : Item[];

  constructor(private shopService : ShopService, private toastr: ToastrService) { }

  ngOnInit() {

    var z = this.shopService.getData();
    z.snapshotChanges().subscribe(item => {

        this.itemList = [];
        item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.itemList.push(y as Item);

     });
    });
  }


  onEdit(emp: Item) {
    this.shopService.selectedItem = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.shopService.deleteItem(key);
      this.toastr.warning("Deleted Successfully", "Item register");
    }
  }

}
