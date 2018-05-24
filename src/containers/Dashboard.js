import React, {Component} from 'react';
import swal from 'sweetalert2';
import Header from "../components/generalComponents/Header";
import GraphComponent from "../components/dashboardComponents/GraphComponent";
import * as GraphService from '../services/GraphService';
import * as ExtraService from '../services/ExtraService';
import './Dashboard.css';
import {Row} from "react-materialize";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphs: [],
            composedGraphs: [],
            extra: []
        }

    }

    componentDidMount() {
        this.getGraphs();
        this.getComposedGraphs();
        this.getExtras();
    }

    getGraphs() {
        let graphs = GraphService.getGraphs();
        this.setState({
            graphs: graphs
        });
    }

    getComposedGraphs() {
        let graphs = GraphService.getComposedGraphs();
        this.setState({
            composedGraphs: graphs
        });
    }

    getExtras() {
        let extra = ExtraService.getExtra();
        this.setState({
            extra: extra
        });
    }

    handleDelete = (id, e) => {
        let self = this;
        swal({
            title: 'Are you sure?',
            text: "You can't undo this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                GraphService.deleteGraph(id);
                swal(
                    'Delete!',
                    'Graph was deleted.',
                    'success'
                ).then(() => {
                    self.getGraphs();
                });

            } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Ended',
                    'Graph was not deleted.',
                    'error'
                )
            }
        })
    };

    handleComposedDelete = (id, e) => {
        swal({
            title: 'Are you sure?',
            text: "You can't undo this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                GraphService.deleteComposedGraph(id);
                swal(
                    'Delete!',
                    'Graph was deleted.',
                    'success'
                ).then(() => {
                    this.getComposedGraphs();
                });

            } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Ended',
                    'Graph was not deleted.',
                    'error'
                )
            }
        })
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Dashboard"/>
                <section className="containerCss">
                    {/*                    <div className="row">
                        {this.state.extra.map((obj, index) => {
                            return <div key={`extra-${index}`} className="card-panel bordered col s4">
                                <label>{obj.name}</label>
                                <p>{obj.value}</p>
                            </div>
                        })}
                    </div>*/}
                    <Row>
                        {this.state.composedGraphs.map((graph, index) => {
                            return <GraphComponent key={`composedGraph-${index}`} {...graph}
                                                   handleDelete={this.handleComposedDelete}/>
                        })}
                    </Row>
                    <Row>
                        {this.state.graphs.map((graph, index) => {
                            return <GraphComponent key={`graph-${index}`} {...graph}
                                                   handleDelete={this.handleDelete}/>
                        })}

                    </Row>
                </section>
            </div>
        )
            ;

    }
}