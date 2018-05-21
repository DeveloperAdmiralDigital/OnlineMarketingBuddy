let GRAPHS = [
    {
        graphId: 1,
        graphTitle: "LineChart 2 Linear",
        graphType: "line",
        syncId: 1,
        data: [
            {date: "2018-02-01", clicks: 2000, conversions: 1100},
            {date: "2018-02-02", clicks: 2100, conversions: 1000},
            {date: "2018-02-03", clicks: 1900, conversions: 700},
            {date: "2018-02-04", clicks: 2200, conversions: 1300},
            {date: "2018-02-05", clicks: 2000, conversions: 800},
            {date: "2018-02-06", clicks: 1800, conversions: 1000},
            {date: "2018-02-07", clicks: 2300, conversions: 1200},
            {date: "2018-02-08", clicks: 1700, conversions: 900},
            {date: "2018-02-09", clicks: 2000, conversions: 1100},
            {date: "2018-02-10", clicks: 2100, conversions: 1000}
        ],
        childrenProps: {
            yAxisProps: [{
                hide: false
            }],
            brushProps: {
                dataKey: "date",
                stroke: "#960000",
            }
        },
        drawProps: [
            {
                type: 'linear',
                dataKey: "clicks",
                dot: true,
                stroke: "#960000",

            },
            {
                type: 'linear',
                dataKey: "conversions",
                dot: true,
                stroke: "#f60000"
            }
        ]
    },
    {
        graphId: 2,
        graphTitle: "BarChart 2 values",
        graphType: "bar",
        syncId: 1,
        data: [
            {date: "2018-02-01", clicks: 2000, conversions: 1100},
            {date: "2018-02-02", clicks: 2100, conversions: 1000},
            {date: "2018-02-03", clicks: 1900, conversions: 700},
            {date: "2018-02-04", clicks: 2200, conversions: 1300},
            {date: "2018-02-05", clicks: 2000, conversions: 800},
            {date: "2018-02-06", clicks: 1800, conversions: 1000},
            {date: "2018-02-07", clicks: 2300, conversions: 1200},
            {date: "2018-02-08", clicks: 1700, conversions: 900},
            {date: "2018-02-09", clicks: 2000, conversions: 1100},
            {date: "2018-02-10", clicks: 2100, conversions: 1000}
        ],
        childrenProps: {
            yAxisProps: [{
                hide: false
            }],
            legendLayout: 'horizontal',
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            }
        },
        drawProps: [
            {
                dataKey: "clicks",
                stroke: "#960000"
            },
            {
                dataKey: "conversions",
                stroke: "#f60000"
            }
        ]
    },
    {
        graphId: 3,
        graphTitle: "AreaChart 2 step",
        graphType: "area",
        syncId: 1,
        data: [
            {date: "2018-02-01", clicks: 2000, conversions: 1100},
            {date: "2018-02-02", clicks: 2100, conversions: 1000},
            {date: "2018-02-03", clicks: 1900, conversions: 700},
            {date: "2018-02-04", clicks: 2200, conversions: 1300},
            {date: "2018-02-05", clicks: 2000, conversions: 800},
            {date: "2018-02-06", clicks: 1800, conversions: 1000},
            {date: "2018-02-07", clicks: 2300, conversions: 1200},
            {date: "2018-02-08", clicks: 1700, conversions: 900},
            {date: "2018-02-09", clicks: 2000, conversions: 1100},
            {date: "2018-02-10", clicks: 2100, conversions: 1000}
        ],
        childrenProps: {
            yAxisProps: [{
                hide: false
            }],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            }
        },
        drawProps: [
            {
                type: 'step',
                dataKey: "clicks",
                dot: true,
                stroke: "#960000",

            },
            {
                type: 'step',
                dataKey: "conversions",
                dot: true,
                stroke: "#f60000"
            }
        ]
    },
    {
        graphId: 4,
        graphTitle: "LineChart monotone",
        graphType: "line",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        childrenProps: {
            yAxisProps: [],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            }
        },
        drawProps: [{
            type: 'monotone',
            dataKey: "costPerClick",
            dot: true,
            stroke: "#960000",

        }]
    },
    {
        graphId: 5,
        graphTitle: "BarChart 1 value",
        graphType: "bar",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        childrenProps: {
            yAxisProps: [],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            },
        },
        drawProps: [{
            dataKey: "costPerClick",
            stroke: "#960000",

        }]
    },
    {
        graphId: 6,
        graphTitle: "AreaChart monotone",
        graphType: "area",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        childrenProps: {
            yAxisProps: [],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            }
        },
        drawProps: [{
            type: 'monotone',
            dataKey: "costPerClick",
            dot: true,
            stroke: "#960000",

        }]
    },
    {
        graphId: 7,
        graphTitle: "PieChart",
        graphType: "pie",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        drawProps: [{
            innerRadius: 0,
            outerRadius: "100%",
            dataKey: "costPerClick",
            nameKey: "date",
            fill: "#960000",
            stroke: "#900000"
        }]
    },
    {
        graphId: 8,
        graphTitle: "RadarChart",
        graphType: "radar",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        drawProps: [{
            innerRadius: 0,
            outerRadius: "100%",
            dataKey: "costPerClick",
            nameKey: "date",
            fill: "#960000",
            stroke: "#900000"
        }]
    },
    {
        graphId: 9,
        graphTitle: "RadialBar",
        graphType: "radialBar",
        syncId: 2,
        data: [
            {date: "2018-02-11", costPerClick: 858},
            {date: "2018-02-12", costPerClick: 765},
            {date: "2018-02-13", costPerClick: 476},
            {date: "2018-02-14", costPerClick: 397},
            {date: "2018-02-15", costPerClick: 623},
            {date: "2018-02-16", costPerClick: 584},
            {date: "2018-02-17", costPerClick: 1111},
            {date: "2018-02-18", costPerClick: 942},
            {date: "2018-02-19", costPerClick: 239}
        ],
        drawProps: [{
            innerRadius: 0,
            outerRadius: "100%",
            dataKey: "costPerClick",
            nameKey: "date",
            fill: "#960000",
            stroke: "#900000"
        }]
    },
    {
        graphId: 10,
        graphTitle: "Scatter",
        graphType: "scatter",
        syncId: 1,
        data: [
            {date: "2018-02-01", clicks: 2000, conversions: 1100},
            {date: "2018-02-02", clicks: 2100, conversions: 1000},
            {date: "2018-02-03", clicks: 1900, conversions: 700},
            {date: "2018-02-04", clicks: 2200, conversions: 1300},
            {date: "2018-02-05", clicks: 2000, conversions: 800},
            {date: "2018-02-06", clicks: 1800, conversions: 1000},
            {date: "2018-02-07", clicks: 2300, conversions: 1200},
            {date: "2018-02-08", clicks: 1700, conversions: 900},
            {date: "2018-02-09", clicks: 2000, conversions: 1100},
            {date: "2018-02-10", clicks: 2100, conversions: 1000}
        ],
        childrenProps: {
            yAxisProps: [{
                hide: false
            }],
            brushProps: {
                dataKey: "date",
                stroke: "#960000",
            }
        },
        drawProps: [
            {
                type: 'linear',
                dataKey: "clicks",
                dot: true,
                stroke: "#960000",

            },
            {
                type: 'linear',
                dataKey: "conversions",
                dot: true,
                stroke: "#f60000"
            }
        ]
    }
];

let COMPOSED = [
    {
        graphId: 1,
        graphTitle: "composed Linear and Bar 1",
        graphType: "composed",
        syncId: 1,
        data: [
            {date: "2018-02-01", clicks: 2000, conversions: 1100},
            {date: "2018-02-02", clicks: 2100, conversions: 1000},
            {date: "2018-02-03", clicks: 1900, conversions: 700},
            {date: "2018-02-04", clicks: 2200, conversions: 1300},
            {date: "2018-02-05", clicks: 2000, conversions: 800},
            {date: "2018-02-06", clicks: 1800, conversions: 1000},
            {date: "2018-02-07", clicks: 2300, conversions: 1200},
            {date: "2018-02-08", clicks: 1700, conversions: 900},
            {date: "2018-02-09", clicks: 2000, conversions: 1100},
            {date: "2018-02-10", clicks: 2100, conversions: 1000}
        ],
        childrenProps: {
            yAxisProps: [
                {
                    yAxisId: "line",
                    dataKey: "clicks",
                    hide: false,
                    orientation: "Left",
                },
                {
                    yAxisId: "bar",
                    dataKey: "conversions",
                    hide: false,
                    orientation: "Right",
                }
            ],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            },
        },
        drawProps: [
            {
                graph: "line",
                type: 'linear',
                dataKey: "clicks",
                dot: true,
                stroke: "#000000",

            },
            {
                graph: "bar",
                dataKey: "conversions",
                stroke: "#960000"
            }
        ]
    },
    {
        graphId: 2,
        graphTitle: "composed Linear and Bar 2",
        graphType: "composed",
        syncId: 3,
        data: [
            {date: "2018-02-01", clicks: 3000, conversions: 110},
            {date: "2018-02-02", clicks: 3100, conversions: 100},
            {date: "2018-02-03", clicks: 2900, conversions: 70},
            {date: "2018-02-04", clicks: 3200, conversions: 130},
            {date: "2018-02-05", clicks: 3000, conversions: 80},
            {date: "2018-02-06", clicks: 2800, conversions: 100},
            {date: "2018-02-07", clicks: 3300, conversions: 120},
            {date: "2018-02-08", clicks: 2700, conversions: 90},
            {date: "2018-02-09", clicks: 3000, conversions: 110},
            {date: "2018-02-10", clicks: 3100, conversions: 100}
        ],
        childrenProps: {
            yAxisProps: [
                {
                    yAxisId: "line",
                    dataKey: "conversions",
                    hide: false,
                    orientation: "Left",
                },
                {
                    yAxisId: "bar",
                    dataKey: "clicks",
                    hide: false,
                    orientation: "Right",
                }
            ],
            brushProps: {
                dataKey: "date",
                stroke: "#960000"
            },
        },
        drawProps: [
            {
                graph: "line",
                type: 'linear',
                dataKey: "conversions",
                dot: true,
                stroke: "#000000",

            },
            {
                graph: "bar",
                dataKey: "clicks",
                stroke: "#ff0000"
            }
        ]
    }
    ];

export function postGraph(data) {
    console.log("postgraph");
    console.log(data);

    let input = data;
    if("composed" === input.graphType){
        input["graphId"] = COMPOSED.length+1;
        input["syncId"] = COMPOSED.length + GRAPHS.length+1;
        console.log("if composed");
        console.log(input);
        COMPOSED.push(input);
    } else {
        input["graphId"] = GRAPHS.length+1;
        input["syncId"] = COMPOSED.length + GRAPHS.length+1;
        console.log("if not composed");
        console.log(input);
        GRAPHS.push(input);
    }
    console.log("composed: ", COMPOSED);
    console.log("GRAPH: ", GRAPHS );
}

export function getGraphs() {
    return GRAPHS;
}

export function getGraph(id) {
    return GRAPHS.find((graph) => {
        graph.graphId = id
    });
}

export function deleteGraph(id) {
    let newGraphs = [];
    GRAPHS.forEach((graph) => {
        if (graph.graphId !== id) {
            newGraphs.push(graph);
        }
    });
    GRAPHS = newGraphs;
}

export function getComposedGraphs() {
    return COMPOSED;
}

export function deleteComposedGraph(id) {
    let newGraphs = [];
    COMPOSED.forEach((graph) => {
        if (graph.graphId !== id) {
            newGraphs.push(graph);
        }
    });
    COMPOSED = newGraphs;
}