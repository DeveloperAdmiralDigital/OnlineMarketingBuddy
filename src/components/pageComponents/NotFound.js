import React, {Component} from 'react';
import swal from 'sweetalert2'
import Redirect from "react-router-dom/es/Redirect";
import Header from '../generalComponents/Header'
import './NotFound.css';

export default class NotFound extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

    componentDidMount(){
        this.test();
    }

    test = () => {
        swal({
            title: '404 Error!',
            text: 'Sending you back to the Home page.',
            timer: 2000,
            onOpen: () => {
                swal.showLoading()
            },
            allowOutsideClick: false

        }).then((result) => {
            if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
            ) {
                this.setState({redirect: true});
            }
        })
    };

    render() {
        let redirecting=null;
        if (this.state.redirect) {
            redirecting = <Redirect to='/login'/>;
            this.setState({redirect: false})
        }

        return (
            <div className="Homepage">
                <Header name="404 Not Found"/>
                {redirecting}
            </div>
        )
    }
}