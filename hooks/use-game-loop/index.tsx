import { useEffect, useRef, useState } from "react"

interface UseGameLoop {
  logicToLoop: () => void
  extraCleanUp?: () => void
  speed: number
}

export const useGameLoop = ({
  logicToLoop,
  extraCleanUp,
  speed,
}: UseGameLoop) => {
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [playLoop, setPlayLoop] = useState(true)
  const requestedAnimationId = useRef(0)
  const startTime = useRef(0)

  useEffect(() => {
    console.log("we changed")
    startTime.current = Date.now()

    if (requestedAnimationId.current !== 0) {
      cancelAnimationFrame(requestedAnimationId.current)
    }

    const gameLoop = (currentTiming: number, lastRunTiming: number) => {
      const secondsPassed = Math.round(
        Math.abs(startTime.current - Date.now()) / 1000
      )
      setSecondsPassed(secondsPassed)

      let newLastRunTiming = lastRunTiming

      if (currentTiming - lastRunTiming > speed) {
        logicToLoop()
        newLastRunTiming = currentTiming
      }

      if (playLoop) {
        requestedAnimationId.current = requestAnimationFrame(
          (newCurrentTiming) => {
            gameLoop(newCurrentTiming, newLastRunTiming)
          }
        )
      }
    }

    if (playLoop) {
      requestAnimationFrame((newCurrentTiming) => {
        gameLoop(newCurrentTiming, newCurrentTiming)
      })
    }

    return () => {
      cancelAnimationFrame(requestedAnimationId.current)
    }
  }, [logicToLoop, extraCleanUp, speed, playLoop])

  const stopLoop = () => {
    setPlayLoop(false)
  }

  const startLoop = () => {
    setPlayLoop(true)
  }

  return { secondsPassed, stopLoop, startLoop }
}
