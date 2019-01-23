import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';
import { BlackListComponent } from './black-list.component';
import { BlackListDetailComponent } from './black-list-detail.component';
import { BlackListUpdateComponent } from './black-list-update.component';
import { BlackListDeletePopupComponent } from './black-list-delete-dialog.component';
import { IBlackList } from 'app/shared/model/black-list.model';

@Injectable({ providedIn: 'root' })
export class BlackListResolve implements Resolve<IBlackList> {
    constructor(private service: BlackListService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BlackList> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BlackList>) => response.ok),
                map((blackList: HttpResponse<BlackList>) => blackList.body)
            );
        }
        return of(new BlackList());
    }
}

export const blackListRoute: Routes = [
    {
        path: 'black-list',
        component: BlackListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'avayaBloomAdminApp.blackList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'black-list/:id/view',
        component: BlackListDetailComponent,
        resolve: {
            blackList: BlackListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'avayaBloomAdminApp.blackList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'black-list/new',
        component: BlackListUpdateComponent,
        resolve: {
            blackList: BlackListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'avayaBloomAdminApp.blackList.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'black-list/:id/edit',
        component: BlackListUpdateComponent,
        resolve: {
            blackList: BlackListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'avayaBloomAdminApp.blackList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blackListPopupRoute: Routes = [
    {
        path: 'black-list/:id/delete',
        component: BlackListDeletePopupComponent,
        resolve: {
            blackList: BlackListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'avayaBloomAdminApp.blackList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
