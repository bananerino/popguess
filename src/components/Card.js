import React from "react";

export default function Card(props) {

    const { id, name, flag, population, correctGuess } = props

    let color

    if (correctGuess) {
        color = "#52bf90"
    }
    if (correctGuess === false) {
        color = "#fe5757"
    }

    return (
        <div id="card--div">

            <div className="card rounded h-100" id={id} >
                
                    <img src={flag} className="card-img-top h-45" />
                    <div style={{backgroundColor : color}}>
                    <div className="card-body">
                        <h5 className="card-title" >{name}</h5>

                        {/* {renderPopulation} */}
                        {correctGuess && <p className="card-text">{population}</p>}
                        {correctGuess === false && <p className="card-text">{population}</p>}
                    </div>
                </div>
            </div>
        </div>

    )
}

