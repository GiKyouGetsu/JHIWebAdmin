import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { blackListRoute, blackListPopupRoute } from './black-list';

const ENTITY_ROUTES = [ ...blackListRoute, ...blackListPopupRoute ];
export const entityRoute: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ENTITY_ROUTES
    }
]