import React from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DragDropContext, Droppable , Draggable } from "react-beautiful-dnd";


import Card from "./components/Card.js";
import Reel from "./components/Reel.js";
import Drag from "./components/Drag.js";

import './App.css';
import getCities from "./utils/Data.js"



const query = `SELECT%20%3Fcity%20%3FcityLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcity%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcity%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcity%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcity%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`



function App() {

  const [cities, setCities] = React.useState([{
    name: "",
    image: "",
    country: "",
    population: 0,
    dropped: false,
    id: ""

  }])

  React.useEffect(() => {
    axios.get(`https://query.wikidata.org/sparql?query=${query}`)
      .then((res) => {
        const newCityArray = getCities([...res.data.results.bindings])
        setCities(newCityArray)
      })

  }, [])

function handleOnDragEnd(result){
  
  const items = Array.from(cities);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setCities(items);
}

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable  droppableId="cities">
        {/* <Card name={cities[0].name} country={cities[0].country} image={cities[0].image} id={cities[0].id}/> */}

        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {cities.map((city,index) => {
              return(
                <Draggable key={city.id} draggableId={city.id} index={index }>
                  {(provided) => {
                    return(
                <li key={city.id} {...provided.draggableProps} {...provided.dragHandleProps}ref={provided.innerRef}>
                  <Card 
                  name={city.name} 
                  country={city.country} 
                  key={city.id}
                  id={city.id}
                  image={city.image}
                  />
                </li>
                
                    )}
                }
                </Draggable>
              )
            })}
            {provided.placeholder}
        </ul>
        )
        }
      </Droppable>
    </DragDropContext>
  );
}

export default App;
