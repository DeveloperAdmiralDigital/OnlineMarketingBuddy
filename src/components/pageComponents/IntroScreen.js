import React, {Component} from 'react';
import './IntroScreen.css';

export default class IntroScreen extends Component {
    render(){
        return(
            <div className="introscreen center">
                <h3>Welkom to the Online Marketing Buddy!</h3>
                <br/>
                <p>
                    Please log in!
                </p>
            </div>
        )
    }
}