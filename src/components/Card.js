import React from "react";
import {useDrag} from "react-dnd";



export default function Card(props) {

    const { id , name , flag , population , correctGuess } = props
    console.log(correctGuess)
    const style = {
        backgroundColor : "#FF2D00"
    }
    return (
        <div id="card--div"  style={style}>
        
            <div className="card" id={id} >
                <img src={flag} className="card-img-top" />
                
                    <div className="card-body">
                        <h5 className="card-title" >{name}</h5>
                        
                        {population && <p className="card-text">{population}</p>}

                    </div>
            </div>
            </div>
       
    )
}