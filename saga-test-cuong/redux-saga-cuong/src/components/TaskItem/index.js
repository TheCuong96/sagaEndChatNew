import React, { Component } from 'react';
import { Box,Button,Grid,withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import styles from './styles';
class TaskItem extends Component {
    render() {
        const {classes,task,status} = this.props;

        
        return (
            <Card key={task.id} className={classes.card}>
                <CardContent>
                    <Grid contained justify="space-between">
                        <Grid item md={8}>
                            <Typography component="h2">
                                {task.title}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                    </Grid>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions className={classes.CardActions}>
                    {/* <Button size = "small"></Button> */}
                    <Button variant="contained" size="small" color="primary" className={classes.margin}>
                        {/* + */}
                        <Icon fontSize="small">edit_icon</Icon>
                    </Button>
                    <Button variant="contained" size="small" color="primary" className={classes.margin}>
                        {/* + */}
                        <Icon fontSize="small">delete_icon</Icon>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(TaskItem);
