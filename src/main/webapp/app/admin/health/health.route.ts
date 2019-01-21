import { Route } from '@angular/router';

import { BloomHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'bloom-health',
    component: BloomHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
