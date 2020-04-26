import React, { Component } from 'react';
export default class PrintButton extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isPrinting) {
            window.print();
            this.props.onClick(false);
            window.onafterprint = () => {
                this.props.onClick(false);
            };
        }
    }
    printTheTable = () => {
        this.props.onClick(true);
    }
    render() {
        const text = this.props.isPrinting ? 'Printing' : 'Print';
        return (
            <div className="text-center" >
                <button className="btn btn-primary" onClick={this.printTheTable}>
                    <span className="display-5">{text}</span>
                </button>
            </div >
        );
    }
}