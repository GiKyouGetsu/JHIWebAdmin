import { Route } from '@angular/router';

import { BloomConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'bloom-configuration',
    component: BloomConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
