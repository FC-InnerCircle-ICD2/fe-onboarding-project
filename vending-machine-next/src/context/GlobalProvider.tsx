'use client'

import { ItemModel } from '@/model/item'
import React, { createContext, useEffect, useState } from 'react'

interface GlobalContext {
    currentCoin: number
    addCoin: (value: number) => void
    refundCoin: () => void
    buyItem: (item: ItemModel) => void

    logs: string[]
    addLogs: (log: string) => void

    errorPrice: number
    setIsError: (price: number) => void
    resetError: () => void
}

export const GlobalContext = createContext<GlobalContext>({
    currentCoin: 0,
    addCoin: (value: number) => {},
    refundCoin: () => {},
    buyItem: (item: ItemModel) => {},

    logs: [],
    addLogs: (log: string) => {},

    errorPrice: 0,
    setIsError: (price: number) => {},
    resetError: () => {},
})

interface Props {
    children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    const [currentCoin, setCurrentCoin] = useState<number>(0)
    const [errorPrice, setErrorPrice] = useState<number>(0)
    const [logs, setLogs] = useState<string[]>([])

    const addCoin = (value: number) => {
        if (currentCoin + value > 1000000) {
            alert('투입 가능한 최대 금액은 1,000,000원 입니다.')
            return
        }

        setCurrentCoin((p) => p + value)
        addLogs(`${value.toLocaleString()}원을 투입했습니다.`)
    }

    const refundCoin = () => {
        addLogs(`${currentCoin.toLocaleString()}원을 반환합니다.`)
        setCurrentCoin(0)
    }

    const addLogs = (log: string) => {
        setLogs((p) => [...p, log])
    }

    const setIsError = (price: number) => {
        setErrorPrice(price)
    }

    const resetError = () => {
        setErrorPrice(0)
    }

    const buyItem = (item: ItemModel) => {
        setCurrentCoin((p) => p - item.price)
        addLogs(`${item.name}을 구매했습니다.`)
    }

    useEffect(() => {
        console.log({ currentCoin })
        console.log({ logs })
    }, [logs, currentCoin])

    return (
        <GlobalContext.Provider value={{ currentCoin, logs, errorPrice, addCoin, refundCoin, buyItem, addLogs, setIsError, resetError }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
