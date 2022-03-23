import React from "react";
import Card from "./Card";
import {  Droppable, Draggable } from "react-beautiful-dnd";

export default function TopCard(props){
    
    const {country} = props;

    return(
        <div id="top--card--container">

                            
                            <Droppable droppableId={country.id} >
                            
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} id="top--card--div">


                                        <Draggable key={country.id} draggableId={country.id} >
                                            {(provided) => {
                                                return (
                                                    <div key={country.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card
                                                            name={country.name}
                                                            correctGuess={country.correctGuess}
                                                            key={country.id}
                                                            id={country.id}
                                                            flag={country.flag}
                                                            population={country.population}

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
                        </div>
    )
}