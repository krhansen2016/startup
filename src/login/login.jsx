import React from "react";

export function Login() {
    return (
        <main id="login">
            <div className="login-box">
            <h1 className="heading">Login</h1>
            <form method="get" action="create.html">
                <div className="user-box">
                    <input type="text" name="email" required />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" required />
                    <label>Password</label>
                </div>
                <div className="buttons">
                    <button type="submit">Login to Existing Account</button>
                    <button type="submit">Create New Account</button>
                </div>
            </form>
            </div>
        </main>
    )
}