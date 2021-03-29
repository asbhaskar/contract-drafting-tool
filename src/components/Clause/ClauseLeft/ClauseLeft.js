import React from 'react';
import ClauseVars from './ClauseVars/ClauseVars';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

function ClauseLeft({
    clauseId, 
    clauseArrayLength, 
    varArray,
    addClause,
    addVar,
    deleteClause,
    deleteVar,
    updateVar,
    updateVarDesc
}) {
    const varHelpText = 'To indicate placement of the variable, type {{var_name}} in the editor, e.x. "bu' +
    'yer name" would be {{buyer_name}}'
    return (
        <div>
            <h4>Clause:
                <Tooltip
                    title={< p className = "clause-tooltip" > {varHelpText} </p>}
                    placement="right"
                    arrow>
                    <HelpOutlineIcon/>
                </Tooltip>
                <IconButton onClick={deleteClause}>
                    <DeleteOutlineIcon
                        data-clause={clauseId}
                        style={{ color: '#9ea7da' }}/>
                </IconButton>
            </h4>
            <div className="var-holder">
                {varArray.map(varItem => (
                    varItem.clauseId === clauseId 
                        ?   <ClauseVars 
                                key={varItem.id}
                                clauseId={clauseId} 
                                varItem={varItem}
                                addVar={addVar}
                                deleteVar={deleteVar}
                                updateVar={updateVar}
                                updateVarDesc={updateVarDesc}/>
                        :   <span key={varItem.id}/>))}
            </div>
            <div className="add-var add-button">
                <Button
                    data-clause={clauseId}
                    onClick={addVar}
                    variant="outlined"
                    color="primary">Add Variable +</Button>
            </div>
            {clauseId >= (clauseArrayLength - 1)
                ?   <div className="add-clause add-button">
                        <Button onClick={addClause} variant="outlined" color="primary">Add Clause +</Button>
                    </div>
                :   ''
            }
        </div>
    )
}

export default ClauseLeft
