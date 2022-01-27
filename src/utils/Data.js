import { nanoid } from "nanoid"
const axios = require("axios")

const query = `SELECT%20%3Fcity%20%3FcityLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcity%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcity%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcity%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`


const getCities = (rawData) => {
    const cities = []

    for (let i = 0; i < 20; i++) {
        let rawCity = rawData[getRandom()]

        const newCity = {

            name: rawCity.cityLabel.value,
            country: rawCity.countryLabel.value,
            image: rawCity.photo.value,
            population: rawCity.population.value,
            dropped : false,
            id : nanoid()

        }
        cities.push(newCity)
    }

return cities
}

// const getCities = (rawData) => {

//     const cities = []

//     axios.get(`https://query.wikidata.org/sparql?query=${query}`)
//         .then((res) => {
//             const rawData = [...res.data.results.bindings]
//             for (let i = 0; i < 20; i++) {
//                 let rawCity = rawData[getRandom()]

//                 const newCity = {

//                     name: rawCity.cityLabel.value,
//                     country: rawCity.countryLabel.value,
//                     image: rawCity.photo.value,
//                     population: rawCity.population.value

//                 }
//                 cities.push(newCity)
//             }
// })
// console.log(cities)
// return cities
// }



function getRandom() {

    const random = Math.ceil(Math.random() * 663)
    return random
}


export default getCities;
