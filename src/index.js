import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.js';
import IntroScreen from './components/pageComponents/IntroScreen'
import Sidebar from './components/pageComponents/Sidebar.js';
import * as LoginService from './services/LoginService';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const Application = () => (
    <MuiThemeProvider>
        <section className="flexBox">
            <section className="sidebar">
                { LoginService.checkToken() ? <Sidebar/>: <IntroScreen/> }
            </section>
            <section className="application">
                <App/>
            </section>
        </section>
    </MuiThemeProvider>
);


ReactDOM.render((
    <HashRouter>
        <Application/>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
