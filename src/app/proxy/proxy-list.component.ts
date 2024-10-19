import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProxyService } from './proxy.service';
import { Proxy } from './proxy.model';
import { prompt } from '@nativescript/core';

@Component({
  selector: 'ns-proxy-list',
  templateUrl: './proxy-list.component.html',
})
export class ProxyListComponent implements OnInit {
  proxies$: Observable<Proxy[]>;

  constructor(private proxyService: ProxyService) {}

  ngOnInit(): void {
    this.proxies$ = this.proxyService.getProxies();
  }

  onAddProxy(): void {
    prompt({
      title: 'Add New Proxy',
      message: 'Enter proxy details',
      okButtonText: 'Add',
      cancelButtonText: 'Cancel',
      inputType: 'text',
    }).then((result) => {
      if (result.result) {
        const [address, port] = result.text.split(':');
        this.proxyService.addProxy({
          address,
          port: parseInt(port, 10),
          responseTime: 0,
          uptime: 100,
          successRate: 100,
          status: 'active',
        });
      }
    });
  }
}