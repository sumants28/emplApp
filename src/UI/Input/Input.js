import React from 'react';
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import classes from './Input.module.scss';
import { makeStyles } from "@material-ui/core/styles";

const Input = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
          "& .MuiTextField-root": {
            width: 250
          }
        }
      }));
    const styles = useStyles();
    let showError = false;
    let disabled = false;
    if(props.disabled) {
        disabled = true;
    }
    if(props.invalid && props.touched) {
        showError = true;
    }
    let element = null;
    switch(props.elementType) {
        case ('Input'):
            element = <TextField
            error = {showError}
            id = {props.label}
            label={props.label} 
            defaultValue ={props.value}
            type = {props.type !== '' ? props.type : ''}
            onChange ={props.changed}
            helperText = {showError ? props.error : ''}
            disabled={disabled} 
            variant ="outlined"/>
            break;
        case ('TextArea'):
            element = <TextareaAutosize 
            aria-label="minimum height" 
            rowsMin={3}
            id={props.label} 
            placeholder={props.placeholder}
            onChange ={props.changed} 
            defaultValue = {props.value} />;
            break;
    }

    return (
        <main className={[classes.container,styles.root].join(' ')}>
            {element}
        </main>
    )
}

export default Input;