import React, { Component } from 'react';
import TextEditor from '../../components/Editor/Editor';
import { createEditorFromRaw } from './utils/utils';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import Button from '@material-ui/core/Button';
import Modal from '../../components/Modal/Modal';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import './Fill.css';

export class Fill extends Component { 
    state ={
        clauses: this.props.location.state.clauses,
        editor: EditorState.createWithContent(createEditorFromRaw(this.props.location.state.data.rawClauseBlocksArray)),
        vars: this.props.location.state.vars,
        varDescs: this.props.location.state.varDescs,
        title:this.props.location.state.title,
        author: this.props.location.state.author,
        description: this.props.location.state.description
    }

    constructor(props){
        super(props);
        this.editorRef = React.createRef();
    }

    updateEditor = (newEditorState, clauseId) => {
        this.setState(prevState => ({
            ...prevState,
            editor: newEditorState
        }))
    }

    handleFillVarInEditor = (index, value) => {
        let input = document.getElementById(index)
        let oldValue ='{' + value + '}'
        if(typeof(input.value) === 'object' || input.value === '') return
        let newValue = input.value
        let newValueBrackets = '{' + input.value + '}'
        this.editorRef.current.onChangeContent(oldValue, newValueBrackets)
        this.setState(prevState => ({
            ...prevState, 
            vars: {
                ...prevState.vars,
                [index]: {
                    ...prevState.vars[index],
                    value: newValue
                }
            }
        }))
    }

    handleDownloadAsWord = () => {
        let editorState = this.state.editor.getCurrentContent()
        let editorHtml = stateToHTML(editorState)
        let content = `<!doctype html><html><body>${editorHtml}</body></html>`;
        content = content.toString().replace('{', '').replace('}', '');
        let converted = htmlDocx.asBlob(content);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
        let yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        return saveAs(converted, `${this.state.title}_${today}.docx`);
    }

    render() {
        let initialEditorState = this.state.editor
        let clauseIdArray = []
        for(let i in this.state.clauses){
            clauseIdArray.push(i)
        }
        return (
            <div className="fill-grid">
                <div className="fill-left-side">
                    <div className="fill-template-info">
                        <TextField
                            id="fill-title-textfield"
                            placeholder="Title"
                            className="fill-input title-input"
                            value = {this.state.title}
                            onChange = {(event) => this.setState({title: event.target.value})}/>
                        <h5>Author: {this.state.author}</h5>
                    </div>
                    {clauseIdArray.map((clause, index) => (
                        <div key={'clause_'+ index} className="fill-clause-holder">
                            <h4>Clause {parseInt(clause) + 1}:</h4>
                            <div className="variable-fill">
                            {Object.keys(this.state.vars).map((variable, varIndex) => (
                                (this.state.vars[varIndex].clauseId === index) &&
                                    <div key={varIndex} className="var-fill-grid">
                                        <span className="var-left-side">{this.state.varDescs[varIndex].value} :</span>
                                        <span className="var-right-side">
                                            <input 
                                                placeholder={this.state.vars[varIndex].value} 
                                                id={varIndex}/>
                                            <Button 
                                                variant="outlined" 
                                                color="primary"
                                                data-index={varIndex} 
                                                var-value={ this.state.vars[varIndex].value }
                                                onClick={() => this.handleFillVarInEditor(varIndex, this.state.vars[varIndex].value)}>Fill</Button>
                                        </span>
                                    </div>
                            ))}
                            </div>
                        </div>
                    ))}
                    <div className="fill-exit-options">
                        <Button variant="contained" color="primary" onClick={this.handleDownloadAsWord}>Save As Word (.docx)</Button>
                        <Modal 
                            type="fill-exit" />
                    </div>
                </div>
                <div className="fill-right-side">
                    <TextEditor 
                        clause = {1}
                        ref={this.editorRef}
                        initialState = {initialEditorState}
                        spellCheck={true} 
                        updateEditor={this.updateEditor}/>
                </div>
            </div>
        )
    }
}

export default Fill
