import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';
import { AccountService } from 'app/core';

@Component({
    selector: 'bloom-black-list-update',
    templateUrl: './black-list-update.component.html'
})
export class BlackListUpdateComponent implements OnInit {
    currentAccount: any;
    blackList: IBlackList;
    isSaving: boolean;

    constructor(protected blackListService: BlackListService, protected activatedRoute: ActivatedRoute, protected accountService: AccountService,) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blackList }) => {

            this.blackList = blackList;
            this.accountService.identity().then(account => {
                this.currentAccount = this.copyAccount(account);
                if (!!!blackList.id) {
                    this.blackList.applicant = this.currentAccount.login;
                }
            }); 
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

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
