import { createSlice } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';

// create slice

const name = 'editor';
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

// exports

export const editorActions = { ...slice.actions };
export const editorReducer = slice.reducer;

// implementation

function createInitialState() {
    // alert("?")
    return {
        editorState: EditorState.createEmpty(),
    };
}

function createReducers() {
    return {
        setEditorState
    };

    function setEditorState(state, action) {
        state.editorState = action.payload;
    }
}
