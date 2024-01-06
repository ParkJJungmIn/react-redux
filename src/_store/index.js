import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { editorReducer } from './editor.slice.js';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './editor.slice.js';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        editor: editorReducer
    },
});