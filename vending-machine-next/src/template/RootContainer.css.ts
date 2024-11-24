import { style } from '@vanilla-extract/css'

const Root = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    minHeight: 330,
    paddingTop: 100,
})

export const UI_RootContainer = {
    Root,
}
