import React, {useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NewGroup from '../../components/groups/NewGroup';

import theme from '../../theme';


import GroupList from './GroupList';
import { Box } from '@material-ui/core';
import { RowingTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    maxWidth: 350,
  },
  paper: {
    margin: "5px",
    width: "200px",
    height: "200px"
  }
});

function createData(name, description, image) {
  return { name, description, image };
}

const rows = [
    createData('Group no 1', 'Daily tasks..',[]),
    createData('Group no 2', 'Summer trip',[]),
    createData('Group no 3', 'Learn pyton',[]),
    createData('Group no 4', 'Read english book',[]),
    createData('Group no 5', 'ShoppringList',[]),
];    

export default function BasicTable() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(rows); 

  const saveGroupHandler = (saveGroupData) => {
      setData((prevData) => {
          return [saveGroupData, ...prevData];
      });      
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
          <Box maxWidth="25%" color="text.primary">
    <TableContainer component={Paper} classes="classes.paper">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </Box>
            
     <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add New Group
      </Button>
      <Dialog open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
            maxWidth='sm'
            fullWidth>
        <DialogTitle id="form-dialog-title">New Group</DialogTitle>
        <DialogContent>
          <NewGroup onSaveGroup={saveGroupHandler} />
        </DialogContent>
      </Dialog>
    </div>

    </div> 
  );
}
