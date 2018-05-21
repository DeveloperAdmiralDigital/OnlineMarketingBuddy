import React, {Component} from 'react';
import {Radar, RadarChart} from 'recharts';

const OPACITY=0.6;


export default class RadarChartComponent extends Component {
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
                config["innerRadius"]=(drawProp.innerRadius ? drawProp.innerRadius : 0);
                config["outerRadius"]=(drawProp.outerRadius ? drawProp.outerRadius : "100%");
                config["dataKey"] =(drawProp.dataKey ?  drawProp.dataKey : "value1");
                config["stroke"] =(drawProp.stroke ?  drawProp.stroke : "#960000");
                config["fill"] =(drawProp.fill ?  drawProp.fill : "#900000");
                config["nameKey"] = (drawProp.nameKey ? drawProp.nameKey : "name");
                config["data"] = (this.props.data ? this.props.data : [{name:"75%", value1:75},{name:"rest", value1:25}]);
                drawConfig[i] = config;
            }
        }
        this.setState({
            drawConfig: drawConfig
        });
    }

    render() {
        return (
            <RadarChart width={this.props.chartConfig.width} height={this.props.chartConfig.height}>
                {this.state.chartChildren}
                {this.state.drawConfig.map((config, index) => {
                    return <Radar key={`radar-${index}`} {...config} fillOpacity={OPACITY}/>
                })}
            </RadarChart>
        );

    }
}