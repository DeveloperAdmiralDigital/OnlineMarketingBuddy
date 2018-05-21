import React, {Component} from 'react';
import Login from '../pageComponents/Login';
import * as LoginService from '../../services/LoginService';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButton: "",
            showLogout: true,
        }
    }

    componentDidMount() {
        this.getLoggedIn();
    }

    checkAuthentication = () => {
        if (!LoginService.checkToken()) {
            return false;
        }
        return true;
    };

    getLoggedIn = () => {
        let self = this;
        if (this.checkAuthentication()) {
            self.setState({loginButton: "Log out"});
        } else {

            self.setState({loginButton: "Log in"});
        }
        self.setState({showLogout: this.checkAuthentication()});
    };

    checkLogin = () => {
        if (this.state.showLogout) {
            localStorage.removeItem('userToken');
            this.getLoggedIn();
            window.location.reload();
        } else {
            this.getLoggedIn();
        }
    };

    render() {
        return (
            <div>
                <div className="navbar">
                    <nav className="nav">
                        <div className="nav-wrapper red darken-4">
                            <a className="left brand-logo">{this.props.name}</a>
                            <ul id="nav-mobile" className="right hide-on-small-and-down">
                                <li><a className="waves-effect red accent-4 waves-light btn"
                                       onClick={this.checkLogin}>{this.state.loginButton}</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Login/>
            </div>
        )
    }
}
