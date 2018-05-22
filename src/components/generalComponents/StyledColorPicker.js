import React, {Component} from 'react';
import './StyledColorPicker.css';
import ColorPicker from 'material-ui-color-picker';

export default class StyledColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '#960000'
        }
    }

    handleChange = (value) => {
        this.setState({value}, () => {
            this.props.handleChange(value);
        });

    };


    render() {
        return (
            <div className="row">
                <label className="active" htmlFor="hint">{this.props.label}</label>
                <ColorPicker name={this.props.name} defaultValue='#960000' onChange={this.handleChange}
                             className="validate" id="hint"/>
            </div>
        )
    }
}
