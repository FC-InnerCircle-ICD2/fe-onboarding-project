import { keyframes, style } from '@vanilla-extract/css'

const Container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '4px 8px',
    height: 60,
    border: '1px solid black',
    borderRadius: 6,
    backgroundColor: 'skyblue',
    cursor: 'pointer',
    ':hover': {
        backgroundColor: '#3fb6e7',
    },
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
