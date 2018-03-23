import { CartItem } from "./cartItem.model";

export class Cart {

  $key: string
  items: CartItem[]
  email: string
  totalPrice: number

}
