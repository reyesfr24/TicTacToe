import { WINNER_COMBOS } from "../constants"
export const checkWinner = (boardToChech) => {
    for (const combo of WINNER_COMBOS ) {
      const [a, b ,c] = combo
      if (
        boardToChech[a] &&
        boardToChech[a]===boardToChech[b] &&
        boardToChech[a]===boardToChech[c]
      ) {
        return boardToChech[a]
      }
    }
    // Si no hay ganador devolvemos null
    return null
  }
  
export const checkEndGame= (newBoard) => {
    /* Con every comprobamos todos los elementos de un Array en JavaScript verificando una condición.
     (square) es el nombre que le damos a cada elemento, después de la flecha => colocamos la condición.
     Si todo se cumple devolverá True */
    return newBoard.every((square) => square !== null)
  }