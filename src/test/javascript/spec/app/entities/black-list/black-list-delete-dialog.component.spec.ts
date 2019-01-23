/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AvayaBloomAdminTestModule } from '../../../test.module';
import { BlackListDeleteDialogComponent } from 'app/entities/black-list/black-list-delete-dialog.component';
import { BlackListService } from 'app/entities/black-list/black-list.service';

describe('Component Tests', () => {
    describe('BlackList Management Delete Component', () => {
        let comp: BlackListDeleteDialogComponent;
        let fixture: ComponentFixture<BlackListDeleteDialogComponent>;
        let service: BlackListService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AvayaBloomAdminTestModule],
                declarations: [BlackListDeleteDialogComponent]
            })
                .overrideTemplate(BlackListDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BlackListDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlackListService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
