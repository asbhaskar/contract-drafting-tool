import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

// export const createTemplateStateFromData = (templateData) => {
//     let editorStateHTML = createEditorFromRaw(templateData.rawClauseBlocksArray)
// }

export const createEditorFromRaw = (rawClauseBlocksArray) => {
    //TODO: figure out how to merge content states / blocks
    let editorStateHTML = ''
    rawClauseBlocksArray.forEach((item) => {
        // item or item.blocks
        let contentStateFromRaw = convertFromRaw(JSON.parse(item))
        editorStateHTML += stateToHTML(contentStateFromRaw)
    })
    return stateFromHTML(editorStateHTML)
}