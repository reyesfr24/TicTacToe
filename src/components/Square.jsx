/* Elemento Square que nos servira para crear las casillas del tablero. Recibe
Props necesarios como el children, el turno o la función para actualizar el juego */
export const Square = ({children, isSelected, updateBoard, index}) => {
    /* Con esta constante cambiamos dinámicamente la clase utilizada en el Square de
    section.turn. Nos ayuda a resaltar el Square que muestra el turno de la partida */
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
      updateBoard(index)
    }
    /* Contenido que renderiza un elemento Square. Una etiqueta div con la clase que necesite
    cada elemento y el contenido que contenga dentro cada Square */
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }