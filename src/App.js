import React from "react";

import './App.css';

import Game from "./components/Game.js";
import Footer from "./components/Footer.js";



function App() {
  const [isPlaying, setIsplaying] = React.useState(false)
  return (

    <main>
      
      {!isPlaying && <div className="initial--screen">
        <h1 className="initial--h1">Welcome to GAME</h1>
        <p className="description--p">The goal of the game is to sort the countries in an ascending order
          based on their respective population
        </p>
        <button onClick={() => setIsplaying(true)} className="start--button"> Start game </button>
        
        </div>}

      {isPlaying && <Game />}
      <Footer />
    </main>

  )
}

export default App;
