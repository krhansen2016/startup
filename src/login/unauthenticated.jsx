import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import "./login.css";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
        <form>
            <div className='user-box'>
                <input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                <label>Email</label>
            </div>
            <div className='user-box'>
                <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
            </div>

            <div className='buttons'>
                <button type='button' onClick={loginUser}>Login to Existing Account</button>
                <button type='button' onClick={createUser}>Create New Account</button>
            </div>
        </form>

        {displayError && <p>{displayError}</p>}
    </>
  );
}
