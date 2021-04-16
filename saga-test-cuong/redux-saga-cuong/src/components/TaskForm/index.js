import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import styles from '../TaskItem/styles';

class TaskFrom extends Component {
    
    render() {
        const {open,classes,handleClose} = this.props;
        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                    <TextField
                    id="standard-read-only-input"
                    label="Read Only"   
                    defaultValue="Hello World"
                    
                    />
                    <TextField
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax={4}
                    />
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(TaskFrom);
