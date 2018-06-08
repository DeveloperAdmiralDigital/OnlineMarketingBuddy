import React, {Component} from 'react';
import swal from 'sweetalert2';
import {Row} from 'react-materialize';
import {Link} from 'react-router-dom';
import Moment from 'moment';
import Loader from 'react-dots-loader';
import Switch from '@material-ui/core/Switch';
import DatePicker from 'material-ui/DatePicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as NameService from '../services/AdvertisementNameService';
import * as GraphService from '../services/GraphService';
import * as CampaignService from "../services/CapmaignService";
import * as AdvertisementSetService from "../services/AdvertisementSetService";
import Header from "../components/generalComponents/Header";
import StyledDropDown from "../components/generalComponents/StyledDropDown";
import StyledTextField from "../components/generalComponents/StyledTextField";
import StyledColorPicker from "../components/generalComponents/StyledColorPicker";
import MultiStyledSelectField from "../components/generalComponents/MultiStyledSelectField";
import 'react-select/dist/react-select.css';
import 'react-dots-loader/index.css';
import './AddGraph.css';

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
const STROKE = [
    "#960000",
    "#ff0000",
    "#009600",
    "#00ff00",
    "#000096",
    "#0000ff",
    "#320000",
    "#c80000",
    "#003200",
    "#00c800",
    "#000032",
    "#0000c8",
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
                dataKey: [],
                stroke: "#960000",
                advertisementId: null,
                lineDataKey: [],
                barDataKey: [],
                lineStroke: "#960000",
                barStroke: "#960000",
                beginDate: new Date(),
                endDate: new Date()
            },
            brush: true,
            errors: {},
            campaigns: [],
            selectedCampaign: "",
            adSets: [],
            selectedAdSet: "",
            advertisements: [],
            selectedAd: "",
            analytics: false,
            facebook: false
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

    handleFieldChange(field, value) {
        console.log("field: ", field, ", value: ", value);
        let fields = this.state.fields;
        fields[field] = value;
        this.setState({fields});
    }

    handleDropChange(field, item) {
        this.handleFieldChange(field, item.value)
    }

    handleChange(field, event) {
        this.handleFieldChange(field, event.target.value);
    };

    handleBrushChange(event) {
        console.log("field: brush, value: ", event.target.checked);
        this.setState({brush: event.target.checked});
    };

    handleDateChange(field, event, date) {
        this.handleFieldChange(field, date);
    };

    handleCampaignChange(value) {
        console.log("campaign change: ", value);
        this.setState({selectedCampaign: value});
        CampaignService.getAdSets(value.key).then((adSets) => {
            console.log("handleCampaignChange adsets: ", adSets);
            let adSetsIn = [];
            adSets.forEach((adSet) => {
                {
                    adSetsIn = (adSet["advertisementName"] != null) ? this.pushArray(adSetsIn, {
                            key: adSet["advertisementSetId"],
                            value: adSet["advertisementName"]
                        })
                        : this.pushArray(adSetsIn, {
                            key: adSet["advertisementSetId"],
                            value: adSet["advertisementSetCode"]
                        })
                }
            });
            this.setState({
                adSets: adSetsIn
            });
        });
    }

    handleAdSetChange(value) {
        console.log("handleAdSetChange: ", value);
        this.setState({
            selectedAdSet: value.value
        });
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
            this.setState({
                advertisements: adIn
            });
        });
    }

    handleAdChange(value) {
        console.log("handleAdChange: ", value);
        this.setState({
            selectedAd: value.value
        });
        NameService.getById(value.key).then((data) => {
            let fields = this.state.fields;
            fields["advertisementId"] = data["advertisementNameId"];
            this.setState({
                fields: fields,
                analytics: data["containsAnalytics"],
                facebook: !data["containsAnalytics"]
            });
        });
    }

    handleAdd = () => {
        console.log("handleAdd: ", this.state.fields);
        let fields = this.state.fields;
        let output = this.setOutput(fields);
        console.log(this.state.brush);
        if (this.state.brush) {
            output.childrenProps["brushProps"] = {
                dataKey: "date",
                stroke: fields["stroke"]
            };
        }
        console.log("brush: ", output.childrenProps["brushProps"]);
        if (!output["complete"]) {
            swal({
                type: 'error',
                title: 'fill in all fields',
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            let date = {
                beginDate: this.momentDate(fields.beginDate),
                endDate: this.momentDate(fields.endDate)
            };
            NameService.getDetails(fields["advertisementId"], JSON.stringify(date))
                .then((data) => {
                    console.log("NameService.getDetails data: ", data);
                    if ("analyticsAdvertisements" in data) {
                        if (data['analyticsAdvertisements'].length >= 1 || data['facebookAdvertisements'].length >= 1) {
                            let arrayData = (data['analyticsAdvertisements'].length >= 1) ? data["analyticsAdvertisements"] : data["facebookAdvertisements"];
                            this.arraySetDate(arrayData);
                        }
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
        let campaignSelect =
            <div className="col s12 m6 l4">
                <label>campaigns: </label>
                <Loader size={7} distance={7}/>
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

        if (this.state.selectedCampaign !== "" && this.state.adSets.length === 0) {
            adSetSelect =
                <div className="col s12 m6 l4" id={`adSets-${this.state.selectedCampaign}`}>
                    <label>AdvertisementSet: </label>
                    <Loader size={7} distance={7}/>
                </div>;
        }
        if (this.state.adSets.length >= 1) {
            adSetSelect =
                <div className="col s12 m6 l4" id={`adSets-${this.state.selectedCampaign}`}>
                    <StyledDropDown items={this.state.adSets}
                                    floatingLabelText="AdSets"
                                    handleChange={this.handleAdSetChange.bind(this)}
                                    label="AdvertisementSet: "/>
                </div>;
        }

        if (this.state.selectedAdSet !== "" && this.state.advertisements.length === 0) {
            adSelect =
                <div className="col s12 m6 l4" id={`adSets-${this.state.selectedAdSet}`}>
                    <label>Advertisement: </label>
                    <Loader size={7} distance={7}/>
                </div>;
        }
        if (this.state.advertisements.length >= 1) {
            adSelect =
                <div className="col s12 m6 l4" id={`ad-${this.state.selectedAdSet}`}>
                    <StyledDropDown items={this.state.advertisements}
                                    floatingLabelText="Advertisements"
                                    handleChange={this.handleAdChange.bind(this)}
                                    label="Advertisement: "/>
                </div>;
        }

        if (this.state.facebook) {
            datakeys = this.setDataKeys(FB_TYPES);
        }
        if (this.state.analytics) {
            datakeys = this.setDataKeys(A_TYPES);
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
                                            <Row>
                                                <div className="col s12 m6 l6">
                                                    <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                                hintText="Begin Date for data" mode="landscape"
                                                                container="inline"
                                                                value={this.state.fields["beginDate"]}
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
                                                                         color="primary"/>}
                                                        label="Brush"/>
                                                </div>
                                            </Row>
                                            <Row>
                                                {campaignSelect}
                                                {adSetSelect}
                                                {adSelect}
                                            </Row>
                                            <Row>
                                                {datakeys}
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit"
                                                   className="btn waves-effect waves-light red accent-4 buttonstyle"
                                                   value="Add Graph"/>
                                            <Link to="/dashboard" type="button"
                                                  className="btn waves-effect waves-light  red buttonstyle"> Back </Link>
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
        let output = {graphTitle: fields["graphTitle"], childrenProps: [], drawProps: []};
        if (fields["graphType"] !== "" && fields["advertisementId"] !== null) {
            output["graphType"] = fields["graphType"];
        } else {
            return {complete: false};
        }

        if (fields["graphType"] === "composed") {
            if (fields["lineDataKey"].length >= 1 && fields["barDataKey"].length >= 1 && fields["barStroke"] !== "" && fields["lineStroke"] !== "") {
                let i = 0;
                fields["lineDataKey"].forEach((dataKey) => {
                    output.drawProps.push({
                        graph: "line",
                        type: 'linear',
                        dataKey: dataKey.value,
                        stroke: STROKE[i],
                    });
                    i++
                });
                i = 11;
                fields["barDataKey"].forEach((dataKey) => {
                    output.drawProps.push({
                        graph: "bar",
                        dataKey: dataKey.value,
                        stroke: STROKE[i],
                    });
                    i++
                });
                output.childrenProps["yAxisProps"] =
                    [{
                        yAxisId: "line",
                        hide: false,
                        orientation: "Left",
                    }, {
                        yAxisId: "bar",
                        hide: false,
                        orientation: "Right",
                    }];

                /*                if(fields["lineDataKey"].length === 1){
                                    output.childrenProps.yAxisProps[0] =
                                        {
                                            yAxisId: "line",
                                            hide: false,
                                            dataKey: fields.lineDataKey[0].value,
                                            orientation: "Left",
                                        };
                                }
                                if(fields["barDataKey"].length === 1){
                                    output.childrenProps.yAxisProps[1] =
                                        {
                                            yAxisId: "bar",
                                            hide:false,
                                            dataKey: fields.barDataKey[0].value,
                                            orientation: "Right",
                                        };
                                }*/
            } else {
                return {complete: false};
            }
        } else {
            if (fields["dataKey"] !== "") {
                output.childrenProps["yAxisProps"] = [
                    {
                        hide: false,
                        // dataKey: fields.dataKey[0].value
                    }
                ];
                let i = 0;
                fields["dataKey"].forEach((dataKey) => {
                    output.drawProps.push({
                        dataKey: dataKey.value,
                        stroke: STROKE[i],
                    });
                    i++;
                });
            } else {
                return {complete: false};
            }
        }
        output["complete"] = true;
        console.log("output: ", output);
        return output;
    }

    pushArray(array, value) {
        array.push(value);
        return array;
    }

    momentDate(date) {
        return Moment(date).format('DD-MM-YYYY');
    }

    arraySetDate(array) {
        array.forEach((dat) => {
            dat["date"] = dat.adDate.dayOfMonth + "-" + dat.adDate.monthOfYear + "-" + dat.adDate.yearOfEra;
        });
        let fields = this.state.fields;
        fields["data"] = array;
        this.setState({fields});
    }

    setDataKeys(array) {
        let datakeys = null;
        if ("composed" !== this.state.fields["graphType"]) {
            datakeys =
                <div className="col s12 m12 l12">
                    <MultiStyledSelectField
                        label="DataKey"
                        fullWidth={false}
                        items={array}
                        itemValues={this.state.fields["dataKey"]}
                        onChangeitem={this.handleFieldChange.bind(this, "dataKey")}
                    />
                </div>;
        } else {
            datakeys =
                <div className="col s12 m12 l12">
                    <div className="col s12 m6 l6">
                        <MultiStyledSelectField
                            label="DataKey Line"
                            fullWidth={false}
                            items={array}
                            itemValues={this.state.fields["lineDataKey"]}
                            onChangeitem={this.handleFieldChange.bind(this, "lineDataKey")}
                        />
                    </div>
                    <div className="col s12 m6 l6">
                        <MultiStyledSelectField
                            label="DataKey bar"
                            fullWidth={false}
                            items={array}
                            itemValues={this.state.fields["barDataKey"]}
                            onChangeitem={this.handleFieldChange.bind(this, "barDataKey")}
                        />
                    </div>
                </div>;
        }
        return datakeys;
    }
}