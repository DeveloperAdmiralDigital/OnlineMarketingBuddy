import React, {Component} from 'react';
import {Pie, PieChart} from 'recharts';

export default class PieChartComponent extends Component {
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
                config["nameKey"] = (drawProp.nameKey ? drawProp.nameKey : "name");
                if(drawProp.stroke || drawProp.fill){
                    config["fill"] = (drawProp.fill ? drawProp.fill : drawProp.stroke);
                }
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
            <PieChart width={this.props.chartConfig.width} height={this.props.chartConfig.height}>
                {this.state.drawConfig.map((config, index) => {
                    return <Pie key={`pie-${index}`} {...config} label/>
                })}
            </PieChart>
        );

    }
}