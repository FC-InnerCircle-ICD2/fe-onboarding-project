'use client'

import Button from '@/components/button/Button'
import { ItemModel } from '@/model/item'
import clsx from 'clsx'
import { useState } from 'react'
import { UI_DialButton as S } from './DialButton.css'

interface Props {
    item: ItemModel
}

const DialButton = ({ item }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <Button
            className={`${isActive ? S.Active : ''}`}
            onMouseDown={() => {
                setIsActive(true)
                setTimeout(() => {
                    setIsActive(false)
                }, 300)
            }}>
            <div className={S.Container}>
                <p className={clsx(S.Name, 'ellipsis')}>{item.name}</p>
                <p className={clsx(S.Price, 'ellipsis')}>{item.price}원</p>
            </div>
        </Button>
    )
}

export default DialButton
