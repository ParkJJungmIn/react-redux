import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import { store } from './_store'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App.jsx";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
