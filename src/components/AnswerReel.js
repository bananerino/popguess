import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card.js";


export default function AnswerReel(props) {

    const { answers } = props

    return (
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
    )
}
