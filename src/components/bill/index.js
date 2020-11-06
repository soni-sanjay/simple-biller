import React, { Component } from 'react';
import './index.css';
import BillInfo from './billInfo';
import BillDetails from './billDetails';
import BillFooter from './billFooter';
import Proprieter from '../../resources/proprieter.json'

const flipperValues = { CUSTOMER_ONLY: 'Print Seller Copy', WITH_SELLER: 'Print Only Customer Copy' }
class BillContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            flipperValue: flipperValues.CUSTOMER_ONLY
        }
        this.flipCopyButton=this.flipCopyButton.bind(this)
        this.printSellerCopy=this.printSellerCopy.bind(this)
    }
   
    flipCopyButton() {
        const flipperValue = this.state.flipperValue == flipperValues.CUSTOMER_ONLY ? flipperValues.WITH_SELLER : flipperValues.CUSTOMER_ONLY;
        this.setState(
           { flipperValue: flipperValue}
        )
    }
    printSellerCopy(){
        return this.state.flipperValue == flipperValues.WITH_SELLER
    }
    render() {
        const { billInfo, grandTotal, children } = this.props;
        const copy = (
            <div>
                <div className="text-center" >
                    <button className="btn btn-primary" onClick={this.flipCopyButton} hidden={this.props.isPrinting}>
                        <span className="display-5">{this.state.flipperValue}</span>
                    </button>
                </div >
                {this.props.isPrinting && this.printSellerCopy() ? this.getPrintVersion(billInfo, grandTotal, children)
                    : this.getSingle(billInfo, grandTotal, children)}
            </div>
        )
        return copy
    }
    getSingle = (billInfo, grandTotal, children) => {
        return (
            <div className='col-sm-12'>
                <Printable billInfo={billInfo} grandTotal={grandTotal}>
                    {children}
                </Printable>
            </div>
        )
    }

    getPrintVersion = (billInfo, grandTotal, children) => {
        return <div>
            <div className='col-sm-6'>
                <div className='row'>Seller Copy</div>
                <Printable billInfo={billInfo} grandTotal={grandTotal}>
                    {children}
                </Printable>
            </div>
            <div className='col-sm-6'>
                <div className='row'>Customer Copy</div>
                <Printable billInfo={billInfo} grandTotal={grandTotal}>
                    {children}
                </Printable>
            </div>
        </div>
    }
}

const Printable = React.forwardRef(
    function printable({ billInfo, children, grandTotal }, ref) {
        return (
            <div className="row printable bill-info pl-1 pr-1" id="billInfo" ref={ref}>
                <div className='table' id="billInfoTable">
                    <div className="resp-table-title">
                        <div className="table-header-cell">{Proprieter.Establishment}</div>
                    </div>
                    <BillInfo billInfo={billInfo} />
                    <BillDetails dataGroup={children} grandTotal={grandTotal} />
                    <BillFooter />
                </div>
            </div>
        )
    });
export default BillContainer