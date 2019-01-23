/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AvayaBloomAdminTestModule } from '../../../test.module';
import { BlackListUpdateComponent } from 'app/entities/black-list/black-list-update.component';
import { BlackListService } from 'app/entities/black-list/black-list.service';
import { BlackList } from 'app/shared/model/black-list.model';

describe('Component Tests', () => {
    describe('BlackList Management Update Component', () => {
        let comp: BlackListUpdateComponent;
        let fixture: ComponentFixture<BlackListUpdateComponent>;
        let service: BlackListService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AvayaBloomAdminTestModule],
                declarations: [BlackListUpdateComponent]
            })
                .overrideTemplate(BlackListUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BlackListUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BlackList(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blackList = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BlackList();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blackList = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
