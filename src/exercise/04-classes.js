// useState: tic tac toe
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/04-classes.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )

  // React.useEffect(() => {
  //   window.localStorage.setItem('squares', JSON.stringify(squares))
  // This was tricky. Look at the contents of this componentDidUpdate hook.
  // It's checking to see if the value of the squares state has changed between
  // renders. If it has, it is updating the localStorage. However we don't
  // need this in hooks land. That's what useEffect does by default with it's
  // dependency array. This looked more complicated than it was because the
  // hooks implementation requires so fewer lines of code.
  //
  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.squares !== this.state.squares) {
  //       this.updateLocalStorage()
  //     }
  //   }
  //
  // REMEMBER. useEffect IS THE POINT IN YOUR FUNCTION THAT YOU HANDLE 'SIDE
  // EFFECTS', SIDE EFFECTS BEING WAYS TO SYNCHRONIZE THE STATE OF YOUR APP
  // WITH THE STATE OF THE WORLD.
  // }, [squares])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  let status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    const nextValue = calculateNextValue(squares)
    if (calculateWinner(squares) || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
