import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Fab from '@material-ui/core/Fab'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'

interface ScrollTopProps {
    window?: () => Window
    children: React.ReactElement
}

//Кнопка скролинга
//чтобы работала, нужно обернуть ею целый компонент
const useScrollButtonStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    //отключает стандартный размер в комбинации с variant={'dense'}
    toolbar: {
        minHeight: '1px'
    }
}))

function ScrollTop(props: ScrollTopProps) {
    const {children, window} = props
    const classes = useScrollButtonStyles()
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor')

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

export default function ScrollButton(props: ScrollTopProps) {
    const classes = useScrollButtonStyles()
    return (
        <React.Fragment>
            <Toolbar id="back-to-top-anchor" variant='dense' className={classes.toolbar}/>
            {props.children}
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
