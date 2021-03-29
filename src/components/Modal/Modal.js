import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ModalDialog from './ModalDialog';
import {withRouter} from 'react-router-dom';
import './Modal.css';

function Modal(props) {
    const [open, setOpen] = React.useState(false);
    const [alertDialog, setAlertDialog] = React.useState('');

    let buttonDialog, dialogTitle, onModalOpen;
    let exitModalOptions = [];
    //Nested switch statements for previews and exits?
    switch ( props.type ){
        case ('create-exit'):
            buttonDialog = "Exit"
            dialogTitle = "Exit"
            onModalOpen = () => setAlertDialog("Are you sure you wish to exit?")
            exitModalOptions = [
                {dialog: "Cancel"}, 
                {dialog: "Save and Exit", onButtonClick:() => { props.saveAndExit(); props.history.goBack()}}, 
                {dialog: "Exit", onButtonClick: () => props.history.goBack()}]
            break;
        case ('create-preview'):
            buttonDialog = "Preview"
            dialogTitle = "Preview"
            onModalOpen = () => setAlertDialog(props.getEditorPreview())
            exitModalOptions = [
                {dialog: "Exit", onButtonClick: null}]
            break;
        case ('fill-exit'):
            buttonDialog = "Exit"
            dialogTitle = "Exit"
            onModalOpen = () => setAlertDialog("Are you sure you wish to exit?")
            exitModalOptions = [
                {dialog: "Cancel"}, 
                {dialog: "Exit", onButtonClick: () => props.history.goBack()}]
            break;
        default:
            buttonDialog = "Exit"
            dialogTitle = "Exit"
            onModalOpen = () => setAlertDialog("Are you sure you wish to exit?")
            exitModalOptions = [
                {dialog: "Save and Exit", onButtonClick: () => props.saveAndExit()}, 
                {dialog: "Exit", onButtonClick: () => props.history.goBack()}]
    }

    const handleClickOpen = async (event) => {
        onModalOpen()
        setOpen(true);
    };

    const handleClose = (event) => {
        if(typeof (event) === 'function') event()
        setOpen(false)
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen(onModalOpen)}>
                { buttonDialog }
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {/* This stops the dialog from rendering everytime an onChange is called in Create.js */}
                <ModalDialog 
                    dialogTitle = {dialogTitle}
                    alertDialog = {alertDialog}/>
                <DialogActions>
                    {exitModalOptions.map((item, index) => (
                        <Button onClick={ () => { handleClose( item.onButtonClick ) } } variant="outlined" color="primary" key={index}>
                            { item.dialog }
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withRouter(Modal);
