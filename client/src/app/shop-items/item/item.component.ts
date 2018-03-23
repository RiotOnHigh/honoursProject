import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { ShopService } from '../../services/shop.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private shopService : ShopService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

    onSubmit(itemForm: NgForm) {
        if (itemForm.value.$key == null) {
          this.shopService.insertItem(itemForm.value);
        }
        else
          this.shopService.updateItem(itemForm.value);
        this.resetForm(itemForm);
        this.toastr.success('Submitted Succcessfully', 'Item Register');
          }

  resetForm(itemForm?: NgForm) {

    if (itemForm != null)
    console.log("I've been called");
        itemForm.resetForm();
    this.shopService.selectedItem = {
      $key: null,
      name: '',
      description: '',
      price: 0,
      count: 0,
      type: null
    }
  }

}
