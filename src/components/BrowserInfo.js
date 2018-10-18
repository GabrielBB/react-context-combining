import React from 'react';
import { Consumer } from '../context';

const BrowserInfo = () => {
    return <Consumer>
        {
            ({ browser, color }) => <h3 style={{ color }}>You are using: {browser.owner} {browser.name}</h3>
        }
    </Consumer>;
}

export default BrowserInfo;