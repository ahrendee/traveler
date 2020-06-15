import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { StateService } from '../services/state.service';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
    let component: Tab1Page;
    let fixture: ComponentFixture<Tab1Page>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Tab1Page],
            imports: [IonicModule.forRoot(), RouterTestingModule],
            providers: [
                Apollo, FormBuilder, StateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Tab1Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
