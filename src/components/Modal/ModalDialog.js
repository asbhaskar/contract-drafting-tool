import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Modal.css';

function ModalDialog(props) {
    return (
        <div className="modal-dialog">
            <DialogTitle id="alert-dialog-title">{ props.dialogTitle }</DialogTitle>
            <DialogContent className="dialog-content">
                { props.alertDialog }
            </DialogContent>
        </div>
    )
}

export default ModalDialog
