import {AdminPageComponent} from './admin-page.component';
import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from '../../Components/admin-dashboard/admin-dashboard.component';
import {AdminDashboardFullComponent} from '../../Components/admin-dashboard-full/admin-dashboard-full.component';
import {AdminButtonsComponent} from '../../Components/admin-buttons/admin-buttons.component';
import {SharedModule} from '../../shared/shared.module';
import {SectionLayoutModule} from '../../Layouts/section-layout/section-layout.module';
import {BreadCrumbsModule} from '../../Components/bread-crumbs/bread-crumbs.module';
import {ListsModule} from '../../Components/lists/lists.module';
import {OrderListModule} from '../../Components/OrderList/order-list.module';
import {LikeModule} from '../../Components/Like/like.module';
import {OrdersLikesModule} from '../../Components/OrdersLikes/OrdersLikes.module';
import {RouterModule, Routes} from '@angular/router';
import {SafePipe} from '../../pipes/safe.pipe';

const routes: Routes = [
  {path: 'profile/:id', component: AdminPageComponent}
];

@NgModule({
  declarations: [
    AdminPageComponent, AdminButtonsComponent,
    AdminDashboardFullComponent, AdminDashboardComponent,
    SafePipe
  ],
  exports: [RouterModule],
  imports: [
    SharedModule, SectionLayoutModule, BreadCrumbsModule, ListsModule,
    OrderListModule, LikeModule, OrdersLikesModule, RouterModule.forChild(routes)
  ]
})
export class AdminPageModule{}
