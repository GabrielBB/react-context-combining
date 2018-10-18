import React from 'react';
import './App.css';

import { Provider } from './context';
import BrowserInfo from './components/BrowserInfo'
import UserInfo from './components/UserInfo'

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

export default App;