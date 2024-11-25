'use client'

import Input from '@/components/input/Input'
import { GlobalContext } from '@/context/GlobalProvider'
import { ItemModel } from '@/model/item'
import { useContext } from 'react'
import DialButton from '../components/dialButton/DialButton'
import { UI_VendingMachine as S } from './VendingMachine.css'

interface Props {
    items: ItemModel[]
}

const VendingMachine = ({ items }: Props) => {
    const { currentCoin } = useContext(GlobalContext)

    return (
        <div className={S.Container}>
            <Input
                value={currentCoin}
                align='center'
                readOnly
            />

            <div className={S.DialContent}>
                {items.map((item) => (
                    <DialButton
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default VendingMachine
