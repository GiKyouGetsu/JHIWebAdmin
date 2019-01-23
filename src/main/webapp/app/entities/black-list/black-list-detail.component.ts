import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlackList } from 'app/shared/model/black-list.model';

@Component({
    selector: 'bloom-black-list-detail',
    templateUrl: './black-list-detail.component.html'
})
export class BlackListDetailComponent implements OnInit {
    blackList: IBlackList;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blackList }) => {
            this.blackList = blackList;
        });
    }

    previousState() {
        window.history.back();
    }
}
