'use client'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { UI_SideContainer as S } from './SideContainer.css'

const SideContainer = () => {
    return (
        <div className={S.Container}>
            <div className={S.Form}>
                <Input align='right' />
                <Button width='60px'>투입</Button>
                <Button width='60px'>반환</Button>
            </div>
            <div className={S.LogContent}>
                <p>10000원이 투입되었습니다.</p>
                <p>1000원이 반환되었습니다.</p>
            </div>
        </div>
    )
}

export default SideContainer
