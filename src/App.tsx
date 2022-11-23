import React from 'react';
import './App.css';
import { UserFormContainer } from './components/UserFormContainer';
import { UserServiceImpl } from './services/implementations/UserServiceImpl';

function App() {
  return (
    <div className='container my-5'>
      <UserFormContainer userService={new UserServiceImpl()} />
    </div>
  );
}

export default App;
