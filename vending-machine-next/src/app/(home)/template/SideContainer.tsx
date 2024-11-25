'use client'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { GlobalContext } from '@/context/GlobalProvider'
import { ChangeEvent, useContext, useState } from 'react'
import { UI_SideContainer as S } from './SideContainer.css'

const SideContainer = () => {
    const { currentCoin, logs, addCoin, minusCoin } = useContext(GlobalContext)
    const [coin, setCoin] = useState<number>(0)

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
        if (!coin) return

        minusCoin(coin)
        setCoin(0)
    }

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
            <div className={S.LogContent}>
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
