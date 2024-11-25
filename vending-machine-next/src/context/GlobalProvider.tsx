'use client'

import React, { createContext, useEffect, useState } from 'react'

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
        if (currentCoin + value > 1000000) {
            alert('투입 가능한 최대 금액은 1,000,000원 입니다.')
            return
        }

        setCurrentCoin((p) => p + value)
        addLogs(`${value.toLocaleString()}원을 투입했습니다.`)
    }

    const minusCoin = (value: number) => {
        const refundCoin = currentCoin - value < 0 ? currentCoin : value

        setCurrentCoin((p) => {
            return p - value < 0 ? 0 : p - value
        })

        refundCoin && addLogs(`${refundCoin.toLocaleString()}원을 반환합니다.`)
    }

    const addLogs = (log: string) => {
        setLogs((p) => [...p, log])
    }

    useEffect(() => {
        console.log({ currentCoin })
        console.log({ logs })
    }, [logs, currentCoin])

    return <GlobalContext.Provider value={{ currentCoin, logs, addCoin, minusCoin, addLogs }}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
