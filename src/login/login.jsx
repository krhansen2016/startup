import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";

export function Login({ username, authState, onAuthChange }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      navigate("/create");
    }
  }, [authState, navigate]);

  return (
    <main id="login">
      <div className="login-box">
        <h1 className="heading">Login</h1>
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated username={username} onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)} />
        )}
      </div>
    </main>
  );
}