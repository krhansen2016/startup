import React, { useState } from "react";

export function Unauthenticated({ userName: initialUserName, onLogin }) {
    const [userName, serUserName] = useState(initialUserName || "");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function loginOrCreate(endpoint) {
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userName, password }),
            });
            
            if (res.ok) {
                localStorage.setItem("userName", userName);
                onLogin(userName);
            }
            else {
                const body = await res.json();
                setError(body.msg);
            }
        }
        catch (err) {
            setError("Network error");
        }
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input placeholder="Email" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => loginOrCreate("/api/auth/login")}>Login</button>
            <button onClick={() => loginOrCreate("/api/auth/create")}>Create Account</button>
        </div>
    );
}