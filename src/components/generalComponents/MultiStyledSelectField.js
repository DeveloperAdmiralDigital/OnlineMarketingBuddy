import React, {Component} from 'react';
import './MultiStyledSelectField.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    color: {
        color: "#E42320",
    },
    underlineStyle: {
        borderColor: "#E42320",
    },
};

export default class MultiStyledSelectField extends Component {


    itemsDialog = (values) => {
        return this.props.items.map((item) => (
            <MenuItem
                key={item.key}
                insetChildren={true}
                checked={values && values.indexOf(item.key) > -1}
                value={item.value}
                primaryText={item.value}
            />
        ));
    };

    render() {
        return (
            <div className="section">
                <SelectField
                    fullWidth={this.props.fullWidth}
                    multiple={true}
                    value={this.props.itemValues}
                    hintText={this.props.hint}
                    onChange={this.props.onChangeitem}
                    selectedMenuItemStyle={styles.color}
                    floatingLabelFocusStyle={styles.color}
                    underlineFocusStyle={styles.underlineStyle}
                >
                    {this.itemsDialog(this.props.itemValues)}
                </SelectField>
            </div>

        )
    }
}