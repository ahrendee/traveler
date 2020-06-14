import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    // step 1
    start: any;
    end: any;

    // step 2
    pathFound: boolean;

    // step 3
    selectedCountry: string;

    constructor() {
    }
}
