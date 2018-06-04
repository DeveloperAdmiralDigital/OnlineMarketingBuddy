import React, {Component} from 'react';
import {Route, Switch} from 'react-router'

import role from './components/checkingComponents/CheckRoleComponent';
import check from './components/checkingComponents/CheckTokenComponent';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import AddGraph from './containers/AddGraph';
import AddDataSource from './containers/AddDataSource';

import AddUser from "./components/userComponents/AddUser";
import UserDetails from "./components/userComponents/UserUpdate";
import Users from "./components/userComponents/Users";

import NotFound from "./components/pageComponents/NotFound";

import './CSS/GlobalStylesheet.css';

export default class App extends Component {


    render() {
        return (
            <Switch>
                <Route name="home" exact path="/" component={Home}/>

                <Route name="users" path="/users" component={role(Users)}/>
                <Route name="addUser" path="/addUser" component={role(AddUser)}/>
                <Route name="userDetails" path="/userdetails/:id" component={role(UserDetails)}/>

                <Route name="dashboard" path="/Dashboard" component={check(Dashboard)}/>

                <Route name="addGraph" path="/addGraph" component={check(AddGraph)}/>

                <Route name="AddDatasource" path="/AddDatasource" component={check(AddDataSource)}/>

                <Route path='*' exact={true} component={NotFound}/>
            </Switch>
        );
    }
}

