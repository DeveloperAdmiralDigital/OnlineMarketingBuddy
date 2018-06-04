import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import logo from '../../images/admiral-digital-logo-white-medium.png'
// import * as LoginService from "../../services/LoginService";
// import * as roleService from "../../services/UserService";
import './Sidebar.css';
import AddDataSource from "../../containers/AddDataSource";

const styles = {
    menuColor: {
        color: "#D9CDC7",
        fontSize: "0.9em"
    }
};

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: "",
            roles: [{rolename: "Viewer"}],
            rights: "Viewer"
        };
    }

    componentDidMount() {
        this.CheckUserRoles();
    }

    CheckUserRoles() {
        // let self = this;
        // let roles = [];
        if (localStorage.getItem("userToken") != null) {
            /*roleService.getRolesCurrentUser().then(
                (value) => {
                    role = value.role;
                    if (role != null) {
                            if ("Admin" === role.rolename) {
                                self.setState({rights: role.rolename})
                            } else if ("ClientAdmin" === role.rolename && "Admin" !== self.state.rights) {
                                self.setState({rights: role.rolename})
                            }
                        self.setState({
                            role: role,
                        });
                    }
                });*/
        }
    }

    render() {
        return (
            <div>
                <Link to="/">
                    <img className="logo" alt="AdmiralDigital" src={logo}/>
                </Link>
                <Menu>
                    <section>
                        <Divider/>
                        <Link to="/">
                            <MenuItem style={styles.menuColor} primaryText={'Home'}/>
                        </Link>
                        <Divider/>
                        <Link to="/dashboard">
                            <MenuItem style={styles.menuColor} primaryText={'Dashboard'}/>
                        </Link>
                        <Link to="/addGraph">
                            <MenuItem style={styles.menuColor} primaryText={'AddGraph'}/>
                        </Link>
                        <Link to="/AddDatasource">
                            <MenuItem style={styles.menuColor} primaryText={'AddDataSource'}/>
                        </Link>

                    </section>
                </Menu>
            </div>
        );
    }
}
