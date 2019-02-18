import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';
import { async } from 'q';
import { HttpEventType, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventBusService } from 'app/shared';

@Component({
    selector: 'bloom-black-list-import',
    templateUrl: './black-list-import.component.html',
    styleUrls: ['./black-list.component.css']
})
export class BlackListImportComponent implements OnInit {
    // public URL = 'api/black-lists';
    // protected uploader: FileUploader;
    // public hasBaseDropZoneOver:boolean = false;
    // public hasAnotherDropZoneOver:boolean = false;
    // response:string;
    progress: { percentage: number } = { percentage: 0 };
    currentUser: string;
    loading = false;
    maskEventer: EventEmitter<string> = new EventEmitter();

    blackList: IBlackList;
    fileToUpload: File = null;
    @ViewChild('labelImport')
    labelImport: ElementRef;

    constructor(
        protected blackListService: BlackListService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected accountService: AccountService,
        protected spinner: NgxSpinnerService,
        protected eventBusService: EventBusService,
        protected alertService: JhiAlertService
    ) {
        this.accountService.identity().then(account => {
            this.currentUser = this.copyAccount(account).login;
        });
    }

    onFileChange(files: FileList) {
        this.progress.percentage = 0;
        if (files.length > 0) {
            this.labelImport.nativeElement.innerText = Array.from(files)
                .map(f => f.name)
                .join(', ');
            this.fileToUpload = files.item(0);
        }
        console.log(this.fileToUpload);
    }
    isSelected() {
        return !!this.fileToUpload;
    }
    ngOnInit() {}
    clear() {}
    confirmImport() {
        this.eventBusService.sendCommand('open');
        this.subscribeToSaveResponse(this.blackListService.pushFileToStorage(this.fileToUpload, this.currentUser));
    }

    protected subscribeToSaveResponse(result: Observable<HttpEvent<any>>) {
        result.subscribe((res: HttpResponse<IBlackList>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError(res));
    }

    onSaveSuccess(res) {
        if (res && res.status === 200) {
            this.eventBusService.sendCommand('close');
            console.log('save success');
            this.previousState();
        } else {
        }
    }
    onSaveError(res) {
        this.eventBusService.sendCommand('close');
        console.log('save failed');
        this.previousState();
        this.onError('error.serverError');
    }

    protected onError(errorMessage: string) {
        this.alertService.error(errorMessage, null, null);
    }
    previousState() {
        // this.router.navigateByUrl('/black-list');
        window.history.back();
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
