import { useState, useCallback, useEffect } from 'react'
import './App.css'
import StartScreen from './Components/StartScreen'

import { Words } from './Data/Words'
import Game from './Components/Game';
import GameOver from './Components/GameOver';


const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
];


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(Words)
  const [palavra, setPalavra] = useState("")
  const [tema, setTema] = useState("")
  const [letras, setLetras] = useState("")
  const [letrasacertadas, setLetrasAcertadas] = useState([])
  const [letraserradas, setLetrasErradas] = useState([])
  const [tentativas, setTentativas] = useState(3)
  const [score, setScore] = useState(0)
  const win = false;

  const pickLetraeTema = useCallback(() => {
    const categorias = Object.keys(words)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
    const palavra = words[categoria][Math.floor(Math.random() * words[categoria].length)]
    return { categoria, palavra }
  }, [Words])

  //comeca o jogo
  const StartGame = useCallback(() => {
    //escolhe palavra e tema

    /*     setLetrasAcertadas([])
        setLetrasErradas([])
        setTentativas(3)
        setScore(0) */


    const { palavra, categoria } = pickLetraeTema();
    let letras = palavra.split("")
    letras = letras.map((l) => l.toLowerCase());

    setPalavra(palavra);
    setTema(categoria);
    setLetras(letras);
    console.log(palavra)





    setGameStage(stages[1].name)
  }, [pickLetraeTema]);

  //verifica as letras

  const VerifyLetter = (e) => {
    e = e.toLowerCase()

    if (letrasacertadas.includes(e) || letraserradas.includes(e)) {
      alert("Letra já utilizada!");
    } else {
      if (letras.includes(e)) {
        setLetrasAcertadas((letraatual) => [
          ...letraatual, e
        ])



      } else {
        setLetrasErradas((letraatual) => [
          ...letraatual, e
        ])
        setTentativas((t) => t - 1);
      }
    }




    /*    setGameStage(stages[2].name) */

  }

///REINICIA VAR DE CONTROLE
  const reset = () => {
    setLetrasAcertadas([])
    setLetrasErradas([])
    setTentativas(3)
  }




  useEffect(() => {
    if (tentativas <= 0) {
      reset()

      setGameStage(stages[2].name)


    }

  }, [tentativas])





  useEffect(() => {
   let unic = [...new Set(letras)];
   if(letrasacertadas.length > 0){
   if(letrasacertadas.length == unic.length){
    alert("PARABÉNS!")
    setScore((s) => s+ 20);
    reset()
    StartGame()
    
   }
  }

    
  }, [letrasacertadas])










  //reinicia o jogo
  const retry = () => {
    setTentativas(3)
    setScore(0)
    setGameStage(stages[0].name)
  }





  return (
    <>
      <div className="App">



        {gameStage === 'start' && <StartScreen func={StartGame} />}
        {gameStage === 'game' && <Game
          func={VerifyLetter}
          palavra={palavra}
          tema={tema}
          letras={letras}
          letrasacertadas={letrasacertadas}
          letraserradas={letraserradas}
          tentativas={tentativas}
          score={score}
        />}
        {gameStage === 'end' && <GameOver func={retry} score={score} />}

 
   
      </div>

    </>
  )
}

export default App
