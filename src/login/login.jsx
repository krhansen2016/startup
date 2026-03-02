import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        localStorage.setItem("userName", email);
        navigate("/create");
    }

    return (
        <main id="login">
            <div className="login-box">
            <h1 className="heading">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="user-box">
                    <input type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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