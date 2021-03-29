import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

function ClauseVars({
    varItem,
    deleteVar,
    updateVar,
    updateVarDesc
}) {
    return (
        <div className = "inputs" key = {varItem.id}> 
            <div className="create-var-holder">
                <label>Variable :</label>
                <input 
                    className="create-input var-input"
                    value = {varItem.value}
                    onChange = {event => updateVar(varItem.id, event)}/>
            </div>
            <div className="create-var-desc-holder">
                <label>Description: </label>
                <input 
                    className="create-input var-desc-input"
                    value = {varItem.value}
                    onChange = {event => updateVarDesc(varItem.id, event)}/>
                <IconButton onClick={deleteVar}>
                    <DeleteOutlineIcon data-var={varItem.id} style={{color:'#9ea7da'}}/>
                </IconButton>
            </div>
        </div>
    )
}

export default ClauseVars
