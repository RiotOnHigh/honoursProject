import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { StoreService } from "./services/store.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  sisCollapsed = true;
  admin: string;

  constructor(public auth: AuthenticationService, private storeService: StoreService ) {

    this.admin = this.auth.getUserDetails().email;
    console.log(this.admin);


  }



}
