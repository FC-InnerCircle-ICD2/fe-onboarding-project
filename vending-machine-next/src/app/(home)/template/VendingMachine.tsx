'use client'

import Input from '@/components/input/Input'
import { UI_VendingMachine as S } from './VendingMachine.css'

const VendingMachine = () => {
    return (
        <div className={S.Container}>
            <Input align='center' />
        </div>
    )
}

export default VendingMachine
