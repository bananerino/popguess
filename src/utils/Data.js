import { nanoid } from "nanoid"

// Receives raw data from Game.js and sends back a new array of modified countries

const getCountries = (rawData) => {
    const countries = []

    for (let i = 0; i < 42; i++) {
        let duplicateCheck = true;
        while(duplicateCheck){
            const newCountry = createCountry(rawData)
            duplicateCheck = checkDuplicate(newCountry,countries)
            if(!duplicateCheck){
                countries.push(newCountry)
            }
        }
    }
    return countries
}

// Checks if the particular country is already in the countries array, sends
// back true / false

function checkDuplicate(country, countries) {
    const isDuplicate = countries.some(c => country.name === c.name)
    return isDuplicate
}

// Creates and sends back country objects

function createCountry(rawData){
    const rawCountry = rawData[getRandom()]
            const newCountry = {

                name: rawCountry.countryLabel.value,

                flag: rawCountry.flag.value,
                population: parseInt(rawCountry.population.value),
                id: nanoid()

            }
    return newCountry
}

// Generates a random number, didn't really have to do it in a separate function
// to be honest

function getRandom() {

    const random = Math.ceil(Math.random() * 187)
    return random
}


export default getCountries;
