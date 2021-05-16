import { useReducer } from "react"

interface State {
  copperCoin: number
  silverCoin: number
  goldCoin: number
  platinumCoin: number
}

interface AddOneCopperAction {
  type: "ADD_ONE_COPPER"
}

interface RemoveOneCopperAction {
  type: "REMOVE_ONE_COPPER"
}

interface AddSomeCopperAction {
  type: "ADD_SOME_COPPER"
  someCopper: number
}

interface RemoveSomeCopperAction {
  type: "REMOVE_SOME_COPPER"
  someCopper: number
}

type Action =
  | AddOneCopperAction
  | RemoveOneCopperAction
  | AddSomeCopperAction
  | RemoveSomeCopperAction

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_ONE_COPPER": {
      const coinsToAdd = 1
      const totalCopperCoins =
        coinsToAdd +
        state.copperCoin +
        state.silverCoin * 100 +
        state.goldCoin * 10000 +
        state.platinumCoin * 1000000

      const newCoins = {
        copperCoin: Math.trunc(totalCopperCoins % 100),
        silverCoin: Math.trunc((totalCopperCoins / 100) % 100),
        goldCoin: Math.trunc((totalCopperCoins / 10000) % 100),
        platinumCoin: Math.trunc(totalCopperCoins / 1000000),
      }

      return {
        ...state,
        ...newCoins,
      }
    }

    case "ADD_SOME_COPPER": {
      const totalCopperCoins =
        action.someCopper +
        state.copperCoin +
        state.silverCoin * 100 +
        state.goldCoin * 10000 +
        state.platinumCoin * 1000000

      const newCoins = {
        copperCoin: Math.trunc(totalCopperCoins % 100),
        silverCoin: Math.trunc((totalCopperCoins / 100) % 100),
        goldCoin: Math.trunc((totalCopperCoins / 10000) % 100),
        platinumCoin: Math.trunc(totalCopperCoins / 1000000),
      }

      return {
        ...state,
        ...newCoins,
      }
    }

    case "REMOVE_ONE_COPPER": {
      const coinsToRemove = 1
      const totalCopperCoins =
        state.copperCoin +
        state.silverCoin * 100 +
        state.goldCoin * 10000 +
        state.platinumCoin * 1000000 -
        coinsToRemove

      if (totalCopperCoins < 0) {
        return {
          copperCoin: 0,
          silverCoin: 0,
          goldCoin: 0,
          platinumCoin: 0,
        }
      }

      const newCoins = {
        copperCoin: Math.trunc(totalCopperCoins % 100),
        silverCoin: Math.trunc((totalCopperCoins / 100) % 100),
        goldCoin: Math.trunc((totalCopperCoins / 10000) % 100),
        platinumCoin: Math.trunc(totalCopperCoins / 1000000),
      }

      return {
        ...newCoins,
      }
    }

    case "REMOVE_SOME_COPPER": {
      const totalCopperCoins =
        state.copperCoin +
        state.silverCoin * 100 +
        state.goldCoin * 10000 +
        state.platinumCoin * 1000000 -
        action.someCopper

      if (totalCopperCoins < 0) {
        return {
          copperCoin: 0,
          silverCoin: 0,
          goldCoin: 0,
          platinumCoin: 0,
        }
      }

      const newCoins = {
        copperCoin: Math.trunc(totalCopperCoins % 100),
        silverCoin: Math.trunc((totalCopperCoins / 100) % 100),
        goldCoin: Math.trunc((totalCopperCoins / 10000) % 100),
        platinumCoin: Math.trunc(totalCopperCoins / 1000000),
      }

      return {
        ...newCoins,
      }
    }

    default: {
      return state
    }
  }
}

export const useMoneyReducer = (startingState?: State) => {
  const baseState = {
    copperCoin: 0,
    silverCoin: 0,
    goldCoin: 0,
    platinumCoin: 0,
  }
  return useReducer(reducer, startingState ?? baseState)
}
