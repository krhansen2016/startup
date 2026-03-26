import React, { useState } from 'react';
import { MessageDialog } from './messageDialog';
import './login.css'

export function Authenticated(props) {
    const [displayError, setDisplayError] = useState(null);

    async function logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'delete',
                credentials: 'include'
            });
            localStorage.removeItem('userName');
            props.onLogout();
        } catch (err) {
            setDisplayError('⚠ Logout failed.');
        }
    }

    return (
        <div className="login-box">
            <h1 className="heading">Welcome, {props.userName}!</h1>

            <div className="user-box">
                <p>You are logged in.</p>
            </div>

            <div className="buttons">
                <button type="button" onClick={logout}>
                    Logout
                </button>
            </div>

            {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
        </div>
    );
}
