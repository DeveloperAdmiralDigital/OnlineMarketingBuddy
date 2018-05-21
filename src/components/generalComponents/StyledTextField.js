import React, {Component} from 'react';
import './StyledTextField.css';

export default class StyledTextField extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s12 m12 l12">
                    <input  classID={this.props.id} required={this.props.required} ref={this.props.ref} placeholder={this.props.placeholder} value={this.props.value} disabled={this.props.disabled} defaultValue={this.props.hint} onChange={this.props.onChange} id="hint" type={this.props.type} min={this.props.min} max={this.props.max} className="validate" />
                    <label className="active" htmlFor="hint">{this.props.label}</label>
                </div>
            </div>
        )
    }
}
