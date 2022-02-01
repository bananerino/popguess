import { nanoid } from "nanoid"
const axios = require("axios")

const query = `SELECT%20%3Fcity%20%3FcityLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcity%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcity%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcity%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`


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
function checkDuplicate(country, countries) {
    const isDuplicate = countries.some(c => country.name === c.name)
    return isDuplicate
}
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

function getRandom() {

    const random = Math.ceil(Math.random() * 187)
    return random
}


export default getCountries;
