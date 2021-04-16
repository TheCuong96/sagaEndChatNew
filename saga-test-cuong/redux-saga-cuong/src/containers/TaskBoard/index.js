import { Box, Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import styles from './styles';
import AddIcon from '@material-ui/icons/Add';

import { STATUSES } from '../../constants';
import TaskList from '../../components/TaskList';
import TaskFrom from '../../components/TaskForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskAction from '../../actions/task';

const listTask = [
    {
        id:1,
        title:"Read book",
        description:"Read material ui book",
        status:0
    },
    {
        id:2,
        title:"play football",
        description:"With my friend",
        status:2
    },
    {
        id:3,
        title:"Play game",
        description:"",
        status:1 
    }
]
class TaskBoard extends Component {
    state = {
        open:false,
    }
    componentDidMount() {
        const {taskActionCreators} = this.props;
        const {fetchListTask} = taskAction;
        fetchListTask();
    }
    
    handleClose = () => {
        this.setState({
            open:false
        })
    }
    openForm = () => {
        this.setState({
            open:true
        });
    }
    renderBoard(){
        const {classes} = this.props;
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {/* <Grid item md={4} xs={12}>READY</Grid>
                <Grid item md={4} xs={12}>IN PROGRESS</Grid>
                <Grid item md={4} xs={12}>COMPLETED</Grid> */}
                {
                    STATUSES.map((status,index) => {
                        const taskFiltered = listTask.filter(task => task.status === status.value)
                        return (    
                                <TaskList key={status.value} task={taskFiltered} status={status}/>
                            )
                    })
                }
            </Grid>
        )
        return xhtml
    }
    renderForm(){
        const {open} = this.state;
        let xhtml = null;
        xhtml = (
            // <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            //     <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            //         <DialogContent>
            //             <h1>Dialog Content</h1>
            //         </DialogContent>
            //     <DialogActions>
            //     <Button onClick={this.handleClose} color="primary">
            //         Cancel
            //     </Button>
            //     <Button onClick={this.handleClose} color="primary">
            //         OK
            //     </Button>
            //     </DialogActions>
            // </Dialog>
            <TaskFrom open={open} handleClose={this.handleClose}/>
        )
        return xhtml;
    }
    
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.TaskBoard}>
                {/* <div className={classes.shape}>Python</div>
                <div className={classes.shape}>NodeJS</div>
                <div className={classes.shape}>HTML</div> */}
                <Button variant="contained" color="primary" className={classes.button} onClick={this.openForm}>
                    <AddIcon></AddIcon> Thêm mới công việc
                </Button>
                {this.renderBoard()}
                {this.renderForm()}
            </div>
        );
    }
}

// TaskBoard.propTypes = {
//     classes:PropTypes.object,
//     taskActionCreators:PropTypes.shape({
//         fetchListTask:ProTypes.func
//     })
// }

const mapStateToProps = null;
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        taskActionCreators: () => {
            bindActionCreators(taskAction,dispatch);
        }
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));