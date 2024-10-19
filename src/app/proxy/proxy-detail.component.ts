import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxyService } from './proxy.service';
import { Proxy } from './proxy.model';
import { alert } from '@nativescript/core';

@Component({
  selector: 'ns-proxy-detail',
  templateUrl: './proxy-detail.component.html',
})
export class ProxyDetailComponent implements OnInit {
  proxy: Proxy | undefined;

  constructor(
    private route: ActivatedRoute,
    private proxyService: ProxyService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.proxy = this.proxyService.getProxy(id);
  }

  onToggleStatus(): void {
    if (this.proxy) {
      this.proxy.status = this.proxy.status === 'active' ? 'inactive' : 'active';
      this.proxyService.updateProxy(this.proxy);
    }
  }

  onTestConnection(): void {
    if (this.proxy) {
      const success = Math.random() > 0.2; // Simulating a connection attempt
      this.proxyService.logProxyAttempt(this.proxy.id, success);
      alert({
        title: 'Connection Test',
        message: success ? 'Connection successful' : 'Connection failed',
        okButtonText: 'OK'
      });
    }
  }

  onSelectBestProxy(): void {
    const bestProxy = this.proxyService.selectBestProxy();
    if (bestProxy) {
      alert({
        title: 'Best Proxy Selected',
        message: `Selected proxy: ${bestProxy.address}:${bestProxy.port}`,
        okButtonText: 'OK'
      });
    } else {
      alert({
        title: 'No Active Proxies',
        message: 'There are no active proxies available.',
        okButtonText: 'OK'
      });
    }
  }

  onRotateProxy(): void {
    const rotatedProxy = this.proxyService.rotateProxy();
    if (rotatedProxy) {
      alert({
        title: 'Proxy Rotated',
        message: `Rotated to proxy: ${rotatedProxy.address}:${rotatedProxy.port}`,
        okButtonText: 'OK'
      });
    } else {
      alert({
        title: 'No Active Proxies',
        message: 'There are no active proxies available for rotation.',
        okButtonText: 'OK'
      });
    }
  }
}