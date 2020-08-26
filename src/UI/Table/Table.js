import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import styles from './Table.module.scss';
import Modal from '../Modal/Modal';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
  

const CustTable = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open,setOpen] = React.useState(false);
    const [modalType,setModalType] = React.useState('Edit');
    const [name,setName] = React.useState('');
    const [code,setCode] = React.useState('');
    const classes = useStyles();
    const handleModal = (type,emp) => {
        setModalType(type)
        setName(emp.name);
        setCode(emp.code);
        handleOpen();
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'Code', minWidth: 100 },
        {
          id: 'project',
          label: 'Project Assigned',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'technology',
          label: 'Technology Stack',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 170,
            align: 'right',
          },
      ];
      const createData = (emp) => {
        let actions = (
            <div>
                <button onClick = {()=>handleModal('Edit',emp)} className={styles.btn}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                <button onClick = {()=>handleModal('Delete',emp)} className={styles.btn}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
            </div>
        )
          return {...emp,actions}
      }

    const rows = props.emp.map(em => {
        return createData(em);
    })
    return(
        <React.Fragment>
        <Modal deleteEmp={props.delete} editEmp={props.edit} name={name} code={code} type={modalType} open={open} handleOpen={() => handleOpen()} handleClose={()=> handleClose()}/>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
        </React.Fragment>
    )
}

export default CustTable;