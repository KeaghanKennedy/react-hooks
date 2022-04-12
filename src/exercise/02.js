// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Extra credit 3/4
function useLocalStorageState(
  key,
  initialValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  // Extra credit 1
  const [state, setState] = React.useState(() => {
    const storedInitialValue = window.localStorage.getItem(key)
    if (storedInitialValue) {
      return deserialize(storedInitialValue)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  const prevKeyRef = React.useRef(key)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
    // })
    // Extra credit 2
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName}) {
  // 🐨 initialize the state to the value from localStorage
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') ?? initialName,
  // )

  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Jeff" />
}

export default App
