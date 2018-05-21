import React, {Component} from 'react';
import {Line, ComposedChart, Bar} from 'recharts';

export default class ComposedChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartConfig: {},
            chartChildren: [],
            barCharts: [],
            lineCharts: []
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
        let lineCharts = [], barCharts = [];
        if (this.props.drawProps) {
            let drawProps = this.props.drawProps;
            for (let i = 0; i < drawProps.length; i++) {
                let drawProp = drawProps[i];
                let config = {};
                config["dataKey"] = (drawProp.dataKey ? drawProp.dataKey : "value1");
                config["stroke"] = (drawProp.stroke ? drawProp.stroke : "#960000");

                if ("line" === drawProp.graph) {
                    config["type"] = (drawProp.type ? drawProp.type : "linear");
                    config["dot"] = (drawProp.dot ? drawProp.dot : false);
                    lineCharts.push(<Line yAxisId="line" {...config} key={`line-${lineCharts.length}`} />);
                } else {
                    config["fill"] = (drawProp.stroke ? drawProp.stroke : "#960000");
                    barCharts.push(<Bar yAxisId="bar" {...config} key={`bar-${barCharts.length}`}/>);
                }
            }
        }
        this.setState({
            lineCharts: lineCharts,
            barCharts: barCharts
        });
    }

    render() {
        return (
            <ComposedChart {...this.state.chartConfig}>
                {this.state.chartChildren}
                {this.state.barCharts}
                {this.state.lineCharts}
            </ComposedChart>
        );

    }
}