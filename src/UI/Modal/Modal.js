import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '../Button/Button';
import Input from '../Input/Input';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const CustModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [name,setName] = React.useState('');
    const [project,setProject] = React.useState('');
    const [technology,setTechnology] = React.useState('');
    const [code,setCode] = React.useState('');
    const nameChangedHandler = (event) => {
        setName(event.target.value);
    }

    const codeChangedHandler = (event) => {
        setCode(event.target.value);
    }

    const projectChangedHandler = (event) => {
        setProject(event.target.value);
    }

    const techChangedHandler = (event) => {
        setTechnology(event.target.value);
    }

    const addHandler = () => {
        props.handleClose();
        props.addEmp(name,code,project,technology);
        setName('');
        setCode('');
        setProject('');
        setTechnology('');
    }

    const deleteHandler = () => {
        props.handleClose();
        props.deleteEmp(props.code)
    }

    const editHandler = () => {
        props.handleClose();
        props.editEmp(name,code);
        setName('');
    }

    useEffect(() => {
        if(props.type === 'Edit') {
            setName(props.name);
        }
    },[props.name,props.type])

    let body = null;

    if(props.type === 'Edit') {
        body = (
            <div style={modalStyle} className={classes.paper}>
                <h2>Edit Employee</h2>
                <Input elementType='Input' label='Employee Name' value={name} changed={( event ) => nameChangedHandler( event )}/>
                <Input disabled={true} elementType='Input' value={props.code} label='Employee Code'/>
                <Button submit={() => editHandler()} size="small" text="Edit"></Button>
                <Button submit={props.handleClose} size="small" text="Cancel"></Button>
            </div>
        )
    } else if (props.type === 'Add') {
        body = (
            <div style={modalStyle} className={classes.paper}>
                <h2>Add Employee</h2>
                <Input elementType='Input' label='Employee Name' value={name} changed={( event ) => nameChangedHandler( event )}/>
                <Input elementType='Input' value={code} label='Employee Code' changed={( event ) => codeChangedHandler( event )}/>
                <Input elementType='Input' value={project} label='Project Assigned' changed={( event ) => projectChangedHandler( event )}/>
                <Input elementType='Input' value={technology} label='Technology Stack' changed={( event ) => techChangedHandler( event )}/>
                <Button submit={() => addHandler()} size="small" text="Add"></Button>
                <Button submit={props.handleClose} size="small" text="Cancel"></Button>
            </div>
        )
    } else if(props.type === 'Delete') {
        body = (
            <div style={modalStyle} className={classes.paper}>
                <h2>Are you sure you want to delete this Employee?</h2>
                <Button submit={() => deleteHandler()} size="small" text="Delete"></Button>
                <Button submit={props.handleClose} size="small" text="Cancel"></Button>
            </div>
        )
    }

    return(
        <section>
            <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {body}
            </Modal>
        </section>   
    )
}

export default CustModal;