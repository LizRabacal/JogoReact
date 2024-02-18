import React, { useRef, useState } from 'react'
import './Game.css'

const Game = ({ func, palavra, tema,
  letras,
  letrasacertadas,
  letraserradas,
  tentativas,
  score }) => {



  const [letrinha, setLetrinha] = useState("")
  const ref = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    func(letrinha)
    setLetrinha("")
    ref.current.focus();
  }






  return (

    <div className="game">
      <p className='points'> Pontuação: {score}</p>
      <h1>Adivinhe a palavra</h1>

      <section className="dica">
        Dica sobre a palavra: <span>{tema}</span>
      </section>

      <p>Vc ainda tem {tentativas} tentativas</p>

      <section className="LetrasContainer">
        {letras.map((l, i) => letrasacertadas.includes(l) ? <span key={i} className="letter">{l.toUpperCase()}</span> : <span key={i} className="letter"> </span>)}


      </section>

      <div className="guess">
        <p>Tente adivinhar um letra da palavra: </p>


        <form onSubmit={handleSubmit}>
          <input type="text" name="" maxLength={1} id="" onChange={(e) => setLetrinha(e.target.value)} value={letrinha} ref={ref} required />
          <button type="submit" value="Jogar" >JOGAR</button>
        </form>
      </div>

      <div className="wrongletras">
        <p>Letras já utilizadas:</p>
        {letraserradas.map((l, i) => <span key={i}>{l}</span>)}

      </div>
    </div>
  )
}

export default Game