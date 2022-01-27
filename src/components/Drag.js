// import React from "react";
// import Card from "./Card.js";
// import {useDrop} from "react-dnd";
// import axios from "axios";

// import getCities from "../utils/Data.js"



// const query = `SELECT%20%3Fcity%20%3FcityLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcity%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcity%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcity%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`



// export default function Drag(){

//     const query = `SELECT%20%3Fcity%20%3FcityLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcity%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcity%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcity%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`


//     const [cities, setCities] = React.useState([{
//         name: "",
//         image: "",
//         country: "",
//         population: 0,
//         dropped: false,
//         id : ""
    
//       }])

//       React.useEffect(() => {
//         axios.get(`https://query.wikidata.org/sparql?query=${query}`)
//           .then((res) => {
//             const newCityArray = getCities([...res.data.results.bindings])
//             setCities(newCityArray)
//           })
    
//       }, [])
     


//     const [reel, setReel ] = React.useState([{}])
//     // const {name,id,image,country,population} = props.city
    
//     const [{isOver},drop] = useDrop(()=>({
//         accept: "image",
//     drop: (item) => dropCard(item.id),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//     function dropCard(cardId){
        
//         console.log(cardId)
//     }

    

//     return(
//         <>
//         <div className="cityCard">
//             <Card name={cities[0].name} id={cities[0].id} country={cities[0].country} image={cities[0].image} />
//         </div>
//         <div className="answerReel" ref={drop}> Drop </div>
            
//         </>
//     )
// }