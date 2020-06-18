import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SEARCH_COUNTRY } from '../graphql/queries';
import { StateService } from '../services/state.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    public showMessage = false;

    public input: FormControl;
    public departCountriesList: Observable<any[]>;
    public destinationCountriesList: Observable<any[]>;
    public countriesForm: FormGroup;

    constructor(private apollo: Apollo,
                private formBuilder: FormBuilder,
                private router: Router,
                private stateService: StateService) {

        this.countriesForm = this.formBuilder.group({
            start: ['', Validators.required],
            end: ['', Validators.required],
            inputDepart: [''],
            inputDestination: [''],
        });
    }

    ngOnInit(): void {
    }

    updateDepart() {
        const input = this.capitalize(this.countriesForm.value.inputDepart);
        this.departCountriesList = this.apollo.query<any>({
                query: SEARCH_COUNTRY,
                variables: {
                    name: input
                }
            })
            .pipe(
                map(result => {
                    return result.data.Country;
                })
            );
    }

    updateDestination() {
        const input = this.capitalize(this.countriesForm.value.inputDestination);
        this.destinationCountriesList = this.apollo.query<any>({
                query: SEARCH_COUNTRY,
                variables: {
                    name: input
                }
            })
            .pipe(
                map(result => {
                    return result.data.Country;
                })
            );
    }

    capitalize(input: string) {
        const result = input.charAt(0).toUpperCase() + input.slice(1);
        console.log('capitalize: ', result);
        return result;
    }

    resetForm() {
        this.countriesForm.controls['inputDepart'].setValue('');
        this.countriesForm.controls['inputDestination'].setValue('');
    }

    onSubmit() {
        if (this.countriesForm.invalid) {
            this.showMessage = true;
            return;
        }
        this.showMessage = false;
        this.stateService.start = this.countriesForm.value.start;
        this.stateService.end = this.countriesForm.value.end;
        console.log('start: ', this.stateService.start);
        console.log('end: ', this.stateService.end);
        this.router.navigate(['tabs/tab2']);
    }
}
