import { Injectable } from '@angular/core';
import { Proxy } from './proxy.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private proxies: Proxy[] = [
    { id: 1, address: '192.168.1.1', port: 8080, responseTime: 100, uptime: 99.9, successRate: 98.5, status: 'active' },
    { id: 2, address: '192.168.1.2', port: 8081, responseTime: 150, uptime: 99.5, successRate: 97.8, status: 'active' },
  ];

  private proxiesSubject = new BehaviorSubject<Proxy[]>(this.proxies);

  getProxies(): Observable<Proxy[]> {
    return this.proxiesSubject.asObservable();
  }

  getProxy(id: number): Proxy | undefined {
    return this.proxies.find(proxy => proxy.id === id);
  }

  addProxy(proxy: Omit<Proxy, 'id'>): void {
    const newProxy = { ...proxy, id: this.proxies.length + 1 };
    this.proxies.push(newProxy);
    this.proxiesSubject.next(this.proxies);
  }

  updateProxy(updatedProxy: Proxy): void {
    const index = this.proxies.findIndex(proxy => proxy.id === updatedProxy.id);
    if (index !== -1) {
      this.proxies[index] = updatedProxy;
      this.proxiesSubject.next(this.proxies);
    }
  }

  selectBestProxy(): Proxy | undefined {
    return this.proxies
      .filter(proxy => proxy.status === 'active')
      .sort((a, b) => {
        const aScore = a.responseTime * (1 - a.successRate / 100) * (1 - a.uptime / 100);
        const bScore = b.responseTime * (1 - b.successRate / 100) * (1 - b.uptime / 100);
        return aScore - bScore;
      })[0];
  }

  rotateProxy(): Proxy | undefined {
    const activeProxies = this.proxies.filter(proxy => proxy.status === 'active');
    if (activeProxies.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * activeProxies.length);
    return activeProxies[randomIndex];
  }

  logProxyAttempt(proxyId: number, success: boolean): void {
    console.log(`Proxy ${proxyId} connection attempt: ${success ? 'Success' : 'Failure'}`);
    // In a real application, you would implement more detailed logging here
  }
}