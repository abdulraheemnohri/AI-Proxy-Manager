import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { ProxyListComponent } from './proxy/proxy-list.component';
import { ProxyDetailComponent } from './proxy/proxy-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/proxies', pathMatch: 'full' },
  { path: 'proxies', component: ProxyListComponent },
  { path: 'proxy/:id', component: ProxyDetailComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}