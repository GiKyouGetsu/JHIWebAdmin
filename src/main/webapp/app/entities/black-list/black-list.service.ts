import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlackList } from 'app/shared/model/black-list.model';
import { FileUploader } from 'ng2-file-upload';

type EntityResponseType = HttpResponse<IBlackList>;
type EntityArrayResponseType = HttpResponse<IBlackList[]>;

@Injectable({ providedIn: 'root' })
export class BlackListService {
    public resourceUrl = SERVER_API_URL + 'api/black-lists';

    constructor(protected http: HttpClient) {}

    create(blackList: IBlackList): Observable<EntityResponseType> {
        return this.http.post<IBlackList>(this.resourceUrl, blackList, { observe: 'response' });
    }

    update(blackList: IBlackList): Observable<EntityResponseType> {
        return this.http.put<IBlackList>(this.resourceUrl, blackList, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBlackList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlackList[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    queryWithparams(req: any, no, applicant): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlackList[]>(`${this.resourceUrl}` + '/filter' + '?' + 'blacknumber=' + no + '&' + 'applicant=' + applicant, {
            params: options,
            observe: 'response'
        });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    pushFileToStorage(file: File, user): Observable<any> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);
        formdata.append('owner', user);

        const req = new HttpRequest('POST', `${this.resourceUrl}` + '/upload', formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }
}
