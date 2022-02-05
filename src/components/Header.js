import React from "react";

export default function Header(props){
    
    const {score , lives } = props
    
    return(
        <div id="header--container">
            <h2 id="score--game">Current score : {score}</h2>
            <div id="hearts">
                {lives <= 2 && <h2 className="heart">Lives: {"\u2764"}</h2>}
                {lives === 2 && <h2 className="heart">{"\u2764"}</h2>}
            </div>
                        
        </div>

    )
}
function renderHearts(lives){
    const hearts = [];
    for(let i=0;i<lives;i++){
        
            hearts.push(<h2>{"\u2764"}</h2>)
        
    }
    return hearts;
}

