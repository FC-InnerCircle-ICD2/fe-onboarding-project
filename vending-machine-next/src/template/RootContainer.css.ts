import { style } from '@vanilla-extract/css'

const Root = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 100,
})

export const UI_RootContainer = {
    Root,
}
