'use client'

import { ComponentPropsWithoutRef, useRef } from 'react'
import { UI_Input as S } from './Input.css'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    align?: keyof typeof S.Input.classNames.variants.align
    isError?: boolean
}

const Input = ({ align = 'left', isError = false, ...rest }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div
            className={S.InputWrapper()}
            onClick={() => inputRef.current?.focus()}>
            <input
                ref={inputRef}
                className={S.Input({ align, isError })}
                {...rest}
            />
        </div>
    )
}

export default Input
