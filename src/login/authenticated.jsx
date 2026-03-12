import React from "react";
import { useNavigate } from "react-router-dom";

export function Authenticated({ userName, onLogout }) {
    const navigate = useNavigate();

    function logout() {
        fetch("/api/auth/logout", { method: "DELETE" }).finally(() => {
            localStorage.removeItem("userName");
            onLogout();
        });
    }

    return (
        <div>
            <div>Welcome, {userName}</div>
            <button onClick={() => navigate("/create")}>Go to Create</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}