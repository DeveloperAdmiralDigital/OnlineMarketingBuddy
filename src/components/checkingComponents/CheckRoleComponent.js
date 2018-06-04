import React, {Component} from "react";
import Home from '../../containers/Home';
import * as roleService from "../../services/RoleService";
import * as LoginService from "../../services/LoginService";

export default function (WrapperComponent) {
    class CheckRoleComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                login: true
            }
        }

        componentWillMount() {
            let role = "";
            let self = this;
            if (localStorage.getItem("userToken") != null) {
                roleService.getRolesCurrentUser().then(
                    (value) => {
                        role = value.role;
                        if (role.rolename === "ClientAdmin" || role.rolename === "Admin") {
                            self.setState({redirect: true})
                        }
                    });
            }
            this.CheckUserRoles();
        }

        CheckUserRoles() {
            let role = "";
            let self = this;
            if (!LoginService.checkToken()) {
                self.setState({login: false});
            }

            if (localStorage.getItem("userToken") != null) {
                roleService.getRolesCurrentUser().then(
                    (value) => {
                        role = value.role;
                        if (role.rolename === "ClientAdmin" || role.rolename === "Admin") {
                            self.setState({redirect: true})
                        }
                    });
            }
        }

        render() {
            if (this.state.login && this.state.redirect) {
                return <WrapperComponent {...this.props} />
            } else {
                return <Home/>
            }
        }
    }

    return CheckRoleComponent;
}