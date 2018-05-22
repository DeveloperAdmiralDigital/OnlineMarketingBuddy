import React, {Component} from 'react';
import './StyledDropDown.css';
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

export default class StyledDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.items[0].value,
            selectItems: []
        }
    }

    handleChange = (event, index, value) => {
        this.setState({value}, () => {
            this.props.handleChange(value);
        });

    };

    componentWillMount() {
        let selectItems = [];
        this.props.items.forEach((item) => {
            selectItems.push(<MenuItem key={item.key} value={item} primaryText={item.value}/>)
        });
        this.setState({selectItems: selectItems});
    }

    render() {
        return (
            <div className="SSSFWrapper">
                <SelectField
                    name={this.props.id}
                    onChange={this.handleChange}
                    floatingLabelText={this.props.label}
                    value={this.state.value}
                    selectedMenuItemStyle={styles.color}
                    floatingLabelFocusStyle={styles.color}
                    underlineFocusStyle={styles.underlineStyle}
                    underlineStyle={styles.underlineStyle}
                >
                    {this.state.selectItems}
                </SelectField>
            </div>

        )
    }
}