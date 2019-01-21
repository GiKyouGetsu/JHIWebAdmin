import { Route } from '@angular/router';

import { BloomDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: BloomDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
