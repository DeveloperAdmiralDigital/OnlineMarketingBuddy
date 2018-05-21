import React, {Component} from 'react';
import {Icon} from "react-materialize";
import GraphChart from "./GraphChart";
import './GraphComponent.css'

const CHART_HEIGHT = 200;
const CHART_WIDTH = 400;
const CHART_LAYOUT = 'horizontal';
const CHART_MARGIN = {top: 5, right: 10, left: 10, bottom: 10};

const COMPOSED_HEIGHT = 250;
const COMPOSED_WIDTH = 600;


export default class graphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartConfig: {
                layout: CHART_LAYOUT,
                width: CHART_WIDTH,
                height: CHART_HEIGHT,
                margin: CHART_MARGIN
            },
            divName: "card-panel bordered centered col s12 m5 l4 col-lg-4 col-md-5 col-sm-11",
        };
    }

    componentDidMount() {
        this.setChartConfig();
        if ('composed' === this.props.graphType) {
            let chartConfig = this.state.chartConfig;
            chartConfig.width = COMPOSED_WIDTH;
            chartConfig.height = COMPOSED_HEIGHT;

            this.setState({
                chartConfig: chartConfig,
                divName: "card-panel bordered centered col s12 m8 l6"
            })
        }
    }

    setChartConfig() {
        let chartConfig = this.state.chartConfig;

        chartConfig["width"] = (this.props.width ? this.props.width : CHART_WIDTH);
        chartConfig["height"] = (this.props.height ? this.props.height : CHART_HEIGHT);
        chartConfig["margin"] = (this.props.margin ? this.props.margin : CHART_MARGIN);
        chartConfig["layout"] = (this.props.layout ? this.props.layout : CHART_LAYOUT);
        chartConfig["data"] = this.props.data;

        if (this.props.syncId) {
            chartConfig["syncId"] = this.props.syncId
        }
        if (this.props.onClick) {
            chartConfig["onClick"] = this.props.onClick
        }
        if (this.props.onMouseEnter) {
            chartConfig["onMouseEnter"] = this.props.onMouseEnter
        }
        if (this.props.onMouseMove) {
            chartConfig["onMouseMove"] = this.props.onMouseMove
        }
        if (this.props.onMouseLeave) {
            chartConfig["onMouseLeave"] = this.props.onMouseLeave
        }

        this.setState({
            chartConfig: chartConfig
        });
    }

    clickEdit() {
        alert("Edit clicked");
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.graphId);
    }


    render() {
        return (
            <div className={this.state.divName}>
                <i className="material-icons" onClick={this.clickEdit} style={{cursor: "pointer"}} >create</i>
                <i className="material-icons" onClick={this.handleDelete} style={{cursor: "pointer"}} >clear</i>
                <h3>{this.props.graphTitle}</h3>

                <GraphChart chartConfig={this.state.chartConfig} {...this.props}/>

            </div>
        );
    }
}