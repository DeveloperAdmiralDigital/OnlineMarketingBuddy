import React, {Component} from 'react';
import swal from 'sweetalert2'
import * as LoginService from "../../services/LoginService";
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            username: "",
            password: "",
            isLoggedIn: true,
        };
    }

    login = () => {
        let user = this.state.username;
        let pass = this.state.password;
        let response = LoginService.fetchToken(user, pass);
        response.then((value) => {
            if (value) {
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'You have been logged in!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });


            } else {
                this.setState({errorMessage: "Username or password incorrect"}, () => {
                    if (!this.state.isLoggedIn) {
                        swal({
                            type: 'error',
                            title: 'Something wrong...',
                            text: 'Username or password incorrect!',
                            timer: 2000,
                            showConfirmButton: false,
                        }).then(() => {
                            this.openSwat();
                        });

                    }
                });

            }
        });
    };

    getLoggedIn = () => {
        let self = this;
        if (!LoginService.checkToken()) {
            self.setState({isLoggedIn: LoginService.checkToken()}, () => {
                if (!self.state.isLoggedIn) {
                    self.openSwat();
                }
            });
        }

    };


    openSwat = () => {
        swal.setDefaults({
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#bf360c',
        });

        let steps = [
            {
                title: 'Gebruikersnaam',
                html: 'Geef je gebruikersnaam in:',
                input: 'text',
                confirmButtonText: 'Next',
            },
            {
                title: 'Paswoord',
                text: 'Geef je paswoord in:',
                input: 'password',
                confirmButtonText: 'Next',
            },
        ];

        swal.queue(steps).then((result) => {
            if (result.value) {
                this.setState({username: result.value[0]});
                this.setState({password: result.value[1]});
                this.login();
            }
        })
    };


    componentDidMount() {
        this.getLoggedIn();
    };

    render() {
        return (
            <div>
            </div>
        )
    }
}
