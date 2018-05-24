import React, {Component} from 'react';
import Header from '../components/generalComponents/Header';
import * as LoginService from "../services/LoginService";
import './Home.css';
import {Row} from "react-materialize";
import Link from "react-router-dom/es/Link";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            redirect: true,
        }
    }


    render() {
        if (LoginService.checkToken()) {
            return (
                <div className="Home">
                    <Header name="Home"/>
                    <section className="containerCss">
                        <div className="col s12 m8 offset-m2 l8 offset-m2">
                            <div className="card">
                                <div className="card-content">
                                    <Row>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                                            ligula
                                            eget
                                            dolor.
                                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                            nascetur
                                            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                            quis,
                                            sem.
                                            Nulla
                                            consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
                                            vulputate
                                            eget,
                                            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                                            dictum
                                            felis eu
                                            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                                            semper
                                            nisi.
                                            Aenean
                                            vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
                                            eleifend
                                            ac,
                                            enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                                            Phasellus
                                            viverra
                                            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                                            ultricies
                                            nisi
                                            vel
                                            augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.</p>
                                    </Row>
                                    <Row>
                                        <Link to="/Dashboard" type="button"
                                              className="btn waves-effect waves-light red darken-4 buttonstyle">Dashboard</Link>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
        else {
            return (
                <div className="Home">
                    <Header name="Home"/>
                    <section className="containerCss">
                        <div className="col s12 m8 offset-m2 l8 offset-m2">
                            <div className="card">
                                <div className="card-content">
                                    <Header name="Online Marketing Buddy"/>
                                    <h4 className="center-align">This app is made by the development team of admiral
                                        digital</h4>
                                    <p> Homepage filling</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
}