import React,{Component} from 'react';
import classes from './Auth.module.scss';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import {authStart,autoLogin} from '../store/actions/auth';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            userName: {
                elementType: 'Input',
                elementConfig:{
                    label:'Username',
                    error:'Username is required'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'Input',
                elementConfig:{
                    label:'Password',
                    error:'Password should be more than 5 characters'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5
                },
                valid:false,
                touched:false
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    checkValidity = (value,rules) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    login = () => {
        const username = this.state.controls.userName.value;
        const password = this.state.controls.password.value;
        this.props.onLogin(username,password);
    }

    componentDidMount() {
        this.props.onAutoLogin()
    }

    render() {
        let redirect = null;
        if(this.props.isLoggedIn) {
            redirect = <Redirect to="/"/>
        }
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.config.elementConfig.label}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                type={formElement.id === 'password' ? formElement.id : ''}
                error={formElement.config.elementConfig.error}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return(
            <main className = {classes.container}>
                {redirect}
                <section className={classes.card}>
                    <section className={classes.title}>
                        <h2>
                            Sign In
                        </h2>
                    </section>
                    {form}
                    <Button submit={() => this.login()} text = "Login" />
                </section>       
            </main>
        )     
    }
}

const mapStateToProps = state => {
    return {
        error:state.auth.error,
        isLoggedIn:state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin:(username,password) => dispatch(authStart(username,password)),
        onAutoLogin:() => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);