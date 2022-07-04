import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

require('application.css')

window.Entries.onLoaded((_, data) => {
    console.log(data)
    renderApp(data)
})

const renderApp = ({entries, time,title}) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <App
           entries={entries}
           time={time}
           title={title}
        />
    )
}

