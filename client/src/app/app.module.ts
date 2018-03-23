import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';



import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { ItemComponent } from './shop-items/item/item.component';
import { ItemListComponent } from './shop-items/item-list/item-list.component';
import { StoreComponent } from './storeFront/store/store.component';
import {ShopService} from "./services/shop.service";
import {StoreService} from "./services/store.service";
import { CartComponent } from './storeFront/cart/cart.component';
import { StorageServiceModule } from "angular-webstorage-service";
import {CollapseModule} from "ngx-bootstrap";
import { OrdersComponent } from './storeFront/orders/orders/orders.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {PostService} from "./services/post.service";
import { UploadService} from "./services/upload.service";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'shop', component: ShopItemsComponent },
  { path: 'store', component: StoreComponent },
  { path: 'post', component: PostsComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShopItemsComponent,
    ItemComponent,
    ItemListComponent,
    StoreComponent,
    CartComponent,
    OrdersComponent,
    NavbarComponent,
    PostsComponent,
    PostComponent,
    PostListComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    StorageServiceModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ShopService,
    StoreService,
    PostService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
