import React from "react";

import { DragDropContext } from "react-beautiful-dnd";


import TopCard from "./TopCard.js";
import Header from "./Header.js";
import GameOver from "./GameOver.js";
import AnswerReel from "./AnswerReel.js";



import '../App.css';
import {getCountries} from "../utils/data.js"
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
    


    // Gets a new array of country objects and updates the 'countries' state

    React.useEffect(()=>{
        getCountries(setCountries)
        const newAnswers = []
        setAnswers(newAnswers)
        setLives(2)
        if (score > highScore){ 
            sethighScore(score)
        }
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
                    
                        <GameOver score={score} highScore={highScore}
                                  setgameOver={()=>setgameOver(false)}
                                  setScore={()=>setScore(0)}  />
                   
                }

                {!gameOver &&
                    <div id="game--container">
                        
                        <Header score={score} lives={lives} />
                        
                        <TopCard country={countries[0]} />

                        <hr></hr>

                        <AnswerReel answers={answers} />

                    </div>}

            </DragDropContext>
        </div>
    );

}
export default Game;