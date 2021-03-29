import React from 'react';
import ClauseLeft from './ClauseLeft/ClauseLeft';
import TextEditor from '../../components/Editor/Editor';

function Clause({
    clauseId,
    clauseArrayLength,
    varArray,
    updateEditor,
	initialEditorState,
    addClause,
    addVar,
    deleteClause,
    deleteVar,
    updateVar,
    updateVarDesc
}) {

    return (
        <div>
            <div className="clause-border" key={clauseId}>
                <div className="clause-holder">
                    <div className="clause-left-side">
                        <ClauseLeft
                            clauseId={clauseId}
                            clauseArrayLength={clauseArrayLength}
                            varArray={varArray}
                            addClause={addClause}
                            addVar={addVar}
                            deleteClause={deleteClause}
                            deleteVar={deleteVar}
                            updateVar={updateVar}
                            updateVarDesc={updateVarDesc}/>
                    </div>
                    <div className="clause-right-side">
                        <TextEditor 
							clause={clauseId} 
							spellCheck={true} 
							updateEditor={updateEditor} 
							initialState={initialEditorState}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clause
