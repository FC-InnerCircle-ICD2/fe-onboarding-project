'use client'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { UI_VendingMachine as S } from './VendingMachine.css'

const VendingMachine = () => {
    return (
        <div className={S.Container}>
            <Input
                align='center'
                readOnly
            />

            <div className={S.DialContent}>
                <Button>쿨라</Button>
                <Button>쿨라</Button>
                <Button>쿨라</Button>

                <Button>쿨라</Button>
                <Button>쿨라</Button>
                <Button>쿨라</Button>

                <Button>쿨라</Button>
                <Button>쿨라</Button>
                <Button>쿨라</Button>
            </div>
        </div>
    )
}

export default VendingMachine
