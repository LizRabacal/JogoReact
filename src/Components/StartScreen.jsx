import React from 'react'
import './StartScreen.css'


const StartScreen = ({ func } ) => {
  return (
    <div className='SC'>
          <h1>Roda Roda Jequiti 2.0</h1>
<p>Clique no botão para começar!</p>
      <button onClick={func}>COMEÇAR O JOGO</button>
  
    </div>
  )
}

export default StartScreen