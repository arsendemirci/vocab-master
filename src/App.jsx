
import React, { useEffect } from 'react';
import { channels } from './shared/constants';
const { ipcRenderer } = window.require('electron');

function App() {
    const getData = () => {
        console.log('button click is working')
        ipcRenderer.send(channels.GET_RPKS, { test: 'test arg' })
    }
    useEffect(() => {
        // Listen for the event
        ipcRenderer.on(channels.GET_RPKS, (event, arg) => {
            console.log('data received', event, arg)
        });
        // Clean the listener after the component is dismounted
        return () => {
            ipcRenderer.removeAllListeners();
        };
    }, []);
    return (
        <div>
            <main>
                <section id="core-concepts">
                    <h2>Core Concepts</h2>
                    <div>this is react application building with electron</div>
                    <button onClick={getData}>Get data</button>
                </section>
            </main>
        </div>
    );
}

export default App;