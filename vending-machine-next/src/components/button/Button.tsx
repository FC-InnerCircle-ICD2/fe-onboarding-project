'use client'

import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { UI_Button } from './Button.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode
    width?: keyof typeof UI_Button.classNames.variants.width
}

const Button = ({ className, children, width = 'widthFull', ...rest }: ButtonProps) => {
    return (
        <button
            className={clsx(className, UI_Button({ width }))}
            {...rest}>
            {children}
        </button>
    )
}

export default Button
