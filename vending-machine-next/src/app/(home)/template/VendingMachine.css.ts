import { style } from '@vanilla-extract/css'

const Container = style({
    width: 340,
    height: 330,
    padding: '20px 14px',
    borderRadius: 8,
    border: '1px solid black',
    backgroundColor: '#d1edf6',
})

const DialContent = style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '14px 20px',
    marginTop: 20,
})

export const UI_VendingMachine = {
    Container,
    DialContent,
}
