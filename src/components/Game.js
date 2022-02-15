import React from "react";
import axios from "axios";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import Card from "./Card.js";
import Header from "./Header.js";
import GameOver from "./GameOver.js";



import '../App.css';
import getCountries from "../utils/data.js"
import checkPopulation from "../utils/checkPopulation.js";


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
    const [countriesLoaded , setcountriesLoaded ] = React.useState(false)


    // Gets a new array of country objects and updates the 'countries' state

    React.useEffect(() => {
        setCountries(()=>{
            const newCountries = getCountries();
            return newCountries;
        })        
        const newAnswers = []
        setAnswers(newAnswers)
        setLives(2)
        
        if (score > highScore) { sethighScore(score) }
    }, [gameOver])

    // Gives time for the API call to finish before rendering the components to avoid errors

    React.useEffect(()=>{
        setTimeout(()=>{
            setcountriesLoaded(true)
        },1500)        
    },[gameOver])

    // Sets 'gameOver' state to true if 'lives' reaches 0

    React.useEffect(() => {
        if (lives < 1) {
            setgameOver(true);
        }
    }, [lives])

    // Handles the dnd functionality, checks if it was dropped in the correct place,
    // removes the current country from the 'countries' state, updates the 'answers' & 'lives' states

    function handleOnDragEnd(result) {
        const draggedCountry = countries.find(country => country.id === result.source.droppableId)
        const newCountries = countries.filter(country => country.id !== result.source.droppableId)
        const newAnswers = answers;
        const target = result.destination.index;
        if (!checkPopulation(draggedCountry.population, target, answers)) {
            setLives(lives - 1)
            draggedCountry.correctGuess = false;

        }
        if (checkPopulation(draggedCountry.population, target, answers)) {
            setScore(score + 1)
            draggedCountry.correctGuess = true;
        }
        setAnswers(newAnswers)
        setCountries(newCountries)

        newAnswers.splice(result.destination.index, 0, draggedCountry)
        newAnswers.sort(function (a, b) {
            return a.population - b.population
        })

    }

    return (
        <div>

            <DragDropContext onDragEnd={handleOnDragEnd}>

                {gameOver &&
                    <div id="gameover--screen">
                        <GameOver score={score} highScore={highScore} />

                        <button className="start--button" onClick={() => {
                            setgameOver(false)
                            setcountriesLoaded(false)
                            setScore(0)
                        }
                        }>PLAY AGAIN</button>
                    </div>
                }

                {!gameOver &&
                    <div id="game--container">
                        
                        <Header score={score} lives={lives} />
                        <div id="top--card--container">

                            
                            {countriesLoaded && <Droppable droppableId={countries[0].id} >
                            
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} id="top--card--div">


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
                            </Droppable>}
                        </div>

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
                                                            <li key={country.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="list-group-item p-0 mx-2 bg-transparent border-0">

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

                    </div>}

            </DragDropContext>
        </div>
    );

}
export default Game;