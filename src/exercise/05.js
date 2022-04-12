// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef()
  // useRef isn't use useful for accessing dom nodes. Any time we want to have
  // a reference to something and want to be able to change the value of it,
  // without triggering a re-render, we can use useRef. You can store anything
  // in useRef, much like useState, however, changes to a piece of state via
  // it's dispatch function will trigger re-renders. Again, changes to a refs
  // current value do not trigger re-renders.

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  React.useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
    // object to your DOM node to cleanup:
    return () => tiltNode.vanillaTilt.destroy()
    // Or return function cleanup() {...

    // We don't want this to be run on every render. Nothing about the event
    // handler is going to change and constantly removing/attatching these
    // event handlers could get expensive so we need a dependency array. But
    // what dependencies? Is the state of the world (in this case the state) of
    // our VanillaTilt init function dependant on any part of our applications
    // state? NO!. So we have an empty dependency array.
  }, [])

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
