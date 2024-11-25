'use client'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { GlobalContext } from '@/context/GlobalProvider'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { UI_SideContainer as S } from './SideContainer.css'

const SideContainer = () => {
    const { currentCoin, logs, addCoin, refundCoin } = useContext(GlobalContext)
    const [coin, setCoin] = useState<number>(0)
    const logRef = useRef<HTMLDivElement>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^0-9]/, '').replaceAll(',', '')

        if (!value) setCoin(0)

        setCoin(Number(value))
    }

    const handleInsertCoin = () => {
        if (!coin) return

        addCoin(coin)
        setCoin(0)
    }

    const handleRefundCoin = () => {
        currentCoin && refundCoin()
    }

    useEffect(() => {
        if (!logRef.current || !logs.length) return

        logRef.current.scrollTop = logRef.current.scrollHeight
    }, [logs])

    return (
        <div className={S.Container}>
            <div className={S.Form}>
                <Input
                    align='right'
                    value={!coin ? '' : coin.toLocaleString()}
                    maxLength={8}
                    onChange={handleInputChange}
                />
                <Button
                    width='60px'
                    onClick={handleInsertCoin}>
                    투입
                </Button>
                <Button
                    width='60px'
                    onClick={handleRefundCoin}>
                    반환
                </Button>
            </div>
            <div
                className={S.LogContent}
                ref={logRef}>
                {logs.map((log, i) => (
                    <p
                        key={`log_${i}`}
                        className={S.Log}>
                        {log}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default SideContainer
