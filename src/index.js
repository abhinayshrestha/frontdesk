import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './Store/Reducer/rootReducer';
import App from './Container/App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
axios.defaults.baseURL = 'http://front-desk-api.herokuapp.com';

const theme = createMuiTheme({
    palette : {
        primary : {
            main : '#5850EC'
        },
        secondary : {
            main : '#f44336'
        },
        text : {
            primary : '#5f6368',
            hint : '#9e9e9e'
        }
    }
})

const app = <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme = {theme}>  
                        <ThemeProvider theme = {theme}>
                            <App/>
                        </ThemeProvider> 
                    </MuiThemeProvider> 
               </BrowserRouter>
            </Provider>

ReactDOM.render(app, document.querySelector('#root')); 