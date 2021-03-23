import Head from "next/head"
import React, { useCallback, useState } from "react"

import { useGameLoop } from "Hooks/use-game-loop"

const Home = () => {
  const [count, setCount] = useState(0)

  const logicToLoop = useCallback(() => {
    setCount((previousState) => previousState + 1)
  }, [setCount])

  const { secondsPassed, stopLoop, startLoop } = useGameLoop({
    logicToLoop,
    speed: 1000,
  })

  return (
    <>
      <Head>
        <title>Auto Battler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world</h1>
      <p>What is this going to become?</p>
      <p>Loop Count {count}</p>
      <p>Time Passed {secondsPassed}</p>
      <p>Count a second {count / secondsPassed}</p>
      <button
        type="button"
        onClick={() => {
          setCount(0)
          stopLoop()
        }}
      >
        Stop Me!
      </button>
      <button
        type="button"
        onClick={() => {
          setCount(0)
          startLoop()
        }}
      >
        Start Me!
      </button>
    </>
  )
}

export default Home
