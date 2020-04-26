import React from 'react';
import Row from '../../modules/table/printableRow';
import Button from './button';

const AddRowButton = ({ rowSet, modifyTableEventListener }) => {
    const addNewItem = (callBack) => {
        const newPrintRow = new Row(rowSet.size());
        rowSet.push(newPrintRow);
        rowSet.setCurrentRow(newPrintRow.sno);
        callBack();
    };
    return (
        <Button iconClass="fa fa-plus" className="btn btn-primary"
            actionListner={() => addNewItem(modifyTableEventListener)}>
            Add New Item
        </Button>
    );
}
export default AddRowButton