import React from 'react';
import Button from '@material-ui/core/Button';
import classes from './Button.module.scss';

const Custombutton = (props) => {
    return (
        <section className={classes.container}>
            <Button variant="contained" color="primary" onClick = {props.submit}>
                {props.text}
            </Button>
        </section>
    )
}

export default Custombutton;