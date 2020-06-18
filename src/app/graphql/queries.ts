import gql from 'graphql-tag';

export const SEARCH_COUNTRY = gql`
        query Countries($name: String!) {
          Country(filter: { name_contains: $name }) {
            alpha2Code
            name
          }
        }
`;

export const COUNTRIES = gql`
            {
                Country {
                       name
                       alpha2Code
                }
            }
        `;

export const SHORTEST_PATH = gql`
            query GetShortestPath($start: String!, $end: String!) {
                Country(alpha2Code: $start) {
                    name
                    alpha2Code
                    shortestPathToOtherCountry(otherCountryAlpha2Code: $end) {
                      name
                      alpha2Code
                      flag {
                        emoji
                      }
                    }
                }
            }
        `;

export const FULL_COUNTRY = gql`
            query FullCountry($alpha2Code: String!) {
                  Country(alpha2Code: $alpha2Code) {
                    alpha2Code
                    alpha3Code
                    area
                    capital
                    convertedArea {
                      value
                      unit
                      populationDensity
                    }
                    demonym
                    gini
                    location {
                      longitude
                      latitude
                    }
                    name
                    nameTranslation
                    nativeName
                    nameTranslations {
                      languageCode
                      value
                    }
                    numericCode
                    populationDensity
                    population
                    topLevelDomains {
                      name
                    }
                    callingCodes {
                      name
                    }
                    timezones {
                      name
                    }
                    borders {
                      name
                    }
                    subregion {
                      name
                      region {
                        name
                      }
                    }
                    officialLanguages {
                      name
                    }
                    currencies {
                      code
                      name
                      symbol
                    }
                    regionalBlocs {
                      name
                    }
                    flag {
                      emoji
                      svgFile
                    }
                  }
                }
        `;
