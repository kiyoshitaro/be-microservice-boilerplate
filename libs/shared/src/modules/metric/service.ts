import { Injectable, Inject } from '@nestjs/common';
import { DefaultMetricsConfiguration } from './interface';
import * as promClient from 'prom-client';
import processCpuTotal from 'prom-client/lib/metrics/processCpuTotal';
import processStartTime from 'prom-client/lib/metrics/processStartTime';
import osMemoryHeap from 'prom-client/lib/metrics/osMemoryHeap';
import processOpenFileDescriptors from 'prom-client/lib/metrics/processOpenFileDescriptors';
import processMaxFileDescriptors from 'prom-client/lib/metrics/processMaxFileDescriptors';
import eventLoopLag from 'prom-client/lib/metrics/eventLoopLag';
import processHandles from 'prom-client/lib/metrics/processHandles';
import processRequests from 'prom-client/lib/metrics/processRequests';
import processResources from 'prom-client/lib/metrics/processResources';
import heapSizeAndUsed from 'prom-client/lib/metrics/heapSizeAndUsed';
import heapSpacesSizeAndUsed from 'prom-client/lib/metrics/heapSpacesSizeAndUsed';
import version from 'prom-client/lib/metrics/version';

@Injectable()
export class MetricConfig {
  public register: promClient.Registry;
  public requestDurationHistogramBucket?: number[];
  public defaultMetricsConfiguration?: DefaultMetricsConfiguration;

  constructor(defaultLabels?: Object) {
    this.register = new promClient.Registry();
    if (Object.keys(defaultLabels).length > 0) {
      this.register.setDefaultLabels(defaultLabels);
    }
    this.requestDurationHistogramBucket = [
      0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1.0, 2.5, 5.0, 7.5,
      10.0,
    ];
    this.defaultMetricsConfiguration = {
      register: new promClient.Registry(),
      prefix: '',
      labels: {},
      eventLoopMonitoringPrecision: 10,
    };
  }
}

@Injectable()
export class MetricService {
  public requestDurationHistogram: promClient.Histogram;
  public requestCounter: promClient.Counter;

  constructor(public metricConfig: MetricConfig) {
    this.requestDurationHistogram = new promClient.Histogram({
      name: 'microservice_http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'status', 'url_rule'],
      buckets: [
        0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1.0, 2.5, 5.0,
        7.5, 10.0,
      ],
      registers: [this.metricConfig.register],
    });
    this.requestCounter = new promClient.Counter({
      name: 'microservice_http__requests_total',
      help: 'Total number of HTTP requests in seconds',
      labelNames: ['method', 'status', 'url_rule'],
      registers: [this.metricConfig.register],
    });
    // default metrics
    const metrics = {
      processCpuTotal,
      processStartTime,
      osMemoryHeap,
      processOpenFileDescriptors,
      processMaxFileDescriptors,
      eventLoopLag,
      processResources,
      processHandles,
      processRequests,
      heapSizeAndUsed,
      heapSpacesSizeAndUsed,
      version,
    };
    for (const metric of Object.values(metrics)) {
      metric(
        this.metricConfig.register,
        this.metricConfig.defaultMetricsConfiguration
      );
    }
  }
}
