import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
    return <div className="body bg-dark text-light"><header>
            <h1 className="heading" id="login-header">Concept Threads</h1>
        </header>
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
        <footer>
            <div>Created by: Kendyl Hansen</div>
            <div>Find my GitHub Repository <a id="github-link"href="https://github.com/krhansen2016/startup">here</a>!</div>
        </footer></div>
}