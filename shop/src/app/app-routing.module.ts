import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsComponent} from './Pages/products/products.component';
import {CharactaricticsComponent} from './Components/Charactarictics/Charactarictics.component';
import {CommentsComponent} from './Components/Comments/Comments.component';
import {AuthPageComponent} from './Pages/auth-page/auth-page.component';
import {ContactPage} from './Pages/ContactPage/ContactPage.component';
import {SearchPageResultComponent} from './Pages/SearchPageResult/SearchPageResult.component';
import {PurchasePage} from './Pages/PurchasePage/PurchasePage.component';
import {CategoryPage} from './Pages/category-page/CategoryPage.component';
import {ProductPageImageComponent} from './Components/product-page-image/product-page-image.component';
import {NotFoundPage} from './Pages/NotFoundPage/NotFoundPage.component';
import {Slider} from './Components/Slider/Slider.component';
import {CarouselComponent} from './Components/carousel/carousel.component';
import {ProductNavigation} from './Components/ProductNavigation/ProductNavigation.component';
import {GridLayoutModule} from './Layouts/grid-layout/GridLayout.module';
import {CategoriesListComponent} from './Components/CategoriesList/CategoriesList.component';
import {FlexLayoutComponent} from './Layouts/flex-layout/FlexLayout.component';
import {ProductsCategoriesComponent} from './Components/products-categories/products-categories.component';
import {ServiceInfoPageComponent} from './Pages/service-info-page/service-info-page.component';
import {DeliveryPageComponent} from './Pages/delivery-page/delivery-page.component';
import {WarrantyPolicyPageComponent} from './Pages/warranty-policy-page/warranty-policy-page.component';
import {ContactsInfoPageComponent} from './Pages/contacts-info-page/contacts-info-page.component';
import {ContractInfoPageComponent} from './Pages/contract-info-page/contract-info-page.component';
import {OnlyAuthGuard} from './guards/only-auth-guard.guard';
import {UsersPageComponent} from './Pages/users-page/users-page.component';
import {UserCardComponent} from './Components/user-card/user-card.component';
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
import {HomePageModule} from './Pages/home-page/home-page.module';
import {ProductsSearchModule} from './Components/products-search/products-search.module';

const adminRoutes: Routes = [
  {
    path: 'admin/slider-info',
    loadChildren: () => import('./Pages/slider-info-page/slider-info-page.module')
      .then(v => v.SliderInfoPageModule),
    canLoad: [OnlySuperAdminGuard]
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./Pages/users-page/users-page.module')
      .then(v => v.UsersPageModule),
    canLoad: [OnlySuperAdminGuard]
  },
  {
    path: 'admin/add-product',
    loadChildren: () => import('./Pages/add-product-page/add-product-page.module')
      .then(v => v.AddProductPageModule),
    canLoad: [OnlySuperAdminGuard]
  },
];

const routes: Routes = [
  {path: 'buy-orders', component: PurchasePage},
  {path: 'products', component: ProductsComponent, resolve: {productsInfo: ProductsDataResolver}},
  {path: 'authenticate', component: AuthPageComponent},
  {path: 'search', component: SearchPageResultComponent},
  {path: 'contacts', component: ContactPage},
  {path: 'category/:category', component: CategoryPage},
  {path: 'info/refund', component: ServiceInfoPageComponent},
  {path: 'info/delivery', component: DeliveryPageComponent},
  {path: 'info/warranty', component: WarrantyPolicyPageComponent},
  {path: 'info/contacts', component: ContactsInfoPageComponent},
  {path: 'info/contract', component: ContractInfoPageComponent},
  {
    path: 'product/:id',
    loadChildren: () => import('./Pages/product/product.module')
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./Pages/admin-page/admin-page.module')
      .then(v => v.AdminPageModule),
    canLoad: [OnlyAuthGuard]
  },
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
    ListsModule,
    HomePageModule, ProductsSearchModule
  ],
  declarations: [
    ProductsComponent,
    CarouselComponent,
    CharactaricticsComponent, CommentsComponent, AuthPageComponent,
    Slider, CategoriesListComponent,
    NotFoundPage, ContactPage,
    ProductPageImageComponent,
    SearchPageResultComponent,
    PurchasePage, CategoryPage,
    ProductNavigation,
    FlexLayoutComponent, ProductsCategoriesComponent,
    ServiceInfoPageComponent,
    DeliveryPageComponent,
    WarrantyPolicyPageComponent, ContactsInfoPageComponent,
    ContractInfoPageComponent,
    UsersPageComponent, UserCardComponent,
  ],
  providers: [OnlyAuthGuard, OnlySuperAdminGuard, ProductResolver],
  exports: [RouterModule, ProductsCategoriesComponent, FlexLayoutComponent, CarouselComponent]
})
export class AppRoutingModule {
}
