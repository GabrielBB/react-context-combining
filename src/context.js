import React from 'react';

const UserContext = React.createContext();
const ColorContext = React.createContext();
const BrowserContext = React.createContext();

export const Provider = ({ user, color, browser, children }) => (
    <UserContext.Provider value={user}>
        <ColorContext.Provider value={color}>
            <BrowserContext.Provider value={browser}>
                {children}
            </BrowserContext.Provider>
        </ColorContext.Provider>
    </UserContext.Provider>
)

export const Consumer = ({ children }) => (
    <UserContext.Consumer>
        {
            user => <ColorContext.Consumer>
                {
                    color => <BrowserContext.Consumer>
                        {
                            browser => children({ user, color, browser })
                        }
                    </BrowserContext.Consumer>
                }

            </ColorContext.Consumer>
        }

    </UserContext.Consumer>
)