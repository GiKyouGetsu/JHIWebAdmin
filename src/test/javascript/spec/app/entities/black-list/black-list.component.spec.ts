/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AvayaBloomAdminTestModule } from '../../../test.module';
import { BlackListComponent } from 'app/entities/black-list/black-list.component';
import { BlackListService } from 'app/entities/black-list/black-list.service';
import { BlackList } from 'app/shared/model/black-list.model';

describe('Component Tests', () => {
    describe('BlackList Management Component', () => {
        let comp: BlackListComponent;
        let fixture: ComponentFixture<BlackListComponent>;
        let service: BlackListService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AvayaBloomAdminTestModule],
                declarations: [BlackListComponent],
                providers: []
            })
                .overrideTemplate(BlackListComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BlackListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BlackList(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.blackLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
