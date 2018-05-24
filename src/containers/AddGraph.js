import React, {Component} from 'react';
import swal from 'sweetalert2';
import {Row} from 'react-materialize';
import {Link} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import Moment from 'moment';
import Header from "../components/generalComponents/Header";
import * as NameService from '../services/AdvertisementNameService';
import * as GraphService from '../services/GraphService';
import * as CampaignService from "../services/CapmaignService";
import * as AdvertisementSetService from "../services/AdvertisementSetService";
import StyledDropDown from "../components/generalComponents/StyledDropDown";
import StyledTextField from "../components/generalComponents/StyledTextField";
import StyledColorPicker from "../components/generalComponents/StyledColorPicker";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'react-select/dist/react-select.css';

const GRAPH_TYPES = [
    {value: "line", key: 1},
    {value: "bar", key: 2},
    {value: "area", key: 3},
    {value: "pie", key: 4},
    {value: "radar", key: 5},
    {value: "composed", key: 6}
];
const A_TYPES = [
    {value: "clicks", key: 1},
    {value: "impressions", key: 2},
    {value: "cost", key: 3},
    {value: "users", key: 4},
    {value: "sessions", key: 5},
    {value: "transactions", key: 6},
    {value: "transactionRevenue", key: 7}
];
const FB_TYPES = [
    {value: "clicks", key: 1},
    {value: "impressions", key: 2},
    {value: "actions", key: 3},
    {value: "relevanceScore", key: 4},
    {value: "amountSpent", key: 5},
    {value: "reach", key: 6},
    {value: "tenSecondVideoViews", key: 7},
    {value: "thirtySecondVideoViews", key: 8},
    {value: "videoWatchesAt100", key: 9},
    {value: "estimatedAdRecallLiftPeople", key: 10},
    {value: "inlineLinkClicks", key: 11},
    {value: "frequency", key: 12}
];

export default class AddGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            campaignIds: [],
            fields: {
                graphTitle: "",
                graphType: "",
                data: [],
                dataKey: "",
                stroke: "#960000",
                advertisementId: null,
                lineDataKey: "",
                barDataKey: "",
                lineStroke: "#960000",
                barStroke: "#960000",
                beginDate: new Date(),
                endDate: new Date()
            },
            brush: false,
            errors: {},
            campaigns: [],
            selectedCampaign: "",
            adSets: [],
            selectedAdSet: "",
            advertisements: [],
            selectedAd: "",
            analytics: false,
            facebook: false,
        }
    }

    componentWillMount() {
        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        let fields = this.state.fields;
        fields["beginDate"] = lastWeek;
        fields["endDate"] = new Date();
        this.setState({fields: fields});

        CampaignService.getAllNames().then((campaigns) => {
            console.log("campaigns mount");
            console.log(campaigns);
            let campaignIn = [];
            campaigns.forEach((campaign) => {
                if (campaign["adCampaignName"] != null) {
                    campaignIn.push({key: campaign["adCampaignId"], value: campaign["adCampaignName"]})
                } else {
                    campaignIn.push({key: campaign["adCampaignId"], value: campaign["adCampaignCode"]})
                }
            });
            this.setState({campaigns: campaignIn});
            localStorage.setItem('campaigns', JSON.stringify(campaignIn));
        });
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    };

    handleFieldChange(field, value) {
        console.log("field: ", field, ", value: ", value);
        let fields = this.state.fields;
        fields[field] = value;
        this.setState({fields});
    }

    handleDropChange(field, item) {
        console.log("field: ", field, ", value: ", item);
        let fields = this.state.fields;
        fields[field] = item.value;
        this.setState({fields});
    }

    handleBrushChange(event) {
        console.log("field: brush, value: ", event.target.checked);

        this.setState({brush: event.target.checked});
    };

    handleDateChange(field, event, date) {
        console.log("field: ", field, ", value: ", date);
        let fields = this.state.fields;
        fields[field] = date;
        this.setState({fields});
    };

    handleCampaignChange(value) {
        console.log("campaign change: ", value);
        CampaignService.getAdSets(value.key).then((adSets) => {
            let adSetsIn = [];
            adSets.forEach((adSet) => {
                if (adSet["advertisementName"] != null) {
                    adSetsIn.push({key: adSet["advertisementSetId"], value: adSet["advertisementName"]})
                } else {
                    adSetsIn.push({key: adSet["advertisementSetId"], value: adSet["advertisementSetCode"]})
                }
            });
            console.log("adsets from campaign: ", value);
            console.log("adveritsements: ", adSetsIn);
            this.setState({
                selectedCampaign: value.value,
                adSets: adSetsIn
            });
            this.forceUpdate();
        });

    }

    handleAdSetChange(value) {
        console.log("handleAdSetChange: ", value);
        AdvertisementSetService.getAdName(value.key).then((ads) => {
            let adIn = [];
            ads.forEach((ad) => {
                if (ad["contentTitle"] != null) {
                    adIn.push({key: ad["advertisementNameId"], value: ad["contentTitle"]})
                } else if (ad["contentNotFormatted"] != null) {
                    adIn.push({key: ad["advertisementNameId"], value: ad["contentNotFormatted"]})
                } else {
                    adIn.push({key: ad["advertisementNameId"], value: ad["advertisementNameCode"]})
                }
            });
            console.log("adveritsements from adset: ", value);
            console.log("adveritsements: ", adIn);
            this.setState({
                selectedAdSet: value.value,
                advertisements: adIn
            });
            this.forceUpdate();
        });
    }

    handleAdChange(value) {
        console.log("handleAdChange: ", value);
        NameService.getById(value.key).then((data) => {
            console.log("NameService.getById: ", data);
            let fields = this.state.fields;
            fields["advertisementId"] = data["advertisementNameId"];
            this.setState({
                selectedAd: value.value,
                fields: fields,
                analytics: data["containsAnalytics"],
                facebook: !data["containsAnalytics"]
            });

            this.forceUpdate();
        });
    }

    handleAdd = () => {
        console.log("handleAdd: ", this.state);
        let fields = this.state.fields;
        let output = this.setOutput(fields);
        if (this.state.brush) {
            output.childrenProps["brushProps"] = {
                dataKey: "date",
                stroke: fields["stroke"]
            };
        }
        
        if (!output["complete"]) {
            swal({
                position: 'center',
                type: 'error',
                title: 'fill in all fields',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let data = {
                beginDate: Moment(fields.beginDate).format('DD-MM-YYYY'),
                endDate: Moment(fields.endDate).format('DD-MM-YYYY')
            };
            NameService.getDetails(fields["advertisementId"], JSON.stringify(data))
                .then((data) => {
                    console.log("NameService.getDetails data: ", data);
                    if (data['analyticsAdvertisements'].length >= 1) {
                        console.log("analytics");
                        let analytics = data["analyticsAdvertisements"];
                        analytics.forEach((dat) => {
                            dat["date"] = dat.adDate.dayOfMonth + "-" + dat.adDate.monthOfYear + "-" + dat.adDate.yearOfEra;
                        });
                        let fields = this.state.fields;
                        fields["data"] = analytics;
                        this.setState({fields});
                    } else if (data['facebookAdvertisements'].length >= 1) {
                        console.log("facebook");
                        let facebook = data["facebookAdvertisements"];
                        facebook.forEach((dat) => {
                            dat["date"] = dat.adDate.dayOfMonth + "-" + dat.adDate.monthOfYear + "-" + dat.adDate.yearOfEra;
                        });
                        let fields = this.state.fields;
                        fields["data"] = facebook;
                        this.setState({fields});
                    } else {
                        console.log("no data");
                    }
                })
                .then(() => {
                    if (fields["data"].length >= 1) {
                        output.data = fields["data"];
                        GraphService.postGraph(output);
                        swal({
                                position: 'top-end',
                                type: 'success',
                                title: 'Graph Added!!',
                                showConfirmButton: false,
                                timer: 2500
                            }).then(this.props.history.push('/dashboard'));
                    } else {
                        swal({
                            position: 'center',
                            type: 'error',
                            title: 'No data found',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                });
        }

    };


    render() {
        let datakeys = null;
        let composedStroke = null;
        if (this.state.fields["graphType"] === "composed") {
            composedStroke =
                <Row>
                    <div className="col s12 m6 l6">
                        <StyledColorPicker name='lineStroke' label="lineStroke"
                                           handleChange={this.handleFieldChange.bind(this, "lineStroke")}/>
                    </div>
                    <div className="col s12 m6 l6">
                        <StyledColorPicker name='barStroke' label="barStroke"
                                           handleChange={this.handleFieldChange.bind(this, "barStroke")}/>
                    </div>
                </Row>;
        }
        let campaignSelect =
            <div className="col s12 m6 l4">
                <label>campaigns: </label>
                <p>Loading campaigns...</p>
            </div>;
        let adSetSelect =
            <div className="col s12 m6 l4">
                <label>AdvertisementSet: </label>
                <p>select a campaign.</p>
            </div>;
        let adSelect =
            <div className="col s12 m6 l4">
                <label>Advertisement: </label>
                <p>select an AdvertisementSet.</p>
            </div>;

        if (localStorage.getItem("campaigns") !== null && localStorage.getItem("campaigns").length >= 1) {
            campaignSelect =
                <div className="col s12 m6 l4">
                    <StyledDropDown items={JSON.parse(localStorage.getItem("campaigns"))}
                                    floatingLabelText="Campaigns"
                                    handleChange={this.handleCampaignChange.bind(this)}
                                    label="Local Campaigns: "/>
                </div>;
        }

        if (this.state.campaigns.length >= 1) {
            campaignSelect =
                <div className="col s12 m6 l4">
                    <StyledDropDown items={this.state.campaigns}
                                    floatingLabelText="Campaigns"
                                    handleChange={this.handleCampaignChange.bind(this)}
                                    label="Campaigns: "/>
                </div>;
        }
        if (this.state.adSets.length >= 1) {
            adSetSelect =
                <div className="col s12 m6 l4">
                    <StyledDropDown items={this.state.adSets}
                                    floatingLabelText="AdSets"
                                    handleChange={this.handleAdSetChange.bind(this)}
                                    label="AdvertisementSet: "
                                    key={`adSets-${this.state.selectedCampaign}`}/>
                </div>;
        }
        if (this.state.advertisements.length >= 1) {
            adSelect =
                <div className="col s12 m6 l4">
                    <StyledDropDown items={this.state.advertisements}
                                    floatingLabelText="Advertisements"
                                    handleChange={this.handleAdChange.bind(this)}
                                    label="Advertisement: "
                                    key={`ad-${this.state.selectedAdSet}`}/>
                </div>;
        }

        if (this.state.facebook) {
            if ("composed" !== this.state.fields["graphType"]) {
                datakeys = <Row>
                    <StyledDropDown id="dataKey" items={FB_TYPES} floatingLabelText="dataKey"
                                    handleChange={this.handleDropChange.bind(this, "dataKey")}
                                    label="dataKey"/>
                </Row>;
            } else {
                datakeys =
                    <Row>
                        <div className="col s12 m6 l6">
                            <StyledDropDown id="lineDataKey" items={FB_TYPES} floatingLabelText="lineDataKey"
                                            handleChange={this.handleDropChange.bind(this, "lineDataKey")}
                                            label="DataKey Line"/>
                        </div>
                        <div className="col s12 m6 l6">
                            <StyledDropDown id="barDataKey" items={FB_TYPES} floatingLabelText="barDataKey"
                                            handleChange={this.handleDropChange.bind(this, "barDataKey")}
                                            label="DataKey bar"/>
                        </div>
                    </Row>;
            }
        }
        if (this.state.analytics) {
            if ("composed" !== this.state.fields["graphType"]) {
                datakeys = <Row>
                    <StyledDropDown id="dataKey" items={A_TYPES} floatingLabelText="dataKey"
                                    handleChange={this.handleDropChange.bind(this, "dataKey")}
                                    label="dataKey"/>
                </Row>;
            } else {
                datakeys =
                    <Row>
                        <div className="col s12 m6 l6">
                            <StyledDropDown id="lineDataKey" items={A_TYPES} floatingLabelText="lineDataKey"
                                            handleChange={this.handleDropChange.bind(this, "lineDataKey")}
                                            label="DataKey Line"/>
                        </div>
                        <div className="col s12 m6 l6">
                            <StyledDropDown id="barDataKey" items={A_TYPES} floatingLabelText="barDataKey"
                                            handleChange={this.handleDropChange.bind(this, "barDataKey")}
                                            label="DataKey bar"/>
                        </div>
                    </Row>;
            }
        }


        return (
            <div className="Homepage">
                <Header name="Add Graph"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                        <div className="card hoverable">
                            <div className="card-content">
                                <form className="addGraph" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleAdd();
                                }}>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <Row>
                                                <div className="col s12 m12 l12">
                                                    <StyledTextField ref="graphTitle" required
                                                                     onChange={this.handleChange.bind(this, "graphTitle")}
                                                                     placeholder="Fill in a title for the graph..."
                                                                     label="GraphTitle"/>
                                                </div>
                                                <div className="col s12 m6 l6">
                                                    <StyledDropDown items={GRAPH_TYPES} floatingLabelText="Graph Types"
                                                                    handleChange={this.handleDropChange.bind(this, "graphType")}
                                                                    label="GraphType"/>
                                                </div>
                                                <div className="col s12 m6 l6">
                                                    <StyledColorPicker name='stroke' label="Stroke"
                                                                       handleChange={this.handleFieldChange.bind(this, "stroke")}/>
                                                </div>
                                            </Row>
                                            {composedStroke}
                                        </div>
                                    </div>
                                    <div className="section">
                                        <Row>
                                            <div className="col s12 m6 l6">
                                                <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                            hintText="Begin Date for data" mode="landscape"
                                                            container="inline" value={this.state.fields["beginDate"]}
                                                            onChange={this.handleDateChange.bind(this, "beginDate")}/>
                                            </div>
                                            <div className="col s12 m6 l6">
                                                <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                            hintText="End Date for data" mode="landscape"
                                                            container="inline" value={this.state.fields["endDate"]}
                                                            onChange={this.handleDateChange.bind(this, "endDate")}/>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col s12 m6 l6">
                                                <FormControlLabel
                                                    control={<Switch checked={this.state.brush}
                                                                     onChange={this.handleBrushChange.bind(this)}
                                                                     value="brush"
                                                                     color="default"/>}
                                                    label="Brush"/>
                                            </div>
                                        </Row>
                                        <div className="col s12 m12 l12">
                                            {/*<Row>
                                                <StyledTextField ref="advertisementId" required
                                                                 onChange={this.handleChange.bind(this, "advertisementId")}
                                                                 placeholder="Fill in a advertisement Id for the graph..."
                                                                 label="AdvertisementId"/>
                                            </Row>*/}
                                            <Row>
                                                {campaignSelect}
                                                {adSetSelect}
                                                {adSelect}
                                            </Row>
                                        </div>
                                        <div className="col s12 m12 l12">
                                            {datakeys}
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit"
                                                   className="btn waves-effect waves-light red accent-4 buttonstyle"
                                                   value="Add Graph"/>
                                            <Link to="/dashboard" type="button"
                                                  className="btn waves-effect waves-light  red buttonstyle">Terug</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
            ;

    }

    setOutput(fields) {
        let output = {graphTitle: fields["graphTitle"], childrenProps: []};
        if (fields["graphType"] !== "" && fields["advertisementId"] !== null) {
            output["graphType"] = fields["graphType"];
        } else {
            return {complete: false};
        }

        if (fields["graphType"] === "composed") {
            if (fields["lineDataKey"] !== "" && fields["barDataKey"] !== "" && fields["barStroke"] !== "" && fields["lineStroke"] !== "") {
                output.childrenProps["yAxisProps"] = [
                    {
                        yAxisId: "line",
                        hide: false,
                        dataKey: fields["lineDataKey"],
                        orientation: "Left",
                    },
                    {
                        yAxisId: "bar",
                        hide: false,
                        dataKey: fields["barDataKey"],
                        orientation: "Right",

                    }
                ];
                output.drawProps = [
                    {
                        graph: "line",
                        type: 'linear',
                        dataKey: fields["lineDataKey"],
                        stroke: fields["lineStroke"],
                    },
                    {
                        graph: "bar",
                        dataKey: fields["barDataKey"],
                        stroke: fields["barStroke"],
                    }

                ];
            } else {
                return {complete: false};
            }
        } else {
            if (fields["dataKey"] !== "") {
                output.childrenProps["yAxisProps"] = [
                    {
                        hide: false,
                        dataKey: fields["dataKey"]
                    }
                ];
                output["drawProps"] = [
                    {
                        dataKey: fields["dataKey"],
                        stroke: fields["stroke"],
                    }
                ];
            } else {
                return {complete: false};
            }
        }
        output["complete"] = true;
        console.log("output: ", output);
        return output;
    }
}