import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './Store/Reducer/rootReducer';
import App from './Container/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
axios.defaults.baseURL = 'https://front-desk-api.herokuapp.com';



const app = <Provider store={store}>
                <BrowserRouter>
                            <App/>
               </BrowserRouter>
            </Provider>

ReactDOM.render(app, document.querySelector('#root')); 