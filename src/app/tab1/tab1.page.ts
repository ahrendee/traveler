import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { COUNTRIES } from '../graphql/queries';
import { CountriesService } from '../services/countries.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    public showMessage = false;

    public countriesList: [];
    public countriesSubscription: Subscription;
    public countriesForm: FormGroup;

    constructor(private apollo: Apollo,
                private formBuilder: FormBuilder,
                private router: Router,
                private countriesService: CountriesService) {

        this.countriesForm = this.formBuilder.group({
            start: ['', Validators.required],
            end: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.countriesSubscription = this.apollo.watchQuery<any>({
                query: COUNTRIES
            })
            .valueChanges.subscribe(result => {
                    this.countriesList = result.data.Country;
                    return result.data.Country;
                },
                error => {
                    console.log('error', error.message);
                });
    }

    onSubmit() {
        if (this.countriesForm.invalid) {
            this.showMessage = true;
            return;
        }
        this.showMessage = false;
        this.countriesService.start = this.countriesForm.value.start;
        this.countriesService.end = this.countriesForm.value.end;
        console.log('start: ', this.countriesService.start);
        console.log('end: ', this.countriesService.end);
        this.router.navigate(['tabs/tab2']);
    }
}
