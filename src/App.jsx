import { Children, useState } from "react"
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  
  /*Constante de estado con el tablero */
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  /* Constante de estado con el turno */
  const [turn, setTurn] = useState(TURNS.X)
  // Constante de estado para ganador. Si es null no hay ganador, si es flase hay empate
  const [winner, setWinner] = useState(null)
  
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  // Función para actualizar tablero. 
  const updateBoard = (index) => {
    /* Primero comprobamos si ya exite algo en esa casilla que hemos hecho click
    este If comprueba si la posicion del board tiene contenido. Si tiene contenido, al estar el return despues vacío
    se para la ejecución de la función. Si no es así, continua en la siguiente línea */
    if (board[index] || winner) return
    // Creamos un nuevo tablero copiando el que había para no modificar directamente el que tenemos.
    const newBoard = [...board]
    /* Modificamos la posicion del nuevo tablero y le damos el valor del turno
     en el que estamos: X/O. De esta forma cuando volvamos a renderizar, la casilla donde
     acabamamos de hacer click contendra el simbolo y lo imprimirá 
    */
    newBoard[index] = turn
    //Establecemos correctamente un nuevo estado con la nueva información.
    setBoard(newBoard)
    // Calculamos el nuevo turno y lo establecemos también
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  /** La función App renderiza un section.game que contiene todos los elementos del tablero
   * renderizados con el board.map
   * Cada uno de estos nueve elementos contiene dentro un elemento Square.
   * 
   * El siguiente section.turn muestra dos elementos Square (X / O), poniendo una clase 
   * específica al elemento que en ese momento tenga el turno.
  */

  return (
    <main className='board'>
      <h1>Tres en ralla</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>
      
    </main>

  )
}
export default App
