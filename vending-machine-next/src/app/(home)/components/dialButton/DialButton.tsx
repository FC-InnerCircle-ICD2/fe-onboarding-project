'use client'

import { GlobalContext } from '@/context/GlobalProvider'
import { ItemModel } from '@/model/item'
import clsx from 'clsx'
import { KeyboardEvent, useContext, useState } from 'react'
import { UI_DialButton as S } from './DialButton.css'

interface Props {
    item: ItemModel
}

const DialButton = ({ item }: Props) => {
    const { name, price } = item
    const { currentCoin, setIsError, resetError, buyItem } = useContext(GlobalContext)
    const [isActive, setIsActive] = useState<boolean>(false)

    const startAction = () => {
        setIsActive(true)

        setTimeout(() => {
            setIsActive(false)
        }, 300)

        if (currentCoin < price) {
            setIsError(price)
        } else {
            buyItem(item)
        }
    }

    const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Ener' || e.key === ' ') startAction()
    }

    return (
        <div
            className={clsx(S.Container, isActive ? S.Active : '')}
            role='button'
            onMouseDown={startAction}
            onKeyDown={handleKeydown}
            onTouchStart={startAction}
            onMouseUp={resetError}
            onMouseLeave={resetError}
            onKeyUp={resetError}
            onTouchEnd={resetError}>
            <p className={clsx(S.Name, 'ellipsis')}>{name}</p>
            <p className={clsx(S.Price, 'ellipsis')}>{price}원</p>
        </div>
    )
}

export default DialButton
