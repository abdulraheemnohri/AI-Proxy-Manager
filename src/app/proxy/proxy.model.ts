export interface Proxy {
  id: number;
  address: string;
  port: number;
  responseTime: number;
  uptime: number;
  successRate: number;
  status: 'active' | 'inactive';
}