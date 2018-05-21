import React, {Component} from 'react';
import swal from 'sweetalert2';
import Header from "../components/generalComponents/Header";
import * as NameService from '../services/AdvertisementNameService';
import * as GraphService from '../services/GraphService';
import StyledTextField from "../components/generalComponents/StyledTextField";
import {Row} from 'react-materialize';
import DatePicker from 'material-ui/DatePicker';
import 'react-select/dist/react-select.css';
import {Link} from 'react-router-dom';
import Moment from 'moment';

const GRAPH_TYPES = [{type: "line", key: 1}, {type: "bar", key: 2}, {type: "area", key: 3}, {type: "composed", key: 4}];

export default class AddGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            campaignIds: [],
            fields: {
                graphTitle: "Graph titel",
                graphType: "line",
                data: [],
                dataKey: "cost",
                stroke: "#960000",
                advertisementId: 1,
                lineDataKey: "",
                barDataKey: "",
                lineStroke: "#960000",
                barStroke: "#960000"
            },
            brush: false,
            beginDate: new Date(),
            endDate: new Date(),
            errors: {},
            campaigns: []
        }
    }

    componentDidMount() {
        /*        let self = this;
                CampaignService.getAll().then(campaigns => {
                    self.setState({campaigns: campaigns})
                });*/
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    };

    chooseBeginDate = (event, date) => {
        this.setState({beginDate: date});
    };

    chooseEndDate = (event, date) => {
        this.setState({endDate: date});
    }

    handleAdd = () => {
        if (!this.state.fields["stroke"].includes("#")) {
            this.state.fields["stroke"] = "#" + this.state.fields["stroke"];
        }
        let output = {
            graphTitle: this.state.fields["graphTitle"],
            graphType: this.state.fields["graphType"],
            childrenProps: {
                yAxisProps: [
                    {hide: false}
                ]
            },
            drawProps: {
                dataKey: this.state.fields["dataKey"],
                stroke: this.state.fields["stroke"]
            }

        };
        if (this.state.brush) {
            output.childrenProps = {
                yAxisProps: output.childrenProps.yAxisProps,
                brushProps: {
                    dataKey: "date",
                    stroke: this.state.fields["stroke"]
                }
            }
        }
        if (this.state.fields["graphType"] === "composed") {
            if (!this.state.fields["lineStroke"].includes("#")) {
                this.state.fields["lineStroke"] = "#" + this.state.fields["lineStroke"];
            }
            if (!this.state.fields["barStroke"].includes("#")) {
                this.state.fields["barStroke"] = "#" + this.state.fields["barStroke"];
            }
            output["yAxisprops"] = [
                {
                    yAxisId: "line",
                    hide: false,
                    dataKey: this.state.fields["lineDataKey"],
                    orientation: "Left",
                },
                {
                    yAxisId: "bar",
                    hide: false,
                    dataKey: this.state.fields["barDataKey"],
                    orientation: "Right",

                }
            ];
            output.drawProps = [
                {
                    graph: "line",
                    type: 'linear',
                    dataKey: this.state.fields["lineDataKey"],
                    stroke: this.state.fields["lineStroke"],
                },
                {
                    graph: "bar",
                    dataKey: this.state.fields["barDataKey"],
                    stroke: this.state.fields["barStroke"],
                }

            ];
        }

        swal({
            type: 'success',
            title: 'Loading graph data',
            showConfirmButton: false,
            timer: 3500
        });

        let data = {
            beginDate: Moment(this.state.beginDate).format('DD-MM-YYYY'),
            endDate: Moment(this.state.endDate).format('DD-MM-YYYY')
        };

        NameService.getDetails(this.state.fields["advertisementId"], JSON.stringify(data))
            .then((data) => {
                console.log("fetch data");
                console.log(data);
                this.state.fields["data"] = data;
                GraphService.postGraph(JSON.stringify(output));
            }).then(
            swal({
                position: 'top-end',
                type: 'success',

                title: 'Graph Added!!',

                showConfirmButton: false,
                timer: 1500
            })
        ).then(this.props.history.push('/dashboard'));


    };


    render() {
        let Datakey = <div>
            <StyledTextField ref="dataKey" required onChange={this.handleChange.bind(this, "dataKey")}
                             placeholder="Put in dataKey..." label="DataKey *"/>
        </div>;
        let composedStroke = null;
        if (this.state.fields["graphType"] === "composed") {
            composedStroke =
                <div>
                    <StyledTextField ref="lineStroke" required onChange={this.handleChange.bind(this, "lineStroke")}
                                     placeholder="Put in #RGB colour line..." label="LineStroke *"/>
                    <StyledTextField ref="barStroke" required onChange={this.handleChange.bind(this, "barStroke")}
                                     placeholder="Put in #RGB colour bar..." label="BarStroke *"/>
                </div>;
            Datakey =
                <div>
                    <StyledTextField ref="lineDataKey" required
                                     onChange={this.handleChange.bind(this, "lineDataKey")}
                                     placeholder="Put in datakey line..." label="LineDataKey *"/>
                    <StyledTextField ref="barDataKey" required onChange={this.handleChange.bind(this, "barDataKey")}
                                     placeholder="Put in datakey bar..." label="BarDataKey *"/>
                </div>;
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
                                                <StyledTextField ref="graphTitle" required
                                                                 onChange={this.handleChange.bind(this, "graphTitle")}
                                                                 placeholder="Fill in a title for the graph..."
                                                                 label="GraphTitle *"/>
                                                <StyledTextField ref="graphType" required
                                                                 onChange={this.handleChange.bind(this, "graphType")}
                                                                 placeholder="Fill in a type for the graph..."
                                                                 label="GraphType *"/>
                                            </Row>
                                            <Row>
                                                <StyledTextField ref="stroke" required
                                                                 onChange={this.handleChange.bind(this, "stroke")}
                                                                 placeholder="Put in #RGB colour graph..."
                                                                 label="Stroke *"/>
                                                {composedStroke}
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <Row>
                                                <div className="col s12 m6 l6">
                                                    <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                                hintText="Begin Date for data" mode="landscape"
                                                                container="inline" onChange={this.chooseBeginDate}/>
                                                </div>
                                                <div className="col s12 m6 l6">
                                                    <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                                hintText="End Date for data" mode="landscape"
                                                                container="inline" onChange={this.chooseEndDate}/>
                                                </div>
                                                <div className="col s12 m12 l12">
                                                    <StyledTextField ref="advertisementId" required
                                                                     onChange={this.handleChange.bind(this, "advertisementId")}
                                                                     placeholder="Fill in a advertisement Id for the graph..."
                                                                     label="AdvertisementId *"/>
                                                </div>
                                                <div className="col s12 m12 l12">
                                                    {Datakey}
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit"
                                                   className="btn waves-effect waves-light deep-orange darken-4 buttonstyle"
                                                   value="Add Graph"/>
                                            <Link to="/dashboard" type="button"
                                                  className="btn waves-effect waves-light deep-orange darken-4 buttonstyle">Terug</Link>
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
}