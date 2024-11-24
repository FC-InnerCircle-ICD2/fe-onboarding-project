import { recipe } from '@vanilla-extract/recipes'

const InputWrapper = recipe({
    base: {
        height: 60,
        width: '100%',
        padding: '6px 16px',
        borderRadius: 6,
        border: '1px solid black',
        backgroundColor: 'white',
    },
})

const Input = recipe({
    base: {
        width: '100%',
        height: '100%',
        padding: 0,
        outline: 'none',
        fontSize: '1.4rem',
        border: 'none',
        backgroundColor: 'white',
        ':read-only': {
            cursor: 'default',
        },
    },
    variants: {
        align: {
            center: {
                textAlign: 'center',
            },
            left: {
                textAlign: 'left',
            },
            right: {
                textAlign: 'right',
            },
        },
        isError: {
            true: {
                color: 'red',
            },
            false: {
                color: 'black',
            },
        },
    },
    defaultVariants: {
        isError: false,
        align: 'left',
    },
})

export const UI_Input = {
    Input,
    InputWrapper,
}
