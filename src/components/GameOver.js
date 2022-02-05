import React from "react";

export default function GameOver(props){
    const {score , highScore } = props;
    return(
        <div>
        <h1>You scored {score}</h1>
        <h1>Your highest score : {highScore} </h1>
        </div>
    )
}