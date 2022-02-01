import React from "react";
import axios from "axios";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import Card from "./Card.js";


import '../App.css';
import getCountries from "../utils/Data.js"
import checkPopulation from "../utils/checkPopulation.js";

const query = `select%20%3Fcountry%20%3FcountryLabel%20%3Fpopulation%20%3Fflag%0AWHERE%7B%0A%20%20%3Fcountry%20wdt%3AP31%20wd%3AQ6256%20.%0A%20%20%3Fcountry%20wdt%3AP1082%20%3Fpopulation%20.%0A%20%20%3Fcountry%20wdt%3AP41%20%3Fflag%20.%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%0A%20%20%20%20%7D%0A%7D`

function Game() {

    const [countries, setCountries] = React.useState([{
        name: "",
        flag: "",
        population: 0,
        id: "",
        correctGuess: null

    }])
    const [answers, setAnswers] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [highScore, sethighScore] = React.useState(0)
    const [lives, setLives] = React.useState(2)
    const [gameOver, setgameOver] = React.useState(false)
    const [hasWon , sethasWon] = React.useState(false)



    React.useEffect(() => {
        axios.get(`https://query.wikidata.org/sparql?query=${query}`)
            .then((res) => {
                console.log("query sent")
                const newCountryArray = getCountries([...res.data.results.bindings])
                setCountries(newCountryArray)
            })
        const newAnswers = []
        setAnswers(newAnswers)
        setLives(2)
        if(score>highScore) {sethighScore(score)}
    }, [gameOver])

    React.useEffect(()=>{
        if(lives<1){
            setgameOver(true);
        }
    },[lives])
   

    function handleOnDragEnd(result) {
        const draggedCountry = countries.find(country => country.id === result.source.droppableId)
        const newCountries = countries.filter(country => country.id !== result.source.droppableId)
        const newAnswers = answers;
        const target = result.destination.index;
        if (!checkPopulation(draggedCountry.population, target, answers)) {
            setLives(lives - 1)
            draggedCountry.correctGuess = false;

        }
        if(checkPopulation(draggedCountry.population, target, answers)){
            setScore(score+1)
            draggedCountry.correctGuess = true;
        }
        setAnswers(newAnswers)
        setCountries(newCountries)
        
        newAnswers.splice(result.destination.index, 0, draggedCountry)
        newAnswers.sort(function (a, b) {
            return a.population - b.population
        })
        console.log(newAnswers)

    }

    return (
        <div>
            
            <DragDropContext onDragEnd={handleOnDragEnd}>

                {gameOver &&
                <div>
                    <div>Your score was {score}</div>
                    <div>Your current high score is {highScore}</div>
                    <button onClick={()=> {
                        setgameOver(false)
                        setScore(0)
                    }
                        }>play again</button>
                    </div>
                }

                {!gameOver && <div id="top--card--container">
                <h1>{lives}</h1>
                    <Droppable droppableId={countries[0].id}>

                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>


                                <Draggable key={countries[0].id} draggableId={countries[0].id} >
                                    {(provided) => {
                                        return (
                                            <div key={countries[0].id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <Card
                                                    name={countries[0].name}
                                                    correctGuess={countries[0].correctGuess}
                                                    key={countries[0].id}
                                                    id={countries[0].id}
                                                    flag={countries[0].flag}
                                                    population={countries[0].population}

                                                />
                                            </div>

                                        )
                                    }
                                    }
                                </Draggable>


                                {provided.placeholder}
                            </div>
                        )
                        }
                    </Droppable>
                </div>}
                <hr></hr>
                <div id="answers--container">
                    <Droppable droppableId="answers" direction="horizontal">


                        {(provided) => (

                            <ul {...provided.droppableProps} ref={provided.innerRef} className="list-group list-group-horizontal">
                                {answers.map((country, index) => {
                                    return (
                                        <Draggable key={country.id} draggableId={`${country.id}asda`} index={index}>
                                            {(provided) => {
                                                return (
                                                    <li key={country.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >

                                                        <Card
                                                            name={country.name}

                                                            key={country.id}
                                                            id={country.id}
                                                            flag={country.flag}
                                                            population={country.population}
                                                            correctGuess={country.correctGuess}
                                                        />


                                                    </li>

                                                )
                                            }
                                            }
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </ul>

                        )
                        }
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );

}
export default Game;