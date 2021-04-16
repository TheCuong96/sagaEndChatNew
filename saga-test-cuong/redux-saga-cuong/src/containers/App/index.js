// import Button from '@material-ui/core/Button';
// import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import style from './style';
import { ThemeProvider } from '@material-ui/core/styles';
import TaskBoard from '../TaskBoard';
import theme from '../../comoms/Theme';
import { Provider } from 'react-redux';
import configureStore from '../../redux/configureStore';

class App extends Component {
  render() {
    // console.log('props',this.props);
    // const {classes} = this.props;
    const store = configureStore()
    return (
      // <div className="App">
      //   <Button variant="contained" color="primary">Primary</Button>
      //   <div className={classes.box}>
      //     <div className={classes.shape}>ReactJS</div>
      //     <div className={classes.shape}>Python</div>
      //     <div className={classes.shape}>NodeJS</div>
      //   </div>
      // </div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskBoard/>
        </ThemeProvider>
      </Provider>
    );
  }
}
export default withStyles(style)(App);
