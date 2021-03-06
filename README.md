## React Context Combining Example

You can create a ```context.js```. In this case we have 3 contexts:

* UserContext: holds a string with the logged user name
* ColorContext: holds a string with the app font color
* BrowserContext: holds the client browser object

#### context.js
```jsx
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
        {user => <ColorContext.Consumer>
                {color => <BrowserContext.Consumer>
                            {browser => children({ user, color, browser })}
                          </BrowserContext.Consumer>
                 }
                 </ColorContext.Consumer>
        }
    </UserContext.Consumer>
)
```

What we are doing here is simply creating a re-usable component tree with the dynamic ```children``` components at the bottom. See: [React composition model](https://reactjs.org/docs/composition-vs-inheritance.html)


In our ```App.js``` we initialize and pass the entire state to the our previously created ```Provider``` Component. Thanks to [Javascript Object Destructing](https://davidwalsh.name/destructuring-function-arguments) our ```Provider``` will only take what it needs from that state.

#### App.js
```jsx
import React from 'react';

import { Provider } from './context';
import BrowserInfo from './components/BrowserInfo';
import UserInfo from './components/UserInfo';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: 'Gabriel Basilio Brito',
      color: 'red',
      browser: { owner: 'Google', name: 'Chrome' }
    }
  }

  toggleColor = () => {
    let color = this.state.color === 'red' ? 'black' : 'red';
    this.setState({ color })
  }

  render() {
    return (
      <div className="App">
        <Provider {...this.state}>
          <UserInfo />
          <BrowserInfo />
          <button onClick={this.toggleColor}>Toggle Font Color</button>
        </Provider>
      </div>
    );
  }
}
```

As you can see we also have a button that toggles the color in the state, causing React to re-render the ```Provider``` with the new color value.

```<BrowserInfo />``` and ```<UserInfo />``` are using our previously created ```Consumer``` component to read the app state values:

#### BrowserInfo.js
```jsx
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
```

#### UserInfo.js
```jsx
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
```

### App Screenshots:

![Black Font](https://github.com/GabrielBB/react-context-combining/blob/master/images/black_font.JPG)

![Red Font](https://github.com/GabrielBB/react-context-combining/blob/master/images/red_font.JPG)
