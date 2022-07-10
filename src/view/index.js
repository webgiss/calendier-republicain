import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from '../store'
import { Provider } from 'react-redux';
import exportOnWindow from '../tools/exportOnWindow';

const initView = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const onNewState = ()=>{
        const state = store.getState()
        exportOnWindow({state})
    }
    store.subscribe(onNewState)
    onNewState()
    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    );

}

export default initView;