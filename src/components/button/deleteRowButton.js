import React from 'react';
import Button from './button';

const DeleteRowButton = ({ rowSet, modifyTableEventListener }) => {
    const deleteLastItem = (callBack) => {
        const rowIndex = rowSet.size() - 1;
        if (rowIndex > 0) {
            rowSet.deleteLastRow();
            rowSet.setCurrentRow(rowIndex);
            callBack();
        }
        else {
            alert("At least one row is required.");
        }
    };
    return (
        <Button iconClass="fa fa-minus" className="btn btn-danger"
            actionListner={() => deleteLastItem(modifyTableEventListener)}>
            Delete Last Item
        </Button>
    );
}

export default DeleteRowButton