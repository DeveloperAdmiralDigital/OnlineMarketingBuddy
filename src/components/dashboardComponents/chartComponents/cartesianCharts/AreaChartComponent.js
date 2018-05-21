import React, {Component} from 'react';
import {AreaChart, Area} from 'recharts';

const FILL_OPACITY = 0.5;

export default class AreaChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartConfig: {},
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
                config["type"] = (drawProp.type ? drawProp.type : "linear");
                config["dataKey"] = (drawProp.dataKey ? drawProp.dataKey : "value1");
                config["dot"] = (drawProp.dot ? drawProp.dot : true);
                config["stroke"] = (drawProp.stroke ? drawProp.stroke : "#960000");
                drawConfig[i] = config;
            }
        }
        this.setState({
            drawConfig: drawConfig
        });
    }

    render() {
        return (
            <AreaChart {...this.state.chartConfig}>
                {this.state.chartChildren}
                {this.state.drawConfig.map((config, index) => {
                    return <Area key={`area-${index}`} {...config} fillOpacity={FILL_OPACITY} fill={config.stroke}/>
                })}
            </AreaChart>
        );

    }
}