import { NgModule } from '@angular/core';
import { RouterModule, PreloadingStrategy } from '@angular/router';
import { errorRoute, navbarRoute, sidebarRoute} from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { JHIPreloadingStrategy } from './shared/preload/preload-strategy';

const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#AvayaBloomAdminAdminModule',
                    data: {preload: true}
                }
                // ,
                // {
                //     path: 'phone',
                //     loadChildren: './entities/entity.module#AvayaBloomAdminEntityModule',
                //     data: {preload: true}
                // }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED, preloadingStrategy: JHIPreloadingStrategy }
        )
    ],
    providers: [JHIPreloadingStrategy],
    exports: [RouterModule]
})
export class AvayaBloomAdminAppRoutingModule {}
