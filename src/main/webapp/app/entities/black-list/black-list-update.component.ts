import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';

@Component({
    selector: 'bloom-black-list-update',
    templateUrl: './black-list-update.component.html'
})
export class BlackListUpdateComponent implements OnInit {
    blackList: IBlackList;
    isSaving: boolean;

    constructor(protected blackListService: BlackListService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blackList }) => {
            this.blackList = blackList;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.blackList.id !== undefined) {
            this.subscribeToSaveResponse(this.blackListService.update(this.blackList));
        } else {
            this.subscribeToSaveResponse(this.blackListService.create(this.blackList));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlackList>>) {
        result.subscribe((res: HttpResponse<IBlackList>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
