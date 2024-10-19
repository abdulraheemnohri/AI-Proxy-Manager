import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProxyListComponent } from './proxy/proxy-list.component';
import { ProxyDetailComponent } from './proxy/proxy-detail.component';
import { ProxyService } from './proxy/proxy.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, ProxyListComponent, ProxyDetailComponent],
  providers: [ProxyService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}