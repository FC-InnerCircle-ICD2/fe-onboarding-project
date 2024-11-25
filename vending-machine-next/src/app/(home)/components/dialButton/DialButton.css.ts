import { keyframes, style } from '@vanilla-extract/css'

const Container = style({
    maxWidth: '100%',
    boxSizing: 'border-box',
})

const Name = style({
    fontSize: '1rem',
    maxWidth: 76,
})

const Price = style({
    fontSize: '0.8rem',
})

const ClickAnim = keyframes({
    '0%': {
        transform: 'scale(1)',
    },
    '50%': {
        transform: 'scale(1.05)',
    },
    '100%': {
        transform: 'scale(1)',
    },
})

const Active = style({
    animation: `${ClickAnim} 0.3s ease-in-out`,
})

export const UI_DialButton = {
    Container,
    Name,
    Price,
    Active,
}
