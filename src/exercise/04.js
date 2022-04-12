// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

const defaultSquares = Array(9).fill(null)

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
    </div>
  )
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  const [history, setHistory] = useLocalStorageState('history', [
    defaultSquares,
  ])

  // The derived state here does not use the useState hook. It is 'derived' in
  // the sense that it's value is calculated on each render based on the value
  // of some other piece of managed state.

  // Remember, state does not always involve the useState hook. State is just a
  // piece of data (a variable) that helps represents part of the current 'state'
  // of the component.

  const currentSquares = history[currentStep]
  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  const nextValue = calculateNextValue(currentSquares)
  // - winner ('X', 'O', or null)
  const winner = calculateWinner(currentSquares)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  const status = calculateStatus(winner, currentSquares, nextValue)

  const moves = history.map((_, step) => {
    const isFirst = step === 0
    const isCurrent = step === currentStep
    const btnText = isFirst
      ? 'Go to game start'
      : `Go to move #${step} ${isCurrent ? '(current)' : null}`

    return (
      <li key={step}>
        <button disabled={isCurrent} onClick={() => setCurrentStep(step)}>
          {btnText}
        </button>
      </li>
    )
  })

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || currentSquares[square]) {
      return
    }
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    const slicedHistory = history.slice(0, currentStep + 1)
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setHistory([...slicedHistory, squaresCopy])
    setCurrentStep(slicedHistory.length)
  }

  function restart() {
    // 🐨 reset the squares
    setHistory([defaultSquares])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        {/* onClick is the prop, not select square you dummy */}
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        {/* 🐨 put the status in the div below */}
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
