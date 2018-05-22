import React, {Component} from 'react';
import swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize';
import Header from '../generalComponents/Header';
import StyledTextField from "../generalComponents/StyledTextField";
// import * as UserService from '../../services/UserService';
import './UserUpdate.css';

export default class UserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.match.params.id,
            fields: {
                username: '',
                firstname: '',
                lastname: ''
            },
            roles: [],
            selectedroles: []
        }
    }

    /*    componentDidMount () {
            const self = this;

            UserService.getUserRoles().then(roles => {
                this.setState({roles: roles})
            })

            UserService.getUserFromBackend(self.state.userid)
                .then(user => {
                    console.log(user);
                    self.setState({
                        selectedroles: user.roles.map(role => role.roleId),
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        password: user.password,
                        userimage: user.userimage,
                        street: user.street,
                        streetnumber: user.streetnumber,
                        postalcode: user.postalcode,
                        city: user.city,
                        country: user.country,
                    });
                }).catch((error) => {
                console.log(error);
            });
        }*/

    handleUpdate = () => {
        // let self = this;

        swal({
            position: 'top-end',
            type: 'success',
            title: 'User updated!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            /*UserService.UpdateUser(self.state.userid, JSON.stringify(
                {
                    username: this.state.fields["username"],
                    firstname: this.state.fields["firstname"],
                    lastname: this.state.fields["lastname"],
                    password: this.state.fields["password"],
                    userimage: this.state.userimage,
                    roleids: this.state.roleids
                }
            ));*/
            this.props.history.push("/users");

        });


    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                userimage: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    };

    handleRoleChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({selectedroles: value});
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Update USer"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-l2">
                        <div className="card hoverable z-depth-3">
                            <h4 className="center">Update User</h4>
                            <form action="/" method="PUT" onSubmit={(e) => {
                                e.preventDefault();
                                this.handleUpdate();
                            }}>

                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.userimage} alt="User"
                                        height="300px"/>
                                    <form action="#">
                                        <div className="file-field input-field">
                                            <div

                                                className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                                <i className="material-icons">attach_file</i>
                                                <input name="file"
                                                       className="upload-file"
                                                       id="file"
                                                       onChange={this.handleChangeImage}
                                                       encType="multipart/form-data" accept="image/*" type="file"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-content">
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.fields.username}
                                                             label="Username"
                                                             onChange={this.handleChange.bind(this, "username")}
                                                             placeholder="Fill in an email.."/>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.fields.firstname}
                                                             label="Firstname"
                                                             onChange={this.handleChange.bind(this, "firstname")}
                                                             placeholder="Fill in a firstname.."/>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.fields.lastname}
                                                             label="Lastname"
                                                             onChange={this.handleChange.bind(this, "lastname")}
                                                             placeholder="Fill in a lastname.."/>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <Row>
                                                <Input s={12} multiple={false} type='select'
                                                       onChange={this.handleRoleChange}
                                                       label="Rol" icon='person_outline'
                                                       value={this.state.selectedroles}>
                                                    <option key="" value="" disabled>select role...
                                                    </option>
                                                    {this.state.roles.map((role, index) => (
                                                        <option key={role.roleId}
                                                                value={role.roleId}>{role.roleName}</option>
                                                    ))}
                                                </Input>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit"
                                                   className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle"
                                                   value="Update"/>
                                            <Link to="/users" type="button"
                                                  className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Back</Link>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
