import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import LoginView from './views/LoginView';

function App() {
  return (
    // <div className='App'>
    //  <header className='App-header'>
    //     <img src={logo} className='App-logo' alt='logo' />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <Button type='primary'>Hello from Ant Design</Button>
    //   </header>
    //       </div>

    <div style={{ width: '100%', height: '100%' }}>
      <LoginView />
    </div>
  );
}

export default App;
