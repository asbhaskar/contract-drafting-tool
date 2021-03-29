import { Editor, EditorState, RichUtils, Modifier, SelectionState } from 'draft-js';
import React from 'react';
import './Editor.css';
import { stateFromHTML } from 'draft-js-import-html';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import HighlightIcon from '@material-ui/icons/Highlight';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.html){
      this.state = {editorState: EditorState.createWithContent(stateFromHTML(this.props.html))}
    } else if(typeof(this.props.initialState) !== 'undefined'){
      this.state = {editorState: this.props.initialState}
    } else {
      this.state = {editorState: EditorState.createEmpty()}
    }
    this.onChange = (editorState) => {
      this.setState({editorState})
      this.props.updateEditor(this.state.editorState, this.props.clause);
    };
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.onChangeContent = (oldValue, newValue) => this._onChangeContent(oldValue, newValue)
    this.onGetState = () => this._onGetState()
  }
  _onGetState = () => {
    return this.state.editorState.getCurrentContent()
  }

  findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
  };

  _onChangeContent = (oldValue, newValue) =>{
    const regex = new RegExp(oldValue, 'g');
    const { editorState } = this.state;
    const selectionsToReplace = [];
    const blockMap = editorState.getCurrentContent().getBlockMap();
    blockMap.forEach((contentBlock) => (
      this.findWithRegex(regex, contentBlock, (start, end) => {
        const blockKey = contentBlock.getKey();
        const blockSelection = SelectionState
          .createEmpty(blockKey)
          .merge({
            anchorOffset: start,
            focusOffset: end,
          });
        selectionsToReplace.push(blockSelection)
      })
    ));

    let contentState = editorState.getCurrentContent();

    selectionsToReplace.forEach(selectionState => {
      contentState = Modifier.replaceText(
        contentState,
        selectionState,
        newValue,
      )
    });
    this.setState({
    editorState: EditorState.push(
      editorState,
      contentState,
      )
    })
  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const editorState = this.state.editorState;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-holder">
        {/* TODO: get rid of ternary here */}
        { this.props.readOnly === true ? 
          <div className="RichEditor-root">
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                handleKeyCommand={this.handleKeyCommand}
                placeholder={this.props.content}
                spellCheck={true}
                readOnly={true}
                editorState={editorState} 
                onChange={this.onChange}
              />
          </div>: 
          <div className="RichEditor-root">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                handleKeyCommand={this.handleKeyCommand}
                placeholder={this.props.content}
                spellCheck={true}
                editorState={editorState} 
                onChange={this.onChange}
              />
            </div> 
          </div>}
        </div>
    );
  }
}
export default TextEditor;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  HIGHLIGHT:{
    backgroundColor: '#faed27'
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: <FormatListBulletedIcon />, style: 'unordered-list-item'},
  {label: <FormatListNumberedIcon />  , style: 'ordered-list-item'},
  {label: <FormatAlignLeftIcon />, style: 'ALIGNLEFT'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type,index) =>
        <StyleButton
          key={type.label + index}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: <FormatBoldIcon />, style: 'BOLD'},
  {label: <FormatItalicIcon />, style: 'ITALIC'},
  {label: <FormatUnderlinedIcon />, style: 'UNDERLINE'},
  {label: <StrikethroughSIcon />, style: 'STRIKETHROUGH'},
  {label: <HighlightIcon />, style: 'HIGHLIGHT'}
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type,index) =>
        <StyleButton
          key={type.label + index}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};