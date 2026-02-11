import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./login/login.css"

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <h1 className="heading" id="login-header">Concept Threads</h1>
                </header>
                <main id="login">App components go here</main>
                <footer>
                    <div>Created by: Kendyl Hansen</div>
                    <div>Find my GitHub Repository <a id="github-link"href="https://github.com/krhansen2016/startup">here</a>!</div>
                </footer>
            </div>
        </BrowserRouter>
    )
}