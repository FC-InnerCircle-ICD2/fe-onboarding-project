'use client'

import { UI_RootContainer as S } from './RootContainer.css'

interface Props {
    children: React.ReactNode
}

const RootContainer = ({ children }: Props) => {
    return <div className={S.Root}>{children}</div>
}

export default RootContainer
