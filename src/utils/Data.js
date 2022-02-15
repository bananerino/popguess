import { nanoid } from "nanoid"

const axios = require("axios")

const query = `select%20%3Fcountry%20%3FcountryLabel%20%3Fpopulation%20%3Fflag%0AWHERE%7B%0A%20%20%3Fcountry%20wdt%3AP31%20wd%3AQ6256%20.%0A%20%20%3Fcountry%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcountry%20wdt%3AP41%20%3Fflag%20.%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%0A%20%20%20%20%7D%0A%7D`


// Receives raw data from Wikidata, passes it to generateCountryArray and sends back a new array
// of country objects

const getCountries = () => {
    const countries = []

    axios.get(`https://query.wikidata.org/sparql?query=${query}`)
        .then((res) => {
            const countryData = [...res.data.results.bindings]
            const countryArray = generateCountryArray(countryData)
            countries.push(...countryArray)
            
        })


    return countries
}

// Receives an array of raw data, creates & returns a new array of formatted country objects

function generateCountryArray(rawData) {

    const countries = []

    for (let i = 0; i < 42; i++) {

        let isDuplicate = true;

        while (isDuplicate) {
            const newCountry = createCountry(rawData[getRandom()])

            isDuplicate = checkDuplicate(newCountry, countries)
            if (!isDuplicate) {
                countries.push(newCountry)
            }
        }
    }
    return countries
}

// Creates and sends back an individual country object

function createCountry(rawCountry) {

    const newCountry = {

        name: rawCountry.countryLabel.value,
        flag: rawCountry.flag.value,
        population: parseInt(rawCountry.population.value),
        id: nanoid()

    }
    return newCountry
}

// Checks if the particular country is already in the countries array, sends
// back true / false

function checkDuplicate(country, countries) {
    const isDuplicate = countries.some(c => country.name === c.name)
    return isDuplicate
}

// Generates a random number, didn't really have to do it in a separate function
// to be honest

function getRandom() {

    const random = Math.ceil(Math.random() * 187)
    return random
}


export default getCountries;
