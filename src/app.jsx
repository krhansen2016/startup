import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./login/login.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Create } from "./create/create"
import { Profile } from "./profile/profile"
import { Community } from "./community/community"
import { AuthState } from "./login/authState";

export default function App() {
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);

    function handleAuthChange(user, state) {
        setUserName(user);
        setAuthState(state);
    }

    function handleLogout() {
        fetch('/api/auth/logout', { method: 'delete' })
            .catch(() => { })
            .finally(() => {
                localStorage.removeItem('userName');
                setUserName("");
                setAuthState(AuthState.Unauthenticated);
            });
    }

    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <div className="top-header">
                        <h1 className="heading" id="main-header">Concept Threads</h1>

                        {authState === AuthState.Authenticated && (
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        )}
                    </div>
                    <hr />
                </header>

                <Routes>
                    <Route path="/" element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />} />
                    <Route path="/create" element={<Create authState={authState} />} />
                    <Route path="/profile" element={<Profile authState={authState} />} />
                    <Route path="/community" element={<Community authState={authState} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <footer className="nav">
                    <div>Created by: Kendyl Hansen</div>
                    <div>Find my GitHub Repository <a id="github-link" href="https://github.com/krhansen2016/startup">here</a>!</div>
                    <div>
                        {authState === AuthState.Authenticated && (
                            <nav>
                                <menu>
                                    <li><NavLink to="/create" className="btn w-100">Create</NavLink></li>
                                    <li><NavLink to="/profile" className="btn w-100">Profile</NavLink></li>
                                    <li><NavLink to="/community" className="btn w-100">Community</NavLink></li>
                                </menu>
                            </nav>
                        )}
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404 Return to sender. Address unknown.</main>
}