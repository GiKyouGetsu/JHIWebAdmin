/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { BlackListService } from 'app/entities/black-list/black-list.service';
import { IBlackList, BlackList, NumberSource } from 'app/shared/model/black-list.model';

describe('Service Tests', () => {
    describe('BlackList Service', () => {
        let injector: TestBed;
        let service: BlackListService;
        let httpMock: HttpTestingController;
        let elemDefault: IBlackList;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(BlackListService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new BlackList(0, 'AAAAAAA', NumberSource.MANUAL, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a BlackList', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new BlackList(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a BlackList', async () => {
                const returnedFromService = Object.assign(
                    {
                        blacknumber: 'BBBBBB',
                        numberSource: 'BBBBBB',
                        validityPeriod: 1,
                        addReason: 'BBBBBB',
                        applicant: 'BBBBBB',
                        createtime: 'BBBBBB',
                        changetime: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of BlackList', async () => {
                const returnedFromService = Object.assign(
                    {
                        blacknumber: 'BBBBBB',
                        numberSource: 'BBBBBB',
                        validityPeriod: 1,
                        addReason: 'BBBBBB',
                        applicant: 'BBBBBB',
                        createtime: 'BBBBBB',
                        changetime: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a BlackList', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
