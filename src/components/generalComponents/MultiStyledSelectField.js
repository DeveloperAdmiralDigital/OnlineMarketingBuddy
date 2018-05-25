import React, {Component} from 'react';
import './MultiStyledSelectField.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    color: {
        color: "#960000",
    },
    underlineStyle: {
        borderColor: "#960000",
    },
};

export default class MultiStyledSelectField extends Component {
    constructor(props){
        super(props);
    }


    itemsDialog = (values) => {
        return this.props.items.map((item) => (
            <MenuItem
                key={item.key}
                insetChildren={true}
                checked={values && values.indexOf(item) > -1}
                value={item}
                primaryText={item.value}
            />
        ));
    };

    onChangeitem = (event, index, value) => {
        console.log("onChangeitem value: ", value);
        this.props.onChangeitem(value);
    };

    render() {
        return (
            <div className="section">
                <SelectField
                    fullWidth={this.props.fullWidth}
                    multiple={true}
                    value={this.props.itemValues}
                    hintText={this.props.hint}
                    onChange={this.onChangeitem}
                    floatingLabelText={this.props.label}
                    selectedMenuItemStyle={styles.color}
                    floatingLabelFocusStyle={styles.color}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                >
                    {this.itemsDialog(this.props.itemValues)}
                </SelectField>
            </div>

        )
    }
}