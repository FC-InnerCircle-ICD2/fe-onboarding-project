'use client'

import { ComponentPropsWithoutRef } from 'react'
import { UI_Button } from './Button.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode
    width?: keyof typeof UI_Button.classNames.variants.width
}

const Button = ({ children, width = 'widthFull', ...rest }: ButtonProps) => {
    return <button className={UI_Button({ width })}>{children}</button>
}

export default Button
