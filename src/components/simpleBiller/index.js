import React, { Component } from 'react'
import BillContainer from '../bill'
import PrintButton from './printButton'
import GrandTotalSticky from './grandTotalSticky'
import './index.css'
import './print.css'
import HeaderInputs from './headerInputs'
import DataInputs from './dataInputs'
import RowSet, { DataGroup } from '../../modules/table/printableRows'
import AddRowButton from '../button/addRowButton'
import DeleteRowButton from '../button/deleteRowButton'

export default class SimpleBiller extends Component {
    constructor(props) {
        super(props)
        const rowSet = new RowSet();
        this.state = {
            rowSet: rowSet,
            billInfo: {},
            itemValues: rowSet.getCurrentRow(),
            isPrinting: false
        }
        this.handlePrintingBottom = this.handlePrintingBottom.bind(this);
        this.handlePrintingTop = this.handlePrintingTop.bind(this);
    }

    handleTableModifyEvent() {
        this.setState({
            itemValues: this.state.rowSet.getCurrentRow()
        })
    }
    handleRowChangeEvent(event) {
        this.setState(this.state.rowSet)
    }
    handleBillInfoChangedEvent(event) {
        const billInfo = {
            ...this.state.billInfo,
            [event.target.id]: `${event.target.value}`
        }
        this.setState({
            billInfo: billInfo
        })
    }
    handleRowOnClickEvent() {
        this.setState({
            itemValues: this.state.rowSet.getCurrentRow()
        })
    }
    handlePrintingTop(isPrinting) {
        this.setState({
            isPrintingTop: isPrinting
        })
    }
    handlePrintingBottom(isPrinting) {
        this.setState({
            isPrintingBottom: isPrinting
        })
    }
    render() {
        return (
            <div>
                <div className="container col-sm-10 mt-2">
                    <div className="card non-printable form-bg">
                        <div className="card-header">
                            <div className="offset-sm-10">
                                <PrintButton onClick={this.handlePrintingTop} isPrinting={this.state.isPrintingTop}
                                ref={ele => this.printButtonRef = ele} />
                            </div>

                        </div>
                        <div className="col-sm-12 card-title border-bottom">
                            <HeaderInputs onChange={this.handleBillInfoChangedEvent.bind(this)} />
                        </div>
                        <div className="col-sm-12 card-body">
                            <div className="row border-bottom">
                                <div className="col-sm-10">
                                    <DataInputs rowSet={this.state.rowSet} itemValues={this.state.itemValues}
                                        onChange={this.handleRowChangeEvent.bind(this)}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <GrandTotalSticky grandTotal={this.state.rowSet.grandTotal} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <AddRowButton rowSet={this.state.rowSet}
                                        modifyTableEventListener={this.handleTableModifyEvent.bind(this)} />
                                </div>
                                <div className="col-sm-4">
                                    <DeleteRowButton rowSet={this.state.rowSet}
                                        modifyTableEventListener={this.handleTableModifyEvent.bind(this)} />
                                </div>
                                <div className="offset-sm-3">
                                    <PrintButton onClick={this.handlePrintingBottom} isPrinting={this.state.isPrintingBottom} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bill-container">
                        <BillContainer
                            billInfo={this.state.billInfo}
                            grandTotal={this.state.rowSet.grandTotal}
                            isPrinting={this.state.isPrintingTop || this.state.isPrintingBottom}>
                            <DataGroup id='PrintTable_DataGroup'
                                rowSet={this.state.rowSet}
                                onClick={this.handleRowOnClickEvent.bind(this)} />
                        </BillContainer>
                    </div>

                </div>
            </div>
        )
    };
}