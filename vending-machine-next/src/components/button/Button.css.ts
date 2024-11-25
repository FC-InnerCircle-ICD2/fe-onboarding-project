import { recipe } from '@vanilla-extract/recipes'

export const UI_Button = recipe({
    base: {
        padding: '4px 8px',
        height: 60,
        border: '1px solid black',
        borderRadius: 6,
        backgroundColor: 'skyblue',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#3fb6e7',
        },
    },
    variants: {
        width: {
            widthFull: {
                width: '100%',
                fontSize: '1.3rem',
            },
            '60px': {
                width: '60px',
                minWidth: '60px',
            },
            '90px': {
                width: '90px',
                minWidth: '90px',
            },
        },
    },
    defaultVariants: {
        width: 'widthFull',
    },
})
