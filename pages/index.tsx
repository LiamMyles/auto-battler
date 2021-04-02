import Head from "next/head"
import React, { useCallback, useState } from "react"

import { useGameLoop } from "Hooks/use-game-loop"
import { useMoneyReducer } from "Hooks/use-money-reducer"

const Home = () => {
  const [addCount, setAddCount] = useState(0)
  const [removeCount, setRemoveCount] = useState(0)
  const [state, dispatch] = useMoneyReducer({
    copperCoin: 0,
    silverCoin: 99,
    goldCoin: 99,
    platinumCoin: 0,
  })

  const logicToLoopAdd = useCallback(() => {
    setAddCount((previousCount) => {
      return previousCount + 1
    })
    dispatch({ type: "ADD_ONE_COPPER" })
  }, [dispatch])

  const logicToLoopRemove = useCallback(() => {
    setRemoveCount((previousCount) => {
      return previousCount + 1
    })
    dispatch({ type: "REMOVE_ONE_COPPER" })
  }, [dispatch])

  const { stopLoop: removeStopLoop, startLoop: removeStartLoop } = useGameLoop({
    logicToLoop: logicToLoopRemove,
    speed: 500,
  })

  const { stopLoop: addStopLoop, startLoop: addStartLoop } = useGameLoop({
    logicToLoop: logicToLoopAdd,
    speed: 100,
  })

  return (
    <>
      <Head>
        <title>Auto Battler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world</h1>
      <p>What is this going to become?</p>
      <p>Copper Added {addCount}</p>
      <p>Copper Removed {removeCount}</p>
      <h1>Coinage</h1>
      <p>Copper: {state.copperCoin}</p>
      <p>Silver: {state.silverCoin}</p>
      <p>Gold: {state.goldCoin}</p>
      <p>Platinum: {state.platinumCoin}</p>
      <button
        type="button"
        onClick={() => {
          removeStopLoop()
          addStopLoop()
        }}
      >
        Stop Me!
      </button>
      <button
        type="button"
        onClick={() => {
          removeStartLoop()
          addStartLoop()
        }}
      >
        Start Me!
      </button>
    </>
  )
}

export default Home
