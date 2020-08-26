import React from 'react';
import classes from './Header.module.scss';

const Header = (props) => {
    return (
        <main className = {classes.container}>
            <h1 className = {classes.title}>{props.title}</h1>
        </main>
    )
}

export default Header;