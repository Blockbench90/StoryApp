import {CssBaseline, ThemeProvider} from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import theme from "./theme";
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/store";


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);

//TODO: поработать над ререндером компонентов, какого черта они так часто и много перезагружаются
