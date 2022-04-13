// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {error}
//   }

//   render() {
//     const {error} = this.state
//     if (error) {
//       // You can render any custom fallback UI
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children
//   }
// }

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  // We can destructure these in the useState array.
  const [{status, pokemon, error}, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  // Or as constants after the fact.
  // const {status, pokemon, error} = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (!pokemonName) {
      return
    }

    // Don't need to use previous state here. Our render logic is smart
    // enough to prevent any mishaps, however it is important to note that
    // after the re-render trigger by this state update, pokemon and error will
    // no longer exist in the state object.
    setState({
      status: 'pending',
    })

    // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    fetchPokemon(pokemonName).then(
      pokemon => setState(prevState => ({pokemon, status: 'resolved'})),
      error => {
        setState({status: 'rejected', error})
      },
      // This syntax looks weird but there is a good reason for it. If we
      // handled this error with a .catch(), we would be handling two errors,
      // an error in the fetchPokemon promise and an error in the setPokemon
      // call. Since we know that there won't be an error thrown in the
      // setPokemon call, we can handle any errors from fetchPokemon by
      // using the second argument syntax of .then(). If you wanna play it
      // safe, use the .catch(), syntax.
    )
  }, [pokemonName])

  switch (status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    case 'rejected':
      throw error
    default:
      throw new Error('Something went really wrong. This should be unreachable')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
