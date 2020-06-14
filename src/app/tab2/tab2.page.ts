import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { SHORTEST_PATH } from '../graphql/queries';
import { CountriesService } from '../services/countries.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    public pathFound = true;
    public loading = false;

    public startCountryWithPath: any = {};
    public shortestPathSubscription: Subscription;

    constructor(private apollo: Apollo,
                private router: Router,
                private countriesService: CountriesService) {
    }

    ionViewDidEnter() {
        if (!this.countriesService.start) {
            this.router.navigate(['tabs/tab1']);
        } else {
            this.getCountries();
        }
    }

    getCountries() {
        this.pathFound = true;
        this.loading = true;
        this.shortestPathSubscription = this.apollo.watchQuery<any>({
                query: SHORTEST_PATH,
                variables: {
                    start: this.countriesService.start.alpha2Code,
                    end: this.countriesService.end.alpha2Code
                },
            })
            .valueChanges.subscribe(result => {
                    this.startCountryWithPath = result.data.Country[0];
                    console.log('this.startCountryWithPath', this.startCountryWithPath);

                    if (this.startCountryWithPath.shortestPathToOtherCountry.length === 0) {
                        console.log('Path not found');
                        this.pathFound = false;
                    }
                    this.loading = false;

                    return result.data.Country;
                },
                error => {
                    console.log('error', error.message);
                });
    }

    goToDetails(alpha2Code: string) {
        console.log('code: ', alpha2Code);
        this.countriesService.selectedCountry = alpha2Code;
        this.router.navigate(['tabs/tab3']);
    }
}
