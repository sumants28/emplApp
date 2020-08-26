import React,{Component} from 'react';
import Header from '../Header/Header';
import Button from '../UI/Button/Button';
import Table from '../UI/Table/Table';
import classes from './Dashboard.module.scss';
import Modal from '../UI/Modal/Modal';
import { connect } from 'react-redux';
import {getEmp,add,deleteEmp,editEmp} from '../store/actions/employee';
import {authLogout} from '../store/actions/auth';
import { Redirect } from 'react-router';

class Dashboard extends Component {
    state = {
        open:false
    }
    handleOpen = () => {
        this.setState({open:true});
    }
    handleClose = () => {
        this.setState({open:false});
    }

    editEmployee = (name,code) => {
        this.props.onEdit(name,code);
    }

    addEmployee = (name,code,project,technology) => {
        const employee = {
            name:name,
            code:code,
            project:project,
            technology:technology
        }
        this.props.onAdd(employee);
    }

    deleteEmployee = (code) => {
        this.props.onDelete(code);
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let redirect = null;
        if(!this.props.isLoggedIn) {
            redirect = <Redirect to='/auth' />
        }
        return (
            <main>
                {redirect}
                <Header title = 'ERP System' />
                <section className={classes.container}>
                    <section className={classes.menu}>
                        <section className={classes.logout}>
                            <Button submit={() => this.props.logout()} text = "Logout" />
                        </section>
                        <section className={classes.addEmp}>
                            <Button submit={() => this.handleOpen()} text = "Add Employee" />
                        </section>
                        <Modal addEmp={this.addEmployee} type="Add" open={this.state.open} handleOpen={() => this.handleOpen()} handleClose={()=> this.handleClose()}/>
                    </section>
                    <section>
                        <Table delete={this.deleteEmployee} edit={this.editEmployee} emp={this.props.employees}/>
                    </section>
                </section>     
            </main>
        )
    }    
}

const mapStateToProps = state => {
    return {
        employees:state.employee.employees,
        isLoggedIn:state.auth.isLoggedIn
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onLoad:() => dispatch(getEmp()),
        onAdd:(emp) => dispatch(add(emp)),
        onDelete:(code) => dispatch(deleteEmp(code)),
        onEdit:(name,code) => dispatch(editEmp(name,code)),
        logout:() => dispatch(authLogout())
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Dashboard);