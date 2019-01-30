import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { FileUploader, FileItem } from 'ng2-file-upload';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';
import { async } from 'q';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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

    blackList: IBlackList;
    fileToUpload: File = null;
    @ViewChild('labelImport')
    labelImport: ElementRef;

    constructor(
        protected blackListService: BlackListService,
        protected eventManager: JhiEventManager
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
    }

    onFileChange(files: FileList) {
        this.progress.percentage = 0;
        if (files.length > 0) {
           this.labelImport.nativeElement.innerText = Array.from(files)
          .map(f => f.name)
          .join(', ');
        }

        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
    }
    isSelected() {
        return !!this.fileToUpload;
    }
    ngOnInit() {}
    clear() {
    }

    confirmImport() {
        this.progress.percentage = 0;
        this.blackListService.pushFileToStorage(this.fileToUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
              }
        })
    }

    previousState() {
        window.history.back();
    }
}
