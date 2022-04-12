// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// function Name({name, onNameChange}) {
// Extra credit 1
function Name() {
  // Extra credit 1
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

// 🐨 uncomment this
// function Display({name, animal}) {

// Extra credit 1
function Display({animal}) {
  // return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>

  // Extra credit 1
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      {/* <Name name={name} onNameChange={event => setName(event.target.value)} /> */}
      {/* Extra credit 1 */}
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      {/* 🐨 pass the animal prop here */}
      {/* <Display name={name} animal={animal} /> */}

      {/* Extra credit 1 */}
      <Display animal={animal} />
    </form>
  )
}

export default App
