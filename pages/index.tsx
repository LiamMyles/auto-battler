import Head from "next/head"
import React, { useEffect, useRef, useState } from "react"

const Home = () => {
  const [count, setCount] = useState(0)
  const [timePassed, setTimePassed] = useState(0)
  const requestedAnimationId = useRef(0)
  const startTime = useRef(0)

  useEffect(() => {
    startTime.current = Date.now()
    const test = (currentTiming: number, lastRunTiming?: number) => {
      let newLastRunTiming = lastRunTiming ?? 0
      const speed = 100
      const secondsPassed = Math.round(
        Math.abs(startTime.current - Date.now()) / 1000
      )
      setTimePassed(secondsPassed)

      if (
        lastRunTiming === undefined ||
        currentTiming - lastRunTiming > speed
      ) {
        setCount((previousState) => previousState + 1)
        newLastRunTiming = currentTiming
      }

      requestedAnimationId.current = requestAnimationFrame(
        (newCurrentTiming) => {
          test(newCurrentTiming, newLastRunTiming)
        }
      )
    }

    requestAnimationFrame(test)
    return () => {
      cancelAnimationFrame(requestedAnimationId.current)
      setCount(0)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Auto Battler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world</h1>
      <p>What is this going to become?</p>
      <p>Loop Count {count}</p>
      <p>Time Passed {timePassed}</p>
      <p>Count a second {count / timePassed}</p>
    </>
  )
}

export default Home
