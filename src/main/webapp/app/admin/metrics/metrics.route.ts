import { Route } from '@angular/router';

import { BloomMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'bloom-metrics',
    component: BloomMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
