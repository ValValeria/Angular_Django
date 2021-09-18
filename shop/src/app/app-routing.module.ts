import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './Pages/HomePage/HomePage.component';
import { ProductsComponent } from './Pages/Products/Products.component';
import { ErrorImageLoading } from './Components/ErrorImageLoading/ErrorImageLoading.component';
import { CardSmall } from './Components/CardSmall/CardSmall.component';
import { Product } from './Pages/Product/Product.component';
import { CharactaricticsComponent } from './Components/Charactarictics/Charactarictics.component';
import { Comments } from './Components/Comments/Comments.component';
import { AuthPage } from './Pages/AuthPage/AuthPage.component';
import { ContactPage } from './Pages/ContactPage/ContactPage.component';
import { SearchPageResultComponent } from './Pages/SearchPageResult/SearchPageResult.component';
import { PurchasePage } from './Pages/PurchasePage/PurchasePage.component';
import { CategoryPage } from './Pages/CategoryPage/CategoryPage.component';
import { ProductPageImage } from './Components/ProductPageImage/ProductPageImage.component';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage.component';
import { Slider } from './Components/Slider/Slider.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { ProductNavigation } from './Components/ProductNavigation/ProductNavigation.component';
import {GridLayoutModule} from './Layouts/grid-layout/GridLayout.module';
import {CategoriesListComponent} from './Components/CategoriesList/CategoriesList.component';
import { FlexLayoutComponent } from './Layouts/flex-layout/FlexLayout.component';
import { ProductsCategoriesComponent } from './Components/products-categories/products-categories.component';
import {ServiceInfoPageComponent} from './Pages/service-info-page/service-info-page.component';
import {DeliveryPageComponent} from './Pages/delivery-page/delivery-page.component';
import {WarrantyPolicyPageComponent} from './Pages/warranty-policy-page/warranty-policy-page.component';
import { ContactsInfoPageComponent } from './Pages/contacts-info-page/contacts-info-page.component';
import {ContractInfoPageComponent} from './Pages/contract-info-page/contract-info-page.component';
import {SliceStringPipe} from './Pipes/SliceString.pipe';
import {OnlyAuthGuard} from './guards/only-auth-guard.guard';
import { UsersPageComponent } from './Pages/users-page/users-page.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { AddProductPageComponent } from './Pages/add-product-page/add-product-page.component';
import {OnlySuperAdminGuard} from './guards/only-super-admin.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProductsDataResolver} from './guards/products-data.resolver';
import {ProductResolver} from './guards/product.resolver';
import {AdminPageModule} from './Pages/admin-page/admin-page.module';
import {SectionLayoutModule} from './Layouts/section-layout/section-layout.module';
import {SharedModule} from './shared/shared.module';
import {BreadCrumbsModule} from './Components/bread-crumbs/bread-crumbs.module';
import {LikeModule} from './Components/Like/like.module';
import {ListsModule} from './Components/lists/lists.module';


const adminRoutes: Routes = [
  { path: 'profile/slider-info',
    loadChildren: () => import('./Pages/slider-info-page/slider-info-page.module')
      .then(v => v.SliderInfoPageModule),
    canLoad: [OnlySuperAdminGuard]
  },
  {path: 'profile/users',
   canLoad: [OnlySuperAdminGuard],
    loadChildren: () => import('./Pages/users-page/users-page.module')
      .then(v => v.UsersPageModule),
  },
  {path: 'profile/add-product',
   loadChildren: () => import('./Pages/add-product-page/add-product-page.module')
      .then(v => v.AddProductPageModule),
   component: AddProductPageComponent,
   canLoad: [OnlySuperAdminGuard]},
  {path: 'profile/:id',
   loadChildren: () => import('./Pages/admin-page/admin-page.module').then(v => v.AdminPageModule),
   canLoad: [OnlyAuthGuard]},
];

const routes: Routes = [
  {path: '', component: HomePage, pathMatch: 'full'},
  {path: 'buy-orders', component: PurchasePage},
  {path: 'products', component: ProductsComponent, resolve: {productsInfo: ProductsDataResolver}},
  {path: 'product/:id', component: Product, resolve: {product: ProductResolver}},
  {path: 'authenticate', component: AuthPage},
  {path: 'search', component: SearchPageResultComponent },
  {path: 'contacts', component: ContactPage},
  {path: 'category/:category', component: CategoryPage},
  {path: 'info/refund', component: ServiceInfoPageComponent},
  {path: 'info/delivery', component: DeliveryPageComponent},
  {path: 'info/warranty', component: WarrantyPolicyPageComponent},
  {path: 'info/contacts', component: ContactsInfoPageComponent},
  {path: 'info/contract', component: ContractInfoPageComponent},
  ...adminRoutes,
  {path: '**', component: NotFoundPage}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GridLayoutModule, MatPaginatorModule,
    MatTooltipModule,
    AdminPageModule,
    SectionLayoutModule,
    SharedModule,
    BreadCrumbsModule,
    LikeModule,
    ListsModule
  ],
  declarations: [HomePage, ProductsComponent,
                ErrorImageLoading, CardSmall,
                Product, CarouselComponent,
                CharactaricticsComponent, Comments, AuthPage,
                Slider, CategoriesListComponent,
                NotFoundPage, ContactPage,
                ProductPageImage, SearchPageResultComponent,
                PurchasePage, CategoryPage,
                ProductNavigation,
                FlexLayoutComponent, ProductsCategoriesComponent,
                ServiceInfoPageComponent,
                DeliveryPageComponent,
                WarrantyPolicyPageComponent, ContactsInfoPageComponent,
                ContractInfoPageComponent, SliceStringPipe,
                UsersPageComponent, UserCardComponent,
                ],
  providers: [OnlyAuthGuard, OnlySuperAdminGuard, ProductResolver],
  exports: [RouterModule, ProductsCategoriesComponent, FlexLayoutComponent]
})
export class AppRoutingModule { }
