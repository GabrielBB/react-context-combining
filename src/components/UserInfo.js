import React from 'react';
import { Consumer } from '../context';

const UserInfo = () => {
    return <Consumer>
        {
            ({ user, color }) => <h2 style={{ color }}>Hi, {user}</h2>
        }
    </Consumer>;
}

export default UserInfo;