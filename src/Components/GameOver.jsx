import React from 'react'
import './GameOver.css'

const GameOver = ({func, score}) => {
  return (
    <div><h1>Game over</h1>
    <h2>A sua pontuação foi: <span>{score}</span></h2>
    <button onClick={func}>TENTAR DE NOVO</button>
    
    </div>
    
  )
}

export default GameOver