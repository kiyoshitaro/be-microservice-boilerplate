import * as promClient from 'prom-client';

export interface DefaultMetricsConfiguration {
  register?: promClient.Registry;
  prefix?: string;
  labels?: Object;
  eventLoopMonitoringPrecision?: number;
}
