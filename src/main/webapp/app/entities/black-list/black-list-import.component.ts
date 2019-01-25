import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';

@Component({
    selector: 'bloom-black-list-import',
    templateUrl: './black-list-import.component.html',
    styleUrls: ['./black-list.component.css']
})
export class BlackListImportComponent implements OnInit {

    blackList: IBlackList;
    // formInput: FormGroup;
    fileToUpload: File = null;
    @ViewChild('labelImport')
    labelImport: ElementRef;

    constructor(
        protected blackListService: BlackListService,
        protected eventManager: JhiEventManager
    ) {}

    onFileChange(files: FileList) {

        if (files.length > 0) {
           this.labelImport.nativeElement.innerText = Array.from(files)
          .map(f => f.name)
          .join(', ');
        }/*  else {
            if (language === 'zh-cn') {
                this.labelImport.nativeElement.innerText = '选择文件';
            } else if (language === 'zh-tw') {
                this.labelImport.nativeElement.innerText = '選擇文件';
            } else if (language === 'en') {
                this.labelImport.nativeElement.innerText = 'choose file';
            }
        } */

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
        // this.blackListService.delete(id).subscribe(response => {
        //     this.eventManager.broadcast({
        //         name: 'blackListListModification',
        //         content: 'Deleted an blackList'
        //     });
        // });
        alert('Import');
        console.log(this.fileToUpload);
    }

    previousState() {
        window.history.back();
    }
}
