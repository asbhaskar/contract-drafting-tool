import React from 'react';
import Button from '@material-ui/core/Button';

function FillClause({
    index, 
    clause, 
    varObj, 
    varDescObj, 
    handleFillVarInEditor
}) {
    return (
        <div className="fill-clause-holder">
            <h4>Clause {parseInt(clause) + 1}:</h4>
            <div className="variable-fill">
                {Object
                    .keys(varObj)
                    .map((variable, varIndex) => (
                        (varObj[varIndex].clauseId === index) && 
                        <div key={varIndex} className="var-fill-grid">
                            <span className="var-left-side">{varDescObj[varIndex].value}:</span>
                            <span className="var-right-side">
                                <input placeholder={varObj[varIndex].value} id={varIndex}/>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    data-index={varIndex}
                                    var-value={varObj[varIndex].value}
                                    onClick={() => handleFillVarInEditor(varIndex, varObj[varIndex].value)}>Fill</Button>
                            </span>
                        </div>))}
            </div>
        </div>
    )
}

export default FillClause
