import Head from "next/head"
import React, { useCallback, useEffect, useReducer, useState } from "react"

import { useGameLoop } from "Hooks/use-game-loop"

interface Entity {
  attack: number
  health: number
}

type WinState = "tie" | "player" | "enemy"

interface BattleReducerState {
  player: Entity
  enemy: Entity
  round: number
  hasWinner: boolean
  whoWon: WinState
}

interface BattleTickAction {
  type: "BATTLE_TICK"
}

type BattleReducerActions = BattleTickAction

function battle(
  player: Entity,
  enemy: Entity,
  whoWon: WinState
): { player: Entity; enemy: Entity; whoWon: WinState } {
  const newPlayerHealth = player.health - enemy.attack
  const newEnemyHealth = enemy.health - player.attack

  let winner = whoWon
  if (newPlayerHealth <= 0 && newEnemyHealth <= 0) {
    winner = "tie"
  } else if (newPlayerHealth <= 0) {
    winner = "enemy"
  } else if (newEnemyHealth <= 0) {
    winner = "player"
  }

  return {
    player: { ...player, health: newPlayerHealth },
    enemy: { ...enemy, health: newEnemyHealth },
    whoWon: winner,
  }
}

function battleReducer(
  state: BattleReducerState,
  action: BattleReducerActions
): BattleReducerState {
  switch (action.type) {
    case "BATTLE_TICK": {
      console.log("battle")
      const newState = { ...state }
      const round = newState.round + 1
      const battleResults = battle(
        newState.player,
        newState.enemy,
        newState.whoWon
      )
      let hasWinner = newState.hasWinner
      if (battleResults.player.health <= 0 || battleResults.enemy.health <= 0) {
        hasWinner = true
      }
      return { ...newState, round, ...battleResults, hasWinner }
    }
  }
}
const startingState: BattleReducerState = {
  player: {
    attack: 1,
    health: 4,
  },
  enemy: {
    attack: 2,
    health: 2,
  },
  round: 0,
  hasWinner: false,
  whoWon: "tie",
}

function LetsDuel() {
  const [state, dispatch] = useReducer(battleReducer, startingState)
  const logicLoop = useCallback(() => {
    dispatch({ type: "BATTLE_TICK" })
  }, [dispatch])

  const { stopLoop, startLoop } = useGameLoop({
    logicToLoop: logicLoop,
    speed: 1000,
  })

  useEffect(() => {
    if (state.hasWinner) {
      stopLoop()
    }
  }, [stopLoop, state.hasWinner])

  return (
    <>
      <h1>BATTLE: Round {state.round}</h1>
      <h2>{state.hasWinner && state.whoWon}</h2>
      <hr />
      <h2>Player Attack: {state.player.attack}</h2>
      <h2>Player Health: {state.player.health}</h2>
      <hr />
      <h2>Enemy Attack: {state.enemy.attack}</h2>
      <h2>Enemy Health: {state.enemy.health}</h2>
      <hr />
      <button
        type="button"
        onClick={() => {
          stopLoop()
        }}
      >
        Stop Me!
      </button>
      <button
        type="button"
        onClick={() => {
          startLoop()
        }}
      >
        Start Me!
      </button>
    </>
  )
}

const Battle = () => {
  const [hide, setHide] = useState(true)
  return (
    <>
      <Head>
        <title>Auto Battler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hide !== true && <LetsDuel />}
      <button
        onClick={() => {
          setHide(!hide)
        }}
      >
        Show?
      </button>
    </>
  )
}

export default Battle
