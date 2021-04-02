import { renderHook, act } from "@testing-library/react-hooks"
import { useMoneyReducer } from "Hooks/use-money-reducer"

describe("useMoneyReducer", () => {
  it("should return expected default state", () => {
    const { result } = renderHook(() => useMoneyReducer())

    const expectedState = {
      copperCoin: 0,
      silverCoin: 0,
      goldCoin: 0,
      platinumCoin: 0,
    }

    const actualState = result.current[0]

    expect(actualState).toEqual(expectedState)
  })

  it("should return expected state when starting state passed", () => {
    const startingState = {
      copperCoin: 0,
      silverCoin: 99,
      goldCoin: 99,
      platinumCoin: 0,
    }

    const { result } = renderHook(() => useMoneyReducer(startingState))

    const actualState = result.current[0]

    expect(actualState).toEqual(startingState)
  })

  describe("Action ADD_ONE_COPPER", () => {
    it("should add one copperCoin when called", () => {
      const { result } = renderHook(() => useMoneyReducer())
      act(() => {
        result.current[1]({ type: "ADD_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectState = {
        copperCoin: 1,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectState)
    })
    it("should add 1 silverCoin when called 100 times", () => {
      const { result } = renderHook(() => useMoneyReducer())
      act(() => {
        let count = 1
        while (count <= 100) {
          result.current[1]({ type: "ADD_ONE_COPPER" })
          count++
        }
      })
      const actualState = result.current[0]

      const expectState = {
        copperCoin: 0,
        silverCoin: 1,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectState)
    })
    it("should turn 99 copperCoins into 1 silverCoin when called once", () => {
      const startingState = {
        copperCoin: 99,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "ADD_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectState = {
        copperCoin: 0,
        silverCoin: 1,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectState)
    })
    it("should turn 99 coperCoins and 99 silverCoins into 1 goldCoin when called once", () => {
      const startingState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 0,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "ADD_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 1,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should turn 99 coperCoins, 99 silverCoins and 99 goldCoin into 1 platinum coin when called", () => {
      const startingState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 99,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "ADD_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 1,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should turn 99 coperCoins, 99 silverCoins, 99 goldCoin and 99 platinum into 100 platinum coins when called", () => {
      const startingState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 99,
        platinumCoin: 99,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "ADD_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 100,
      }

      expect(actualState).toEqual(expectedState)
    })
  })

  describe("Action REMOVE_ONE_COPPER", () => {
    it("should never go below 0", () => {
      const startingState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should reduce 2 copperCoins to 1 copperCoin", () => {
      const startingState = {
        copperCoin: 2,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 1,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should reduce 1 silverCoin to 99 copperCoins", () => {
      const startingState = {
        copperCoin: 0,
        silverCoin: 1,
        goldCoin: 0,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 99,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should reduce 1 goldCoin to 99 silverCoins and 1 copperCoin", () => {
      const startingState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 1,
        platinumCoin: 0,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 0,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should reduce 1 platinumCoin to 99 goldCoins, 99 silverCoins and 1 copperCoin", () => {
      const startingState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 1,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 99,
        platinumCoin: 0,
      }

      expect(actualState).toEqual(expectedState)
    })
    it("should reduce 101 platinumCoin to 100 platinumCoin, 99 goldCoins, 99 silverCoins and 1 copperCoin", () => {
      const startingState = {
        copperCoin: 0,
        silverCoin: 0,
        goldCoin: 0,
        platinumCoin: 101,
      }

      const { result } = renderHook(() => useMoneyReducer(startingState))
      act(() => {
        result.current[1]({ type: "REMOVE_ONE_COPPER" })
      })
      const actualState = result.current[0]

      const expectedState = {
        copperCoin: 99,
        silverCoin: 99,
        goldCoin: 99,
        platinumCoin: 100,
      }

      expect(actualState).toEqual(expectedState)
    })
  })
})
