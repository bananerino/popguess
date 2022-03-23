import React from "react";

export default function GameOver(props){
    const {score , highScore } = props;

    const restart = () =>{
        props.setgameOver();
        props.setScore();
    }


    return(
        <div id="gameover--screen">
        <h1>You scored {score}</h1>
        <h1>Your highest score is {highScore} </h1>
        <button className="start--button" onClick={restart}>
                        PLAY AGAIN
                        </button>
        </div>
    )
}