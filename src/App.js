import React from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DragDropContext, Droppable , Draggable } from "react-beautiful-dnd";


import Card from "./components/Card.js";


import './App.css';
import getCountries from "./utils/Data.js"
import checkPopulation from "./utils/checkPopulation.js";



// const query = `SELECT%20%3Fcountry%20%3FcountryLabel%20%3Fpopulation%20%3FcountryLabel%20%3Fphoto%0AWHERE%20%7B%0A%20%20%3Fcountry%20wdt%3AP31%20wd%3AQ1637706%20.%0A%20%20%3Fcountry%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcountry%20wdt%3AP17%20%3Fcountry%20.%0A%20%20%3Fcountry%20wdt%3AP18%20%3Fphoto%20.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"en"%20%7D.%0A%20%20%20%20%20%20%20%20%7D`

const query = `select%20%3Fcountry%20%3FcountryLabel%20%3Fpopulation%20%3Fflag%0AWHERE%7B%0A%20%20%3Fcountry%20wdt%3AP31%20wd%3AQ6256%20.%0A%20%20%3Fcountry%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcountry%20wdt%3AP41%20%3Fflag%20.%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%0A%20%20%20%20%7D%0A%7D`

function App() {

  const [countries, setCountries] = React.useState([{
    name: "",
    flag: "",
    population: 0,
    id: ""

  }])

  const [answers , setAnswers ] = React.useState([])

  React.useEffect(() => {
    axios.get(`https://query.wikidata.org/sparql?query=${query}`)
      .then((res) => {
        
        const newCountryArray = getCountries([...res.data.results.bindings])
        setCountries(newCountryArray)
      })

  }, [])

function handleOnDragEnd(result){
  const draggedCountry = countries.find(country => country.id === result.source.droppableId)
  const newCountries = countries.filter(country => country.id !== result.source.droppableId)
  const newAnswers = answers;
  
  checkPopulation(draggedCountry.population,result.destination.index,answers)
  
  setAnswers(newAnswers)
  setCountries(newCountries)
  newAnswers.splice(result.destination.index,0,draggedCountry)
}


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      
      <Droppable  droppableId={countries[0].id}>
        {/* <Card name={countries[0].name} country={countries[0].country} image={countries[0].image} id={countries[0].id}/> */}

        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            
              
                <Draggable key={countries[0].id} draggableId={countries[0].id} >
                  {(provided) => {
                    return(
                <div key={countries[0].id} {...provided.draggableProps} {...provided.dragHandleProps}ref={provided.innerRef}>
                  <Card 
                  name={countries[0].name} 
                  
                  key={countries[0].id}
                  id={countries[0].id}
                  flag={countries[0].flag}
                  population={countries[0].population}
                  />
                </div>
                
                    )}
                }
                </Draggable>
              
            
            {provided.placeholder}
        </div>
        )
        }
      </Droppable>
      <hr></hr>
      <Droppable  droppableId="answers">
        

        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {answers.map((country,index) => {
              return(
                <Draggable key={country.id} draggableId={`${country.id}asda`} index={index }>
                  {(provided) => {
                    return(
                <li key={country.id} {...provided.draggableProps} {...provided.dragHandleProps}ref={provided.innerRef}>
                  <Card 
                  name={country.name} 
                  
                  key={country.id}
                  id={country.id}
                  flag={country.flag}
                  population={country.population}
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
