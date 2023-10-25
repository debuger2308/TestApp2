"use client"

import { useState } from "react";

const Login = () => {
    const [username, setUsermame] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    

                }}
                className="login-form">
                <input
                    type="text"
                    placeholder="Login"
                    className="login-form__input"
                    maxLength={150}
                    minLength={1}
                    value={username}
                    onChange={(e) => {
                        setUsermame(e.currentTarget.value)
                    }}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="login-form__input"
                    maxLength={128}
                    minLength={1}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                />
                <button
                    className="login-form-btn"
                    type="submit"
                >Log In
                </button>
            </form>
        </>
    );
}

export default Login;