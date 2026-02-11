import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./login/login.css"

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Create } from "./create/create"
import { Profile } from "./profile/profile"
import { Community } from "./community/community"

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <h1 className="heading" id="login-header">Concept Threads</h1>
                </header>

                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/create" element={<Create />} exact />
                    <Route path="/profile" element={<Profile />} exact />
                    <Route path="/community" element={<Community />} exact />
                    <Route path="*" element={<NotFound />} exact />
                </Routes>

                <footer className="nav">
                    <div>Created by: Kendyl Hansen</div>
                    <div>Find my GitHub Repository <a id="github-link"href="https://github.com/krhansen2016/startup">here</a>!</div>
                    <div>
                        <nav>
                            <menu>
                                <li><button><NavLink to="/">Login</NavLink></button></li>
                                <li><button><NavLink to="/create">Create</NavLink></button></li>
                                <li><button><NavLink to="/profile">Profile</NavLink></button></li>
                                <li><button><NavLink to="/community">Community</NavLink></button></li>
                            </menu>
                        </nav>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404 Return to sender. Address unknown.</main>
}