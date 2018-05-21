import React, {Component} from 'react';

import AreaChartComponent from "./chartComponents/cartesianCharts/AreaChartComponent";
import ComposedChartComponent from "./chartComponents/cartesianCharts/ComposedChartComponent";
import LineChartComponent from "./chartComponents/cartesianCharts/LineChartComponent";
import PieChartComponent from "./chartComponents/polarCharts/PieChartComponent";
import RadarChartComponent from "./chartComponents/polarCharts/RadarChartComponent";
import RadialBarChartComponent from "./chartComponents/polarCharts/RadialBarChartComponent";
import ScatterChartComponent from "./chartComponents/specialCharts/ScatterChartComponent";

import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer, ZAxis} from "recharts";
import BarChartComponent from "./chartComponents/cartesianCharts/BarChartComponent";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, Brush
} from 'recharts';

const STANDARD_COLOUR = "#960000";
const BRUSH_HEIGHT = 20;
const CARTESIAN_CHARTS = ["line", "bar", "area", "composed"];
const SPECIAL_CHARTS = ["scatter"];
const DATAKEY = "date";

export default class graphChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartChildren: [
                <Tooltip key={0}/>,
                <Legend key={1}/>,
            ],
            radarChildren:[<PolarGrid key={0}/>, <PolarRadiusAxis key={1} />, <PolarAngleAxis key={2} dataKey={DATAKEY} /> ]
        };
    }

    componentDidMount() {
        this.setChartChildren();
    }

    setChartChildren() {
        let chartChildren = [];
        if (CARTESIAN_CHARTS.includes(this.props.graphType.toLowerCase())) {
            chartChildren = this.cartesianChildren();
        } else if (SPECIAL_CHARTS.includes(this.props.graphType.toLowerCase())) {
            chartChildren = this.specialChildren();
        }
        this.setState({
            chartChildren: chartChildren
        });
    }

    renderSwitch(type) {
        switch (type) {
            case "line":
                return <LineChartComponent chartChildren={this.state.chartChildren} {...this.props}/>;
            case "bar":
                return <BarChartComponent chartChildren={this.state.chartChildren} {...this.props}/>;
            case "area":
                return <AreaChartComponent chartChildren={this.state.chartChildren} {...this.props}/>;
            case "composed":
                return <ComposedChartComponent chartChildren={this.state.chartChildren} {...this.props}/>;

            case "pie":
                return <PieChartComponent  {...this.props}/>;
            case "radar":
                return <RadarChartComponent chartChildren={this.state.radarChildren} {...this.props}/>;
            case "radialBar":
                return <RadialBarChartComponent  {...this.props}/>;

            case "scatter":
                return <ScatterChartComponent chartChildren={this.state.chartChildren} {...this.props}/>;

            default:
                return <p>Graph type not recognised, try a different type.</p>

        }

    }

    render() {

        return (
            <div className="graphChart">
                <ResponsiveContainer width="80%" height="100%">
                    {this.renderSwitch(this.props.graphType)}
                </ResponsiveContainer>
            </div>
        );
    }

    cartesianChildren() {
        let chartChildren = this.state.chartChildren;
        chartChildren.push(<CartesianGrid key={chartChildren.length}/>);
        chartChildren.push(<XAxis key={chartChildren.length} type={"category"} dataKey={DATAKEY} hide={false}/>);
        let yAxisConfig = {};

        if (this.props.childrenProps) {
            let childrenProps = this.props.childrenProps;

            if (childrenProps.yAxisProps) {
                let yAxisProps = childrenProps.yAxisProps;
                yAxisProps.forEach((yAxis) => {
                    if (yAxis.dataKey) {
                        yAxisConfig["dataKey"] = yAxis.dataKey;
                        if (yAxis.yAxisId) {
                            yAxisConfig["yAxisId"] = yAxis.yAxisId;
                            if (yAxis.orientation) {
                                yAxisConfig["label"] = {
                                    value: yAxis.dataKey,
                                    angle: -90,
                                    position: `inside${yAxis.orientation}`
                                };
                            } else {
                                yAxisConfig["label"] = {value: yAxis.dataKey, angle: -90, position: `insideLeft`};
                            }
                        }
                    }
                    yAxisConfig["hide"] = (yAxis.hide ? yAxis.hide : false);
                    yAxisConfig["orientation"] = (yAxis.orientation ? yAxis.orientation.toLowerCase() : "left");

                    chartChildren.push(<YAxis key={chartChildren.length} {...yAxisConfig}/>);
                });
            }

            if (childrenProps.brushProps) {
                let brushConfig = {};
                let brushProps = childrenProps.brushProps;
                brushConfig["dataKey"] = (brushProps.dataKey ? brushProps.dataKey : DATAKEY);
                brushConfig["stroke"] = (brushProps.stroke ? brushProps.stroke : STANDARD_COLOUR);
                brushConfig["height"] = (brushProps.height ? brushProps.height : BRUSH_HEIGHT);
                if (brushProps.width) {
                    brushConfig["width"] = brushProps.width
                }
                chartChildren.push(<Brush key={chartChildren.length} {...brushConfig}/>);
            }
        }
        return chartChildren;
    }

    specialChildren() {
        let chartChildren = this.state.chartChildren;
        chartChildren.push(<CartesianGrid key={chartChildren.length}/>);
        chartChildren.push(<XAxis key={chartChildren.length}/>);
        let yAxisConfig = {type: "number", dataKey: "value1", hide: false, name: "y"},
            xAxisConfig = {type: "category", dataKey: "date", hide: false, name: "x"};
        let zAxisConfig = {};

        if (this.props.childrenProps) {
            let childrenProps = this.props.childrenProps;

            if (childrenProps.xAxisProps) {
                let xAxisProps = childrenProps.xAxisProps;
                xAxisConfig.dataKey = (xAxisProps.dataKey ? xAxisProps.dataKey : "date");
                xAxisConfig.type = (xAxisProps.type ? xAxisProps.dataKey : "category");
                xAxisConfig.hide = (xAxisProps.hide ? xAxisProps.hide : false);
                xAxisConfig.name = (xAxisProps.name ? xAxisProps.name : "X");
            }
            chartChildren.push(<XAxis key={chartChildren.length} {...xAxisConfig}/>);

            if (childrenProps.yAxisProps) {
                let yAxisProps = childrenProps.yAxisProps;
                yAxisConfig.dataKey = (yAxisProps.dataKey ? yAxisProps.dataKey : "value1");
                yAxisConfig.type = (yAxisProps.type ? yAxisProps.dataKey : "number");
                yAxisConfig.hide = (yAxisProps.hide ? yAxisProps.hide : false);
                yAxisConfig.name = (yAxisProps.name ? yAxisProps.name : "Y");
            }
            chartChildren.push(<YAxis key={chartChildren.length} {...yAxisConfig}/>);


            if (childrenProps.zAxisProps) {
                let zAxisProps = childrenProps.zAxisProps;
                zAxisConfig.dataKey = (zAxisProps.dataKey ? zAxisProps.dataKey : "value2");
                zAxisConfig.type = (zAxisProps.type ? zAxisProps.dataKey : "number");
                zAxisConfig.hide = (zAxisProps.hide ? zAxisProps.hide : false);
                zAxisConfig.name = (zAxisProps.name ? zAxisProps.name : "Z");
                chartChildren.push(<ZAxis key={chartChildren.length} {...zAxisConfig}/>);
            }

            if (childrenProps.brushProps) {
                let brushConfig = {};
                let brushProps = childrenProps.brushProps;
                brushConfig["dataKey"] = (brushProps.dataKey ? brushProps.dataKey : "date");
                brushConfig["stroke"] = (brushProps.stroke ? brushProps.stroke : STANDARD_COLOUR);
                brushConfig["height"] = (brushProps.height ? brushProps.height : BRUSH_HEIGHT);
                if (brushProps.width) {
                    brushConfig["width"] = brushProps.width
                }
                chartChildren.push(<Brush key={chartChildren.length} {...brushConfig}/>);
            }
        }
        return chartChildren;
    }
}