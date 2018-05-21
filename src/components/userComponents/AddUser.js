import React, {Component} from 'react';
import swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {Row,Input} from 'react-materialize';
import Header from '../generalComponents/Header'
import StyledTextField from "../generalComponents/StyledTextField";
import * as UserService from '../../services/UserService';
import './AddUser.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            value: 1,
            fields: {},
            errors: {},
            image: "..image/image.jpg",
            roles: [],
            roleids: []
        };
    }

    componentDidMount(){
        /*UserService.getUserRoles().then(roles => {
            this.setState({roles: roles})
        })*/
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',

            title: 'User added!!',

            showConfirmButton: false,
            timer: 1500
        });
        /*UserService.postUser(JSON.stringify(
            {
                username: this.state.fields["username"],
                firstname: this.state.fields["firstname"],
                lastname: this.state.fields["lastname"],
                password: this.state.fields["password"],
                userimage: this.state.image,
                roleids: this.state.roleids
            }
        ));*/
            this.props.history.push('/users');
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];

        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }


    handleRoleChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({roleids: value});
    };


    render() {
        return (
            <div className="Homepage">
                <Header name="Add User"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                        <div className="card hoverable">
                            <h4 className="center">Add User</h4>
                            <div className="card-image" >
                                <img
                                    src={"data:image;base64," + this.state.image} alt="User"
                                    height="300" width="50" className="circle"/>
                                <form action="#">
                                    <div className="file-field input-field">
                                        <div
                                            className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                            <i className="material-icons">attach_file</i>
                                            <input name="file"
                                                   className="upload-file"
                                                   id="file"
                                                   required
                                                   onChange={this.handleChangeImage}
                                                   encType="multipart/form-data" accept="image/*" type="file"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-content">
                                <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleClick();
                                } }>
                                    <div className="section">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField type="email" ref="Username"  required onChange={this.handleChange.bind(this, "username")} placeholder="Fill in an email ..." label="Email *"/>
                                            </div>
                                    </div>
                                    <div className="section">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="Firstname"  required onChange={this.handleChange.bind(this, "firstname")} placeholder="Fill in a firstname..." label="Firstname *"/>
                                            </div>
                                    </div>
                                    <div className="section">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="Lastname" required onChange={this.handleChange.bind(this, "lastname")} placeholder="Fill in a lastname..." label="Lastname *"/>
                                            </div>
                                    </div>
                                    <div className="section">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField type="password" ref="Password" required onChange={this.handleChange.bind(this, "password")} placeholder="Fill in a password..." label="Password *"/>
                                            </div>
                                    </div>
                                    <div className="section">
                                            <div className="col s12 m12 l12">
                                                <Row>
                                                    <Input required s={12} multiple={false} type='select'
                                                           onChange={this.handleRoleChange}
                                                           label="Rol" icon='person_outline' defaultValue='1'>
                                                        <option key="" value="" disabled>select 1 role...
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
                                            <small style={{color: 'red'}}>Fields with a * are required</small>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle" value="Submit"/>
                                            <Link to="/users" type="button" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Back</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
