import createMockRaf from "mock-raf"

import { renderHook, act } from "@testing-library/react-hooks"
import { useGameLoop } from "Hooks/use-game-loop"

async function timeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe("mock-raf", () => {
  const requestAnimationMock = jest.spyOn(window, "requestAnimationFrame")
  const mockRaf = createMockRaf()

  beforeEach(() => {
    requestAnimationMock.mockImplementation(mockRaf.raf)
  })
  afterEach(() => {
    requestAnimationMock.mockRestore()
  })
  it("should increment counter with and return length of time ran ", async () => {
    let valueToTest = 0

    const logicToLoop = () => {
      return valueToTest++
    }

    const { result } = renderHook(() =>
      useGameLoop({ logicToLoop, speed: 100 })
    )

    await act(async () => {
      mockRaf.step()
      await timeout(1000)
      mockRaf.step({ count: 10, time: 101 })
    })
    expect(valueToTest).toEqual(10)
    expect(result.current.secondsPassed).toEqual(1)
  })
})
