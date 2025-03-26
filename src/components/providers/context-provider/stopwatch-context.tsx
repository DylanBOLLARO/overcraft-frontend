'use client'

import { useContext, createContext, useState, useEffect, useRef } from 'react'

const StopwatchContext = createContext<any>(undefined)

export const StopwatchProvider = ({ children }: any) => {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef<any>(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime((Date.now() - startTimeRef.current) * 10)
            }, 100)
        }

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning])

    function start() {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
    }

    function stop() {
        setIsRunning(false)
    }

    function reset() {
        setElapsedTime(0)
        setIsRunning(false)
    }

    function formatTime() {
        let minutes: any = Math.floor((elapsedTime / (1000 * 60)) % 60)
        let seconds: any = Math.floor((elapsedTime / 1000) % 60)

        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')

        return `${minutes}:${seconds}`
    }

    return (
        <StopwatchContext.Provider
            value={{ isRunning, elapsedTime, formatTime, start, stop, reset }}
        >
            {children}
        </StopwatchContext.Provider>
    )
}

export default StopwatchProvider

export const useStopwatch = () => {
    const stopwatchContext = useContext(StopwatchContext)
    if (stopwatchContext === undefined) {
        throw new Error('useStopwatch must be inside a StopwatchProvider')
    }
    return stopwatchContext
}
