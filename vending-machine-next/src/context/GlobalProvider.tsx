'use client'

import React, { createContext, useState } from 'react'

interface GlobalContext {
    currentCoin: number
    addCoin: (value: number) => void
    minusCoin: (value: number) => void

    logs: string[]
    addLogs: (log: string) => void
}

export const GlobalContext = createContext<GlobalContext>({
    currentCoin: 0,
    addCoin: (value: number) => {},
    minusCoin: (value: number) => {},
    logs: [],
    addLogs: (log: string) => {},
})

interface Props {
    children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    const [currentCoin, setCurrentCoin] = useState<number>(0)
    const [logs, setLogs] = useState<string[]>([])

    const addCoin = (value: number) => {
        setCurrentCoin((p) => p + value)
    }

    const minusCoin = (value: number) => {
        setCurrentCoin((p) => {
            return p - value < 0 ? 0 : p - value
        })
    }

    const addLogs = (log: string) => {
        setLogs((p) => [...p, log])
    }

    return <GlobalContext.Provider value={{ currentCoin, logs, addCoin, minusCoin, addLogs }}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
