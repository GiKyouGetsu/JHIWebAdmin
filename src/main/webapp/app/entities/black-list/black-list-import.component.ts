import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';
import { async } from 'q';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';

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

    blackList: IBlackList;
    fileToUpload: File = null;
    @ViewChild('labelImport')
    labelImport: ElementRef;

    constructor(
        protected blackListService: BlackListService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {
        // this.uploader = new FileUploader({
        //     url: `${this.URL}`  + '/upload',
        //     disableMultipart: true,
        //     formatDataFunctionIsAsync: true,
        //     formatDataFunction: async (item) => {
        //         return new Promise( (resolve, reject) => {
        //             resolve({
        //                 name: item._file.name,
        //                 length: item._file.size,
        //                 contentType: item._file.type,
        //                 date: new Date()
        //             })
        //         })
        //     }
        // });
        // this.hasBaseDropZoneOver = false;
        // this.hasAnotherDropZoneOver = false;

        // this.response = '';
        // this.uploader.response.subscribe( res => this.response = res );
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
        this.progress.percentage = 0;

        this.subscribeToSaveResponse(this.blackListService.pushFileToStorage(this.fileToUpload, this.currentUser));
        // this.blackListService.pushFileToStorage(this.fileToUpload, this.currentUser).subscribe()

        // this.blackListService.pushFileToStorage(this.fileToUpload, this.currentUser).subscribe(event => {
        // if (event.type === HttpEventType.UploadProgress) {
        //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
        //   } else if (event instanceof HttpResponse) {
        //     console.log('File is completely uploaded!');
        //   }

        // })
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<IBlackList>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    onSaveSuccess() {
        this.previousState();
    }
    onSaveError() {
        // this.previousState();
    }

    previousState() {
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
