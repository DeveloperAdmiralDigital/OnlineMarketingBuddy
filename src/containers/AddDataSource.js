import React, {Component} from 'react';
import swal from 'sweetalert2';
import {Row} from 'react-materialize';
import {Link} from 'react-router-dom';
import Loader from 'react-dots-loader';
import Header from "../components/generalComponents/Header";
import StyledDropDown from "../components/generalComponents/StyledDropDown";
import MultiStyledSelectField from "../components/generalComponents/MultiStyledSelectField";
import 'react-select/dist/react-select.css';
import 'react-dots-loader/index.css';
import './AddDatasource.css';
import * as AnalyticsAccountService from '../services/AnalyticsAccountService';
import * as AnalyticsPropertyService from '../services/AnalyticsPropertyService';
import * as AnalyticsProfileService from '../services/AnalyticsProfileService';

export default class AddDataSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analyticsAccounts:[],
            analyticsProperties:[],
            analyticsProfiles:[],
            fields:{
                account:"",
                property:"",
                profiles:[],
            }
        }
    }

    componentWillMount() {
        AnalyticsAccountService.getAll().then((accounts) => {
            console.log("accounts mount: ",accounts);
            let accountsIn = [];
            accounts.forEach((account) => {
                accountsIn.push({key: account["analyticsAccountCode"], value: account["analyticsAccountName"]});
            });
            this.setState({analyticsAccounts: accountsIn});
        });
    }

    handleAccountChange(item) {
        console.log("field: account, value: ", item);
        let fields = this.state.fields;
        fields["account"] = item;
        this.setState({fields});
        AnalyticsPropertyService.getAll(item.key).then((properties) => {
            console.log("handleAccountChange properties: ", properties);
            let propertiesIn = [];
            properties.forEach((property) => {
                    propertiesIn.push({key: property["analyticsPropertyCode"], value: property["analyticsPropertyName"]});
            });
            this.setState({
                analyticsProperties: propertiesIn
            });
        });

    }

    handlePropertyChange(item) {
        console.log("field: property, value: ", item);
        let fields = this.state.fields;
        fields["property"] = item;
        this.setState({fields});
        AnalyticsProfileService.getAll(this.state.fields.account.key,item.key).then((profiles) => {
            console.log("handlePropertyChange profiles: ", profiles);
            let profilesIn = [];
            profiles.forEach((profile) => {
                profilesIn.push({key: profile["analyticsProfileCode"], value: profile["analyticsProfileName"]});
            });
            this.setState({
                analyticsProfiles: profilesIn
            });
        });

    }

    handleProfileChange(value) {
        console.log("field: profiles, value: ", value);
        let fields = this.state.fields;
        fields["profiles"] = value;
        this.setState({fields});
    }

    handleAdd(){
        console.log("fields.account: ", this.state.fields.account );
        console.log("fields.property: ", this.state.fields.property );
        console.log("fields.profiles: ", this.state.fields.profiles );
    }

    render() {
        let accounts =
            <div className="col s12 m12 l6">
                <label>Analytics accounts:</label>
                <Loader size={7} distance={7} />
            </div>;
        let properties =
            <div className="col s12 m12 l6">
                <label>Analytics properties: </label>
                <p>select an account.</p>
            </div>;
        let profiles =
            <div className="col s12 m12 l6">
                <label>Analytics profiles: </label>
                <p>select a property.</p>
            </div>;

        if (this.state.analyticsAccounts.length >= 1) {
            accounts =
                <div className="col s12 m12 l6">
                    <StyledDropDown items={this.state.analyticsAccounts}
                                    handleChange={this.handleAccountChange.bind(this)}
                                    label="Analytics accounts: "/>
                </div>;
        }

        if (this.state.fields["account"] !== "" && this.state.analyticsProperties.length === 0) {
            properties =
                <div className="col s12 m12 l6" id={"propertiesLoading"}>
                    <label>Analytics properties: </label>
                    <Loader size={7} distance={7} />
                </div>;
        }
        if (this.state.analyticsProperties.length >= 1) {
            properties =
                <div className="col s12 m12 l6">
                    <StyledDropDown items={this.state.analyticsProperties}
                                    handleChange={this.handlePropertyChange.bind(this)}
                                    label="Analytics properties: "/>
                </div>;
        }

        if (this.state.fields["property"] !== "" && this.state.analyticsProfiles.length === 0) {
            profiles =
                <div className="col s12 m12 l6" id={"profilesLoading"}>
                    <label>Analytics profiles: </label>
                    <Loader size={7} distance={7}/>
                </div>;
        }
        if (this.state.analyticsProfiles.length >= 1) {
            profiles =
                <div className="col s12 m12 l6">
                    <MultiStyledSelectField
                        label="Analytics profiles: "
                        fullWidth={true}
                        items={this.state.analyticsProfiles}
                        itemValues={this.state.fields["profiles"]}
                        onChangeitem={this.handleProfileChange.bind(this)}
                    />
                </div>;
        }


        return (
            <div className="Homepage">
                <Header name="Add Datasources"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                        <div className="card hoverable">
                            <div className="card-content">
                                <form className="addDatasource" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleAdd;
                                }}>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <Row>
                                                {accounts}
                                            </Row>
                                            <Row>
                                                {properties}
                                            </Row>
                                            <Row>
                                                {profiles}
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit"
                                                   className="btn waves-effect waves-light red accent-4 buttonstyle"
                                                   value="Add Datasources"/>
                                            <Link to="/" type="button"
                                                  className="btn waves-effect waves-light  red buttonstyle">Terug</Link>
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