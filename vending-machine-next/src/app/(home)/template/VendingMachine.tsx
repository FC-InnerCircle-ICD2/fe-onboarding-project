'use client'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { UI_VendingMachine as S } from './VendingMachine.css'

const VendingMachine = () => {
    return (
        <div className={S.Container}>
            <Input align='center' />
            <Button>쿨라</Button>
        </div>
    )
}

export default VendingMachine
