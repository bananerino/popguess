import React from "react";

export default function Card(props) {

    const { id, name, flag, population, correctGuess } = props

    // let color

    // if (correctGuess) {
    //     color = "#52bf90"
    // }
    // if (correctGuess === false) {
    //     color = "#fe5757"
    // }

    return (
        <div id="card--div">

            <div className="card m-0 border-0 rounded bg-transparent font-weight-bold mh-100" id={id} >
                
                    <img src={flag} className="card-img-top" id="card--image"/>
                    
                    <div className="card-body bg-white p-2">
                        <h5 className="card-title  mb-0 align-middle text-center" >{name}</h5>
                    </div>
                        
                        {correctGuess && <p className="card-footer bg-success text-white text-center m-0 p-1 ">{population}</p>}
                        {correctGuess === false && <p className="card-footer bg-danger text-white text-center m-0 p-1">{population}</p>}
                    
                
            </div>
        </div>

    )
}

