import { style } from '@vanilla-extract/css'

const Container = style({
    width: 340,
    height: 322,
    padding: '20px 14px',
})

const Form = style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 6,
})

const LogContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    height: 'calc(100% - 100px)',
    boxSizing: 'content-box',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    border: '1px solid black',
    backgroundColor: 'white',
    overflowY: 'auto',
})

export const UI_SideContainer = {
    Container,
    Form,
    LogContent,
}
