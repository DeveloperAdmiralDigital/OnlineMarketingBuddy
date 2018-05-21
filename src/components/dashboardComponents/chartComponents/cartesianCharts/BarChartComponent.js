import React, {Component} from 'react';
import {Bar, BarChart} from "recharts";

export default class BarChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: "stop warning me",
            chartConfig: {
                layout: "horizontal",
                width: 600,
                height: 300,
                margin: {top: 5, right: 30, left: 20, bottom: 5}
            },
            chartChildren: [],
            drawConfig: []
        };
    }

    componentDidMount() {
        this.setState({
            chartConfig: this.props.chartConfig,
            chartChildren: this.props.chartChildren
        });
        this.setDrawConfig();
    }

    setDrawConfig() {
        let drawConfig = this.state.drawConfig;
        if (this.props.drawProps) {
            let drawProps = this.props.drawProps;
            for (let i = 0; i < drawProps.length; i++) {
                let drawProp = drawProps[i];
                let config = {};
                config["dataKey"] = (drawProp.dataKey ? drawProp.dataKey : "value1");
                config["fill"] = (drawProp.stroke ? drawProp.stroke : "#960000");
                drawConfig[i] = config;
            }
        }
        this.setState({
            drawConfig: drawConfig
        });
    }

    render() {
        return (
            <BarChart {...this.state.chartConfig}>
                {this.state.chartChildren}
                {this.state.drawConfig.map((config, index) => {
                    return <Bar key={`bar-${index}`} {...config}>
                    </Bar>
                })}
            </BarChart>
        );

    }
}
