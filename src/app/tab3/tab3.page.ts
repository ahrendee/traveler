import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { FULL_COUNTRY } from '../graphql/queries';
import { StateService } from '../services/state.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    public fullCountry: any = {};

    private loading: boolean;
    private fullCountrySubscription: Subscription;

    constructor(private apollo: Apollo,
                private router: Router,
                private stateService: StateService) {
    }

    ionViewDidEnter() {
        if (!this.stateService.selectedCountry) {
            this.router.navigate(['tabs/tab1']);
        } else {
            this.getFullCountry();
        }
    }

    getFullCountry() {
        this.loading = true;
        this.fullCountrySubscription = this.apollo.watchQuery<any>({
                query: FULL_COUNTRY,
                variables: {
                    alpha2Code: this.stateService.selectedCountry
                },
            })
            .valueChanges.subscribe(result => {
                    this.fullCountry = result.data.Country[0];
                    console.log('this.fullCountry', this.fullCountry);
                    this.loading = false;

                    return result.data.Country;
                },
                error => {
                    console.log('error', error.message);
                });
    }
}
