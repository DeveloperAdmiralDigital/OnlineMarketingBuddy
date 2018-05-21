import React, { Component } from 'react';
import Home from '../../containers/Home';
import * as LoginService from "../../services/LoginService";
/**
 * Higher-order component (HOC) to wrap restricted pages
 */

export default function(WrapperComponent) {
    class CheckTokenComponent extends Component {

        checkAuthentication(params) {
            if(!LoginService.checkToken()){
                return false;
            }
            return true;
        }


        render() {
            if(this.checkAuthentication(this.props)){
                    return <WrapperComponent {...this.props} />
            }else{
                return <Home/>;
            }
        }
    }
    return CheckTokenComponent;
}
