import { Box,Button,Grid,withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import TaskItem from '../TaskItem';
class TaskList extends Component {
    render() {
        const {classes,task,status} = this.props;
        return (
            <Grid item md={4} xs={12} key={status.value}>
                <Box mt={2} mb={2}>
                    <div className={classes.status}>{status.label}</div>
                </Box>
                <div className={classes.wrapperListTask}>
                    {
                        task.map(task => {
                            // const {title, discription} = task;
                            return (
                                // <h1>{task.title}</h1>
                                <TaskItem task={task} status={status} key={task.id}/>
                            )
                        })
                    }    
                </div>    
            </Grid>
                     
        );
    }
}

export default withStyles(styles)(TaskList);
